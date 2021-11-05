using Cofoundry.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cofoundry.Domain.Data
{
    public class PageDirectoryClosureMap : IEntityTypeConfiguration<PageDirectoryClosure>
    {
        public void Configure(EntityTypeBuilder<PageDirectoryClosure> builder)
        {
            builder.ToTable("PageDirectoryClosure", DbConstants.CofoundrySchema);

            // Primary Key

            builder.HasKey(s => new { s.AncestorPageDirectoryId, s.DescendantPageDirectoryId });

            // Relationships

            builder.HasOne(s => s.AncestorPageDirectory)
                .WithMany(s => s.DescendantPageDirectories)
                .HasForeignKey(d => d.AncestorPageDirectoryId);

            builder.HasOne(s => s.DescendantPageDirectory)
                .WithMany(s => s.AncestorPageDirectories)
                .HasForeignKey(d => d.DescendantPageDirectoryId);
        }
    }
}
