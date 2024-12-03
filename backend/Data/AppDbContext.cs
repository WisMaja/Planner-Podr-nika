using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Dodaj DbSet dla swoich modeli, np.:
    public DbSet<User>? Users { get; set; }
    public DbSet<Trip>? Trips { get; set; }
}