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
