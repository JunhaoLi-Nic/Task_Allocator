using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { } 

    public DbSet<User> Users { get; set; }

    public DbSet<Tasks> Tasks { get; set; }

    public DbSet<TaskPermissions> TaskPermissions { get; set; }

    public DbSet<Homes> Homes { get; set; }

    public DbSet<Rooms> Rooms { get; set; }

    public DbSet<TaskHistory> TaskHistory { get; set; }
   
    
    /// <summary>
    /// Configures the model and relationships between entities when the database is created.
    /// This method is called when the model for a derived context has been initialized, but
    /// before the model has been locked down and used to initialize the context.
    /// </summary>
    /// <param name="modelBuilder">The builder being used to construct the model for this context.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Tasks>()
            .HasKey(t => t.TaskID);

        // Define composite key for TaskPermissions
        modelBuilder.Entity<TaskPermissions>()
            .HasKey(tp => new { tp.TaskID, tp.UserID });

        // Additional configurations can go here
        modelBuilder.Entity<User>().HasKey(u => u.UserID); // Ensure this is set correctly

        modelBuilder.Entity<Homes>().HasKey(h => h.GroupID);

        modelBuilder.Entity<Rooms>().HasKey(r => r.RoomID);

        modelBuilder.Entity<TaskHistory>().HasKey(th => th.TaskHistoryID);

    }

}

