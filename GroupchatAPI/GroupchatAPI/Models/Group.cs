using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GroupchatAPI.Models
{
    public class Group
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int AdminId { get; set; }
        public User Admin { get; set; }

        public virtual ICollection<GroupUser> GroupUsers { get; set; }
        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}
