using Microsoft.EntityFrameworkCore;
using BudgetAPI.Models;

namespace BudgetAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed sample categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Food" },
                new Category { Id = 2, Name = "Transport" },
                new Category { Id = 3, Name = "Entertainment" },
                new Category { Id = 4, Name = "Utilities" },
                new Category { Id = 5, Name = "Other" }
            );
        }
    }
}