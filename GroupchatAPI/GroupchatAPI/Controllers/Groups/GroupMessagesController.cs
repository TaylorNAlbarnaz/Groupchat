using GroupchatAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroupchatAPI.Controllers.Groups
{
    [Route("api/group/messages")]
    [ApiController]
    public class GroupMessagesController : ControllerBase
    {
        private readonly DataContext context;

        public GroupMessagesController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetGroupMessages(int id)
        {
            var dbGroup = context.Groups
                .Include(g => g.Messages)
                .FirstOrDefault(g => g.Id == id);

            if (dbGroup == null)
                return NotFound("Group not found!");

            return Ok(dbGroup.Messages);
        }
    }
}
