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
        public async Task<ActionResult<List<Message>>> GetMessage(int id)
        {
            var dbMessage = await context.Messages.Include(m => m.User)
                .FirstOrDefaultAsync(m => m.Id == id);
            return Ok(dbMessage);
        }

        [HttpPost]
        public async Task<ActionResult<List<Message>>> CreateMessage(MessageDto messageDto)
        {
            var dbMessage = await context.Users.FindAsync(messageDto.Id);
            if (dbMessage != null)
                return BadRequest("This MessageId already exists!");

            if (messageDto.Id < 0)
                return BadRequest("Invalid Message Index!");

            var dbUser = await context.Users.FindAsync(messageDto.UserId);
            if (dbUser == null)
                return NotFound("Message's User not found!");

            var message = new Message {
                User = dbUser,
                Content = messageDto.Content
            };

            context.Messages.Add(message);
            await context.SaveChangesAsync();

            return Ok($"Messaeg successfully created!"); ;
        }

        [HttpPut]
        public async Task<ActionResult<List<Message>>> UpdateMessage(MessageDto messageDto)
        {
            var dbMessage = await context.Messages.FindAsync(messageDto.Id);
            if (dbMessage == null)
                return BadRequest("Message not found!");

            dbMessage.Id = messageDto.Id;
            dbMessage.Content = messageDto.Content;

            await context.SaveChangesAsync();

            return Ok($"Messaeg successfully updated!");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Message>>> DeleteMessage(int id)
        {
            var dbMessage = await context.Messages.FindAsync(id);
            if (dbMessage == null)
                return BadRequest("Message not found!");

            context.Messages.Remove(dbMessage);
            await context.SaveChangesAsync();

            return Ok($"Messaeg successfully deleted!"); ;
        }
    }
}
