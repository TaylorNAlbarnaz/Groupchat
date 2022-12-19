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

        private async Task<List<GroupUser>> CreateUserList(int[] userIds, Group group)
        {
            var userList = new List<GroupUser>();

            foreach (var userId in userIds)
            {
                var dbUser = await context.Users.FindAsync(userId);
                if (dbUser != null)
                    userList.Add(new GroupUser
                    {
                        User = dbUser,
                        UserId = dbUser.Id,
                        Group = group,
                        GroupId = group.Id
                    });
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
                .Include(g => g.GroupUsers)
                .Include(g => g.Admin)
                .Include(g => g.Messages).ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<Group>> CreateGroup(CreateGroupDto groupDto)
        {
            var dbGroup = await context.Users.FindAsync(groupDto.Id);
            if (dbGroup != null)
                return BadRequest("This GroupId already exists!");

            if (groupDto.Id < 0)
                return BadRequest("Invalid Group Index!");

            var dbAdmin = await context.Users.FindAsync(groupDto.AdminId);
            if (dbAdmin == null)
                return NotFound("Admin not found!");

            var messageList = await CreateMessageList(groupDto.MessageIds);

            var group = new Group
            {
                AdminId = dbAdmin.Id,
                Admin = dbAdmin,
                Name = groupDto.Name,
                Messages = messageList
            };

            var userList = await CreateUserList(groupDto.UserIds, group);
            if (userList.Count == 0)
                return BadRequest("Invalid Userlist");

            group.GroupUsers = userList;

            context.Groups.Add(group);
            await context.SaveChangesAsync();

            return Ok($"Group {group.Name} of Id {group.Id} succesfully created!");
        }

        [HttpPut]
        public async Task<ActionResult<List<Group>>> UpdateGroup(UpdateGroupDto groupDto)
        {
            var dbGroup = await context.Groups.FindAsync(groupDto.Id);
            if (dbGroup == null)
                return NotFound("Group not found!");

            var dbAdmin = await context.Users.FindAsync(groupDto.AdminId);
            if (dbAdmin == null)
                return NotFound("Admin not found!");

            dbGroup.Name = groupDto.Name;
            dbGroup.AdminId = dbAdmin.Id;
            dbGroup.Admin = dbAdmin;

            await context.SaveChangesAsync();

            return Ok($"Group {dbGroup.Name} succesfully updated!");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Group>>> DeleteGroup(int id)
        {
            var dbGroup = await context.Groups.FindAsync(id);
            if (dbGroup == null)
                return BadRequest("Group not found!");

            var dbMessages = context.Messages.Where(m => m.GroupId == id);
            foreach (var dbMessage in dbMessages)
            {
                context.Messages.Remove(dbMessage);
            }

            context.Groups.Remove(dbGroup);

            await context.SaveChangesAsync();

            return Ok($"Group of Id {id} succesfully deleted!");
        }
    }
}
