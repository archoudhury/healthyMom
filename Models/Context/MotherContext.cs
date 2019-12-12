using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using HealthyMom.Models;

namespace HealthyMom.Models.Context
{
    public partial class MotherContext : DbContext
    {
        public MotherContext()
        {
        }

        public MotherContext(DbContextOptions<MotherContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Anganwadi> Anganwadi { get; set; }
        public virtual DbSet<Mother> Mother { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:arya.database.windows.net,1433;Initial Catalog=mother;Persist Security Info=False;User ID=arya;Password=Portal123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Anganwadi>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(2000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.WorkerId).HasMaxLength(20);

                entity.Property(e => e.WorkerName)
                    .IsRequired()
                    .HasMaxLength(300);
            });

            modelBuilder.Entity<Mother>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(4000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.ExpectedDeliveryDate).HasColumnType("datetime");

                entity.Property(e => e.FertilityDate).HasColumnType("datetime");

                entity.Property(e => e.HusbandName)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Aadhar)
                    .IsRequired()
                    .HasMaxLength(12);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(200);

                entity.Property(e => e.Mobile)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Password).IsRequired();

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
