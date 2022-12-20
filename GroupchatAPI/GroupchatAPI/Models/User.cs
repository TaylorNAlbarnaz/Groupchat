using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroupchatAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Username { get; set; } = String.Empty;
        public Login Login { get; set; }
        public int LoginId { get; set; }
        public virtual ICollection<GroupUser> GroupUsers { get; set; }

        /// Groups the User is an Admin of
        public virtual ICollection<Group> Groups { get; set; }
    }
}
