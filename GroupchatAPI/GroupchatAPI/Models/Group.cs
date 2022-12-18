using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GroupchatAPI.Models
{
    public class Group
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public User Admin { get; set; }
        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}
