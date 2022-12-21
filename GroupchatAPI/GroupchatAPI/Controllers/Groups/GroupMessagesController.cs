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

        [HttpPost("{id}")]
        public async Task<ActionResult> CreateGroupMessage(int id, MessageDto messageDto)
        {
            var dbGroup = context.Groups
                .Include(g => g.Messages)
                .FirstOrDefault(g => g.Id == id);

            if (dbGroup == null)
                return NotFound("Group not found!");

            var dbUser = context.Users
                .Include(u => u.Groups)
                .FirstOrDefault(u => u.Id == messageDto.UserId);
            if (dbUser == null)
                return NotFound("User not found!");

            if (messageDto.Content == string.Empty)
                return BadRequest("Message cannot be empty!");

            var dbGroupUser = context.GroupUsers
                .FirstOrDefault(gu => gu.GroupId == id && gu.UserId == messageDto.UserId);
            if (dbGroupUser == null)
                return BadRequest("User is not part of this group!");

            var message = new Message
            {
                User = dbUser,
                Content = messageDto.Content,
                GroupId = id,
                Group = dbGroup
            };

            context.Messages.Add(message);
            dbGroup.Messages.Add(message);
            await context.SaveChangesAsync();

            return Ok("Message added to group!");
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteGroupMessage(int id, int messageId)
        {
            var dbMessage = context.Messages
                .Include(m => m.Group)
                .FirstOrDefault(m => m.GroupId == id && m.Id == messageId);
            if (dbMessage == null)
                return NotFound("Message not found!");

            dbMessage.Deleted = true;
            await context.SaveChangesAsync();

            return Ok("Message deleted from group!");
        }
    }
}
