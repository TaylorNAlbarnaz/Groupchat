using Microsoft.Build.Framework;

namespace GroupchatAPI.Models
{
    public class MessageDto
    {
        public int Id { get; set; } = 0;
        public int UserId { get; set; } = 0;

        [Required]
        public string Content { get; set; } = "";
    }
}
