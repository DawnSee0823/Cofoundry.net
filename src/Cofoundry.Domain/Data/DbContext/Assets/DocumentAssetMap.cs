using Cofoundry.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Cofoundry.Domain.Data
{
    public class DocumentAssetMap : IEntityTypeConfiguration<DocumentAsset>
    {
        public void Configure(EntityTypeBuilder<DocumentAsset> builder)
        {
            builder.ToTable("DocumentAsset", DbConstants.CofoundrySchema);

            // Properties
            builder.Property(s => s.FileName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(s => s.Title)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(s => s.Description)
                .IsRequired();

            builder.Property(s => s.FileExtension)
                .IsRequired()
                .HasMaxLength(5);

            builder.Property(s => s.ContentType)
                .HasMaxLength(100);

            UpdateAuditableMappingHelper.Map(builder);
        }
    }
}
