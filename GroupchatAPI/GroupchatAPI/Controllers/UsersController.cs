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
                return BadRequest("User not found!");

            return Ok(dbUser);
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var dbUser = await context.Users.FindAsync(user.Id);
            if (dbUser != null)
                return BadRequest("This UserId already exists!");

            if (user.Id < 0)
                return BadRequest("Invalid User Index!");

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(User user)
        {
            var dbUser = await context.Users.FindAsync(user.Id);
            if (dbUser == null)
                return BadRequest("User not found!");

            dbUser.Id = user.Id;
            dbUser.Username = user.Username;
            dbUser.Password = user.Password;

            await context.SaveChangesAsync();

            return Ok(dbUser);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var dbUser = await context.Users.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found!");

            context.Users.Remove(dbUser);
            await context.SaveChangesAsync();

            return Ok(await context.Users.ToListAsync());
        }
    }
}
