using GroupchatAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var dbGroup = context.Groups
                .Include(g => g.GroupUsers)
                .FirstOrDefault(g => g.Id == id);

            if (dbGroup == null)
                return NotFound("Group not found!");

            var dbUsers = new List<User>();

            foreach (var groupUser in dbGroup.GroupUsers)
            {
                var dbUser = context.Users.Find(groupUser.UserId);
                if (dbUser != null)
                    dbUsers.Add(dbUser);
            }

            return Ok(dbUsers);
        }
    }
}
