
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoItem>().ToTable("todoitems");
            modelBuilder.Entity<TodoItem>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.IsComplete).HasColumnName("iscomplete");
                entity.Property(e => e.CompletedAt).HasColumnName("completedat");
                entity.Property(e => e.OrderNum).HasColumnName("ordernum");
            });
        }
    }
}
