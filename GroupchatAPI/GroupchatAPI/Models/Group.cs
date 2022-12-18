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
        public User? Admin { get; set; }

        public ICollection<User>? Users { get; set; }
        public ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}
