using GroupchatAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroupchatAPI.Controllers.Groups
{
    [Route("api/group/users")]
    [ApiController]
    public class GroupUsersController : ControllerBase
    {
        private readonly DataContext context;

        public GroupUsersController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetGroupUsers(int id)
        {
            var dbGroup = await context.Groups.FindAsync(id);
            if (dbGroup == null)
                return NotFound("Group not found!");

            var dbGroupUsers = dbGroup.GroupUsers.ToList();
            var dbUsers = new List<User>();

            foreach (var user in dbGroupUsers)
            {
                var dbUser = await context.Users.FindAsync(user.UserId);
                if (dbUser != null)
                    dbUsers.Add(dbUser);
            }

            return Ok(dbUsers);
        }
    }
}
