using GroupchatAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroupchatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext context;

        public UsersController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(await context.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var dbUser = await context.Users.FindAsync(id);
            if (dbUser == null)
                return NotFound("User not found!");

            return Ok(dbUser);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<Login>> LoginUser(LoginDto loginDto)
        {
            var dbLogin = context.Logins
                .Include(l => l.User)
                .FirstOrDefault(l => l.Email == loginDto.Email);
            if (dbLogin == null)
                return NotFound("Account not found!");

            if (loginDto.Password != dbLogin.Password)
                return BadRequest("Wrong password!");

            return Ok(dbLogin);
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(UserDto userDto)
        {
            var dbUser = await context.Users.FindAsync(userDto.Id);
            if (dbUser != null)
                return BadRequest("This UserId already exists!");

            if (userDto.Id < 0)
                return BadRequest("Invalid User Index!");

            if (userDto.Username.Length < 5)
                return BadRequest("Invalid Group Name!");

            if (userDto.Password.Length < 8)
                return BadRequest("Invalid Password!");

            dbUser = new User
            {
                Username = userDto.Username,
                Login = new Login
                {
                    Email = userDto.Email,
                    Password = userDto.Password
                }
            };

            dbUser.Login.User = dbUser;

            context.Logins.Add(dbUser.Login);
            context.Users.Add(dbUser);
            await context.SaveChangesAsync();

            return Ok($"User {dbUser.Username} successfully created!");
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(UserDto userDto)
        {
            var dbUser = await context.Users.FindAsync(userDto.Id);
            if (dbUser == null)
                return NotFound("User not found!");

            dbUser.Id = userDto.Id;
            dbUser.Username = userDto.Username;

            var dbLogin = await context.Logins.FindAsync(dbUser.LoginId);
            dbLogin.Email = userDto.Email;
            dbLogin.Password = userDto.Password;

            await context.SaveChangesAsync();

            return Ok($"User {dbUser.Username} successfully updated!");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var dbUser = await context.Users.FindAsync(id);
            if (dbUser == null)
                return NotFound("User not found!");

            dbUser.Disabled = true;
            await context.SaveChangesAsync();

            return Ok(($"User {dbUser.Username} successfully disabled!"));
        }
    }
}
