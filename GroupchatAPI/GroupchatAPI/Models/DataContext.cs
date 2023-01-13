using Microsoft.EntityFrameworkCore;

namespace GroupchatAPI.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // sets the GroupUser many-to-many relationship
            modelBuilder
                .Entity<GroupUser>()
                .HasKey(gu => new { gu.GroupId, gu.UserId });
            modelBuilder
                .Entity<GroupUser>()
                .HasOne(gu => gu.Group)
                .WithMany(g => g.GroupUsers)
                .HasForeignKey(g => g.GroupId);
            modelBuilder
                .Entity<GroupUser>()
                .HasOne(gu => gu.User)
                .WithMany(u => u.GroupUsers)
                .HasForeignKey(g => g.UserId);

            // Sets a one-to-one shadow relationship between a Group and an Admin
            modelBuilder
                .Entity<Group>()
                .HasOne(g => g.Admin)
                .WithMany(u => u.Groups)
                .OnDelete(DeleteBehavior.NoAction);

            // Sets a one-to-one relationship between a User and it's login
            modelBuilder
                .Entity<User>()
                .HasOne(u => u.Login)
                .WithOne(l => l.User)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<User>(u => u.LoginId);

            // Sets a one-to-many relationship between a group and it's messages
            modelBuilder
                .Entity<Message>()
                .HasOne(m => m.Group)
                .WithMany(g => g.Messages)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey(m => m.GroupId);

            // Sets a one-to-many relationship between messages and it's authors
            modelBuilder
                .Entity<Message>()
                .HasOne(m => m.User)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.ClientSetNull);
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Login> Logins => Set<Login>();
        public DbSet<Group> Groups => Set<Group>();
        public DbSet<GroupUser> GroupUsers => Set<GroupUser>();
        public DbSet<Message> Messages => Set<Message>();
    }
}
