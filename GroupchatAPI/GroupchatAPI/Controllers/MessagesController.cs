using GroupchatAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroupchatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly DataContext context;

        public MessagesController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Message>> GetMessage(int id)
        {
            var dbMessage = await context.Messages.Include(m => m.User)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (dbMessage == null)
                return NotFound("Message not found!");

            return Ok(dbMessage);
        }

        [HttpPost]
        public async Task<ActionResult> CreateMessage(MessageDto messageDto)
        {
            var dbMessage = await context.Users.FindAsync(messageDto.Id);
            if (dbMessage != null)
                return BadRequest("This MessageId already exists!");

            if (messageDto.Id < 0)
                return BadRequest("Invalid Message Index!");

            var dbUser = await context.Users.FindAsync(messageDto.UserId);
            if (dbUser == null)
                return NotFound("User not found!");

            if (messageDto.Content == string.Empty)
                return BadRequest("Message cannot be empty!");

            var message = new Message {
                User = dbUser,
                Content = messageDto.Content
            };

            context.Messages.Add(message);
            await context.SaveChangesAsync();

            return Ok($"Message successfully created!"); ;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMessage(MessageDto messageDto)
        {
            var dbMessage = await context.Messages.FindAsync(messageDto.Id);
            if (dbMessage == null)
                return NotFound("Message not found!");

            dbMessage.Id = messageDto.Id;
            dbMessage.Content = messageDto.Content;

            await context.SaveChangesAsync();

            return Ok($"Message successfully updated!");
        }
    }
}
