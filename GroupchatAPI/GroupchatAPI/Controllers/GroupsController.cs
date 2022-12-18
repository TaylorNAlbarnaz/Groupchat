using GroupchatAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroupchatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly DataContext context;

        public GroupsController(DataContext context)
        {
            this.context = context;
        }

        private async Task<List<User>> CreateUserList(int[] userIds)
        {
            var userList = new List<User>();

            foreach (var userId in userIds)
            {
                var dbUser = await context.Users.FindAsync(userId);
                if (dbUser != null)
                    userList.Add(dbUser);
            }

            return userList;
        }

        private async Task<List<Message>> CreateMessageList(int[] messageIds)
        {
            var messageList = new List<Message>();

            foreach (var messageId in messageIds)
            {
                var dbMessage = await context.Messages.FindAsync(messageId);
                if (dbMessage != null)
                    messageList.Add(dbMessage);
            }

            return messageList;
        }

        [HttpGet]
        public async Task<ActionResult<List<Group>>> GetGroups()
        {
            return Ok(await context.Groups
                .Include(m => m.Users)
                .Include(m => m.Messages).ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<Group>> CreateGroup(GroupDto groupDto)
        {
            var dbGroup = await context.Users.FindAsync(groupDto.Id);
            if (dbGroup != null)
                return BadRequest("This GroupId already exists!");

            if (groupDto.Id < 0)
                return BadRequest("Invalid Group Index!");

            var dbAdmin = await context.Users.FindAsync(groupDto.AdminId);
            if (dbAdmin == null)
                return NotFound("Admin not found!");

            var userList = await CreateUserList(groupDto.UserIds);
            if (userList.Count == 0)
                return BadRequest("Invalid Userlist");

            var messageList = await CreateMessageList(groupDto.MessageIds);

            var group = new Group
            {
                Admin = dbAdmin,
                Name = groupDto.Name,
                Users = userList,
                Messages = messageList
            };

            context.Groups.Add(group);
            await context.SaveChangesAsync();

            return Ok(group);
        }

        [HttpPut]
        public async Task<ActionResult<List<Group>>> UpdateGroup(GroupDto groupDto)
        {
            var dbGroup = await context.Groups.FindAsync(groupDto.Id);
            if (dbGroup == null)
                return NotFound("Group not found!");

            var dbAdmin = await context.Users.FindAsync(groupDto.AdminId);
            if (dbAdmin == null)
                return NotFound("Admin not found!");

            var userList = await CreateUserList(groupDto.UserIds);
            var messageList = await CreateMessageList(groupDto.MessageIds);

            dbGroup.Name = groupDto.Name;
            dbGroup.Admin = dbAdmin;
            dbGroup.Users = userList;
            dbGroup.Messages = messageList;

            await context.SaveChangesAsync();

            return Ok(await context.Groups.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Group>>> DeleteGroup(int id)
        {
            var dbGroup = await context.Groups.FindAsync(id);
            if (dbGroup == null)
                return BadRequest("Group not found!");

            context.Groups.Remove(dbGroup);

            await context.SaveChangesAsync();

            return Ok(await context.Groups.ToListAsync());
        }
    }
}
