using Microsoft.EntityFrameworkCore;

namespace GroupchatAPI.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Message> Messages => Set<Message>();
        public DbSet<Group> Groups => Set<Group>();
    }
}
