using LSIRecruitmentTask.Models;
using Microsoft.EntityFrameworkCore;

namespace LSIRecruitmentTask.Data;

public class ExportDbContext(DbContextOptions<ExportDbContext> options) : DbContext(options)
{
    public DbSet<Export> Exports { get; set; }

}
