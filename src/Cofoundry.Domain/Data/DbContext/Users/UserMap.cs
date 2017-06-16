using Cofoundry.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Cofoundry.Domain.Data
{
    public class UserMap : IEntityTypeConfiguration<User>
    {
        public void Create(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("User", DbConstants.CofoundrySchema);

            builder.Property(s => s.FirstName)
                .IsRequired()
                .HasMaxLength(32);

            builder.Property(s => s.LastName)
                .IsRequired()
                .HasMaxLength(32);

            builder.Property(s => s.Email)
                .HasMaxLength(150);

            builder.Property(s => s.Username)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(s => s.Password)
                .IsNVarCharMaxType();

            builder.Property(s => s.UserAreaCode)
                .IsRequired()
                .IsCharType(3);

            // Relationships

            builder.HasOne(s => s.Role)
                .WithMany()
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            #region create auditable (ish)
            
            builder.HasOne(s => s.Creator)
                .WithMany()
                .HasForeignKey(d => d.CreatorId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(s => s.UserArea)
                .WithMany(d => d.Users)
                .HasForeignKey(d => d.UserAreaCode)
                .OnDelete(DeleteBehavior.Restrict);

            #endregion
        }
    }
}
