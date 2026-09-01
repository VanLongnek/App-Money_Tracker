using System;
using System.Collections.Generic;
using ExpenseManager.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseManager.Api.Data;

public partial class ExpenseManagerDbContext : DbContext
{
    public ExpenseManagerDbContext(DbContextOptions<ExpenseManagerDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<ExpenseTransaction> ExpenseTransactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Categori__19093A0B29E60A95");

            entity.HasIndex(e => new { e.CategoryName, e.CategoryType }, "UQ_Categories_Name_Type").IsUnique();

            entity.Property(e => e.CategoryName).HasMaxLength(100);
            entity.Property(e => e.CategoryType)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Color)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.CreatedAt)
                .HasPrecision(0)
                .HasDefaultValueSql("(sysdatetime())", "DF_Categories_CreatedAt");
            entity.Property(e => e.Icon).HasMaxLength(50);
        });

        modelBuilder.Entity<ExpenseTransaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PK__ExpenseT__55433A6BF77EBCD4");

            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.CreatedAt)
                .HasPrecision(0)
                .HasDefaultValueSql("(sysdatetime())", "DF_Transactions_CreatedAt");
            entity.Property(e => e.Note).HasMaxLength(255);
            entity.Property(e => e.UpdatedAt).HasPrecision(0);

            entity.HasOne(d => d.Category).WithMany(p => p.ExpenseTransactions)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Transactions_Categories");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
