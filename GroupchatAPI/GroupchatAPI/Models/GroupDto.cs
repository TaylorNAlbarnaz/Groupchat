using Microsoft.Build.Framework;

namespace GroupchatAPI.Models
{
    public class GroupDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AdminId { get; set; }
        public ICollection<GroupUser> GroupUsers { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
