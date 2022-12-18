using System.ComponentModel.DataAnnotations;

namespace GroupchatAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
    }
}
