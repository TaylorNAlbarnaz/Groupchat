using GroupchatAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroupchatAPI.Repositories
{
    public class GroupsRepository : IGroupsRepository
    {
        private DataContext context;
        public GroupsRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<List<GroupUser>> CreateUserList(int[] userIds, Group group)
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

        public async Task<List<Message>> CreateMessageList(int[] messageIds)
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

        public async Task<Group> CreateGroup(CreateGroupDto groupDto)
        {
            throw new NotImplementedException();
        }

        public async void DeleteGroup(Group dbGroup)
        {
            var dbMessages = context.Messages.Where(m => m.GroupId == dbGroup.Id);
            foreach (var dbMessage in dbMessages)
            {
                context.Messages.Remove(dbMessage);
            }

            context.Groups.Remove(dbGroup);
        }

        public Group GetGroupBare(int id)
        {
            var dbGroup = context.Groups
                .Find(id);

            return dbGroup;
        }

        public Group GetGroupFull(int id)
        {
            var dbGroup = context.Groups
                .Include(g => g.GroupUsers)
                .Include(g => g.Admin)
                .Include(g => g.Messages)
                .FirstOrDefault(g => g.Id == id);

            return dbGroup;
        }

        public Group GetGroupWithUsers(int id)
        {
            var dbGroup = context.Groups
                .Include(g => g.GroupUsers)
                .Include(g => g.Admin)
                .FirstOrDefault(g => g.Id == id);

            return dbGroup;
        }

        void IDisposable.Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
