using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GroupchatAPI.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        public User User { get; set; }
        public Group? Group { get; set; }
        public int? GroupId { get; set; }
        public bool Deleted { get; set; } = false;
        public string Content { get; set; } = String.Empty;
    }
}
