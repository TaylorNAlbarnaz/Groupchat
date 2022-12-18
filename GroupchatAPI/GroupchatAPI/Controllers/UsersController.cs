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

        [HttpPost]
        public async Task<ActionResult<List<User>>> CreateUser(User user)
        {
            context.Users.Add(user);
            await context.SaveChangesAsync();

            return Ok(await context.Users.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<User>>> UpdateUser(User user)
        {
            var dbUser = await context.Users.FindAsync(user.Id);
            if (dbUser == null)
                return BadRequest("User not found!");

            dbUser.Id = user.Id;
            dbUser.Username = user.Username;
            dbUser.Password = user.Password;

            await context.SaveChangesAsync();

            return Ok(await context.Users.ToListAsync());
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
