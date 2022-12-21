using GroupchatAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace GroupchatAPI.Repositories
{
    public interface IGroupsRepository: IDisposable
    {
        Task<List<GroupUser>> CreateUserList(int[] userIds, Group group);
        Task<List<Message>> CreateMessageList(int[] messageIds);
        Group GetGroupBare(int id);
        Group GetGroupFull(int id);
        Group GetGroupWithUsers(int id);
        Task<Group> CreateGroup(CreateGroupDto groupDto);
        void DeleteGroup(Group dbGroup);
    }
}
