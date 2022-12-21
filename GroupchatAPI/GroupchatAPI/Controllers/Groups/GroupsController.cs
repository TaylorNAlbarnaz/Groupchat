using GroupchatAPI.Models;
using GroupchatAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroupchatAPI.Controllers.Groups
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly DataContext context;
        private readonly GroupsRepository repository;

        public GroupsController(DataContext context)
        {
            this.context = context;
            this.repository = new GroupsRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<List<Group>>> GetGroups()
        {
            return Ok(await context.Groups.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> GetGroup(int id)
        {
            var dbGroup = repository.GetGroupFull(id);

            if (dbGroup == null)
                return NotFound("Group not found!");

            return Ok(dbGroup);
        }

        [HttpPost]
        public async Task<ActionResult<Group>> CreateGroup(CreateGroupDto groupDto)
        {
            var dbGroup = await context.Users.FindAsync(groupDto.Id);
            if (dbGroup != null)
                return BadRequest("This GroupId already exists!");

            if (groupDto.Id < 0)
                return BadRequest("Invalid Group Index!");

            if (!groupDto.UserIds.Contains(groupDto.AdminId))
                return BadRequest("Admin has to be part of the group!");

            var dbAdmin = await context.Users.FindAsync(groupDto.AdminId);
            if (dbAdmin == null)
                return NotFound("Admin not found!");

            var messageList = await repository.CreateMessageList(groupDto.MessageIds);

            var group = new Group
            {
                AdminId = dbAdmin.Id,
                Admin = dbAdmin,
                Name = groupDto.Name,
                Messages = messageList
            };

            var userList = await repository.CreateUserList(groupDto.UserIds, group);
            if (userList.Count == 0)
                return BadRequest("Invalid Userlist");

            group.GroupUsers = userList;

            context.Groups.Add(group);
            await context.SaveChangesAsync();

            return Ok($"Group {group.Name} of Id {group.Id} succesfully created!");
        }

        [HttpPut]
        public async Task<ActionResult<Group>> UpdateGroup(UpdateGroupDto groupDto)
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
        public async Task<ActionResult<Group>> DeleteGroup(int id)
        {
            var dbGroup = await context.Groups.FindAsync(id);
            if (dbGroup == null)
                return BadRequest("Group not found!");

            repository.DeleteGroup(dbGroup);
            await context.SaveChangesAsync();

            return Ok($"Group of Id {id} succesfully deleted!");
        }
    }
}
