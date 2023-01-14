using System.ComponentModel.DataAnnotations;

namespace GroupchatAPI.Models
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
