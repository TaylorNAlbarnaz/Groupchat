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
        public async Task<ActionResult<List<Message>>> GetMessages(int id)
        {
            var dbMessage = await context.Messages.Include(m => m.Owner)
                .FirstOrDefaultAsync(m => m.Id == id);
            return Ok(dbMessage);
        }

        [HttpPost]
        public async Task<ActionResult<List<Message>>> CreateMessage(MessageDto messageDto)
        {
            var dbOwner = await context.Users.FindAsync(messageDto.OwnerId);
            if (dbOwner == null)
                return NotFound("Message's Owner not found!");

            var message = new Message {
                Owner = dbOwner,
                Content = messageDto.Content
            };

            context.Messages.Add(message);
            await context.SaveChangesAsync();

            return Ok(await context.Messages.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Message>>> UpdateMessage(MessageDto messageDto)
        {
            var dbMessage = await context.Messages.FindAsync(messageDto.Id);
            if (dbMessage == null)
                return BadRequest("Message not found!");

            var dbOwner = await context.Users.FindAsync(messageDto.OwnerId);
            if (dbOwner == null)
                return BadRequest("Messge's Owner not found!");

            dbMessage.Id = (int)messageDto.Id;
            dbMessage.Owner = dbOwner;
            dbMessage.Content = messageDto.Content;

            await context.SaveChangesAsync();

            return Ok(await context.Messages.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Message>>> DeleteMessage(int id)
        {
            var dbMessage = await context.Messages.FindAsync(id);
            if (dbMessage == null)
                return BadRequest("Message not found!");

            context.Messages.Remove(dbMessage);
            await context.SaveChangesAsync();

            return Ok(await context.Messages.ToListAsync());
        }
    }
}
