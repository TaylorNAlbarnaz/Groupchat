﻿using GroupchatAPI.Models;
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
        public async Task<ActionResult<List<User>>> GetGroupUsers(int id)
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

        [HttpPost("{id}")]
        public async Task<ActionResult> AddUserToGroup(int id, int userId)
        {
            var dbGroup = context.Groups
                .Include(g => g.GroupUsers)
                .Include(g => g.Admin)
                .FirstOrDefault(g => g.Id == id);
            if (dbGroup == null)
                return NotFound("Group not found!");

            var dbUser = context.Users
                .Include(u => u.Login)
                .Include(u => u.Groups)
                .Include(u => u.GroupUsers)
                .FirstOrDefault(u => u.Id == userId);
            if (dbUser == null)
                return NotFound("User not found!");

            var dbUserInGroup = context.GroupUsers
                .FirstOrDefault(gu => (gu.GroupId == id && gu.UserId == userId));

            if (dbUserInGroup != null)
                return BadRequest("User is already in that group!");

            var dbGroupUser = new GroupUser
            {
                User = dbUser,
                UserId = dbUser.Id,
                Group = dbGroup,
                GroupId = dbGroup.Id
            };

            dbGroup.GroupUsers.Add(dbGroupUser);
            await context.SaveChangesAsync();

            context.GroupUsers.Add(dbGroupUser);

            return Ok($"User of id {userId} succesfully added to Group of id {id}");
        }
    }
}
