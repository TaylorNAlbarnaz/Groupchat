using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GroupchatAPI.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        public User Owner { get; set; }
        public string Content { get; set; } = String.Empty;
    }
}
