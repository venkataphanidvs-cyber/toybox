using Microsoft.EntityFrameworkCore;
using ToyBox.Api.Models;

namespace ToyBox.Api.Data;

public class ToyBoxDbContext : DbContext
{
    public ToyBoxDbContext(DbContextOptions<ToyBoxDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "Turbo Racing Car",
                Category = "Cars",
                Description = "Remote controlled • Ages 6+",
                Price = 5999,
                Rating = 4.7,
                Age = "6+"
            },
            new Product
            {
                Id = 2,
                Name = "Dinosaur Explorer",
                Category = "Figures",
                Description = "Adventure set • Ages 5+",
                Price = 1499,
                Rating = 4.8,
                Age = "5+"
            },
            new Product
            {
                Id = 3,
                Name = "Build Your Robot",
                Category = "STEM",
                Description = "STEM kit • Ages 8+",
                Price = 2299,
                Rating = 4.9,
                Age = "8+"
            },
            new Product
            {
                Id = 4,
                Name = "World Explorer Puzzle",
                Category = "Puzzles",
                Description = "500 pieces • Ages 8+",
                Price = 699,
                Rating = 4.6,
                Age = "8+"
            }
        );
    }
}
