using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroupchatAPI.Models
{
    [Keyless]
    public class GroupUser
    {
        public int GroupId { get; set; }
        public virtual Group Group { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
