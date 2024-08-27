using ChecklistApi.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ChecklistApi.Data;

public class ApplicationDbContext: DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Checklist> Checklists { get; set; }
    public DbSet<ChecklistItem> ChecklistItems { get; set; }
    public DbSet<TeamMember> TeamMembers { get; set; }
    
    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<DateTimeOffset>()
            .HaveConversion<DateTimeOffsetToStringConverter>();
        configurationBuilder.Properties<DateTimeOffset?>()
            .HaveConversion<DateTimeOffsetToStringConverter>();
        
        base.ConfigureConventions(configurationBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<TeamMember>().HasData(
            new TeamMember { Id = 1, FirstName = "Ava", LastName = "Cado", Email = "ava@example.com", },
            new TeamMember { Id = 2, FirstName = "Cara", LastName = "Mello", Email = "cara@example.com", },
            new TeamMember { Id = 3, FirstName = "Pete", LastName = "Zah", Email = "pete@example.com", }
        );
        
        modelBuilder.Entity<Checklist>().HasData(
            new Checklist { Id = 1, Name = "Start of day - kitchen", Description = "Checklist tracking what needs to be done first thing in the kitchen.", CreatedAt = DateTimeOffset.Parse("2024-04-01T11:00:00+13:00") },
            new Checklist { Id = 2, Name = "End of day - kitchen", Description = "Closing process for end of day.", CreatedAt = DateTimeOffset.Parse("2024-04-01T11:40:00+13:00") },
            new Checklist { Id = 3, Name = "Midday check in", Description = "Lists of tasks to be completed around midday, these can be done by anyone.", CreatedAt = DateTimeOffset.Parse("2024-06-11T08:00:00+12:00") }
        );

        modelBuilder.Entity<ChecklistItem>().HasData(
            new ChecklistItem { Id = 1, Title = "Bring in bins", Description = "Get the bins ready for use during the day, they'll be on the street after being emptied.", ChecklistId = 1 },
            new ChecklistItem { Id = 2, Title = "Check fridge temps", Description = "Check all fridge temps and record them in the checklist.", ChecklistId = 1 },
            new ChecklistItem { Id = 3, Title = "Turn on fryer", Description = "Get the fryer warmed up.", ChecklistId = 1 },
            new ChecklistItem { Id = 4, Title = "Turn on coffee machine", Description = "Get the coffee machine warmed up.", ChecklistId = 1 },
            new ChecklistItem { Id = 5, Title = "Turn off coffee machine and clean", Description = "Make sure the coffee machine is clean and turned off overnight.", ChecklistId = 2 },
            new ChecklistItem { Id = 6, Title = "Turn off fryer and clean", Description = "Make sure the fryer is clean and turned off overnight.", ChecklistId = 2 },
            new ChecklistItem { Id = 7, Title = "Check fridge temps", Description = "Check all fridge temps and record them in the checklist.", ChecklistId = 2 },
            new ChecklistItem { Id = 8, Title = "Put bins out", Description = "Last thing before you leave, put the bins out on the street.", ChecklistId = 2 },
            new ChecklistItem { Id = 9, Title = "Check fridge temps", Description = "Check all fridge temps and record them in the checklist.", ChecklistId = 3 },
            new ChecklistItem { Id = 10, Title = "Let FOH know the specials", Description = "Update the FOH team on today's specials so they can get them on the chalkboard.", ChecklistId = 3 }
        );
    }
}