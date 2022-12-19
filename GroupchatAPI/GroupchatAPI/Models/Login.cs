using System.ComponentModel.DataAnnotations;

namespace GroupchatAPI.Models
{
    public class Login
    {
        [Key]
        public int Id { get; set; }
        public User User { get; set; }

        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
