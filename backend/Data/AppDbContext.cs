using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }

    public DbSet<Tasks> Tasks { get; set; }

    public DbSet<TaskPermissions> TaskPermissions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Tasks>()
            .HasKey(t => t.TaskID);

        // Define composite key for TaskPermissions
        modelBuilder.Entity<TaskPermissions>()
            .HasKey(tp => new { tp.TaskID, tp.UserID });

        // Additional configurations can go here
    }
}

