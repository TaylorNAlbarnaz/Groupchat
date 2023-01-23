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

            if (dbLogin.User.Disabled == true)
                return NotFound("This user's account was deleted!");

            return Ok(dbLogin);
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser(UserDto userDto)
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

            dbUser = context.Users
                .FirstOrDefault(u => u.Username == userDto.Username);

            if (dbUser != null)
                return BadRequest("This username is already being used!");

            var dbLogin = context.Logins
                .FirstOrDefault(l => l.Email == userDto.Email);

            if (dbLogin != null)
                return BadRequest("This email is already being used!");

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
        public async Task<ActionResult> UpdateUser(UserDto userDto)
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

        [HttpDelete("{id}/{email}/{password}")]
        public async Task<ActionResult> DeleteUser(int id, string email, string password)
        {
            var dbUser = context.Users
                .Include(u => u.Login)
                .FirstOrDefault(u => u.Id == id);
            if (dbUser == null)
                return NotFound("User not found!");

            var dbLogin = context.Logins
                .FirstOrDefault(l => l.User.Id == id);
            if (dbLogin == null)
                return NotFound("Login not found!");

            if (dbLogin.Email != email
                || dbLogin.Password != password)
                return BadRequest("Wrong Credentials!");

            dbUser.Disabled = true;
            await context.SaveChangesAsync();

            return Ok(($"User {dbUser.Username} successfully disabled!"));
        }

        [HttpPost("{id}")]
        public ActionResult<User> GetFullUser(int id, LoginDto loginDto)
        {
            var dbUser = context.Users
                .Include(u => u.Login)
                .FirstOrDefault(u => u.Id == id);
            if (dbUser == null)
                return NotFound("User not found!");

            var dbLogin = context.Logins
                .FirstOrDefault(l => l.User.Id == id);
            if (dbLogin == null)
                return NotFound("Login not found!");

            if (dbLogin.Email != loginDto.Email
                || dbLogin.Password != loginDto.Password)
                return BadRequest("Wrong Credentials!");

            if (dbUser.Disabled == true)
                return NotFound("This user's account was deleted!");

            return Ok(dbUser);
        }
    }
}
