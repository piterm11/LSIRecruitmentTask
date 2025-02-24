using LSIRecruitmentTask.Data;
using LSIRecruitmentTask.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LSIRecruitmentTask.Controllers;
[ApiController]
[Route("api/[controller]")]
public class ExportsController(ExportDbContext context) : ControllerBase
{
    // GET: /api/exports?fromDate=2024-02-01&toDate=2024-02-10&location=Warszawa
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Export>>> GetExports(DateTime? fromDate, DateTime? toDate, string? location)
    {
        var query = context.Exports.AsQueryable();
            
        if (fromDate.HasValue)
            query = query.Where(e => e.ExportDateTime.Date >= fromDate.Value.Date);
            
        if (toDate.HasValue)
            query = query.Where(e => e.ExportDateTime.Date <= toDate.Value.AddDays(1).AddSeconds(-1).Date);
            
        if (!string.IsNullOrEmpty(location))
            query = query.Where(e => e.Location == location);

        var exports = await query.ToListAsync();
        return Ok(exports);
    }

    [HttpGet("locations")]
    public async Task<ActionResult<IEnumerable<string>>> GetLocations()
    {
        var query = context.Exports.AsQueryable();
        var locations = await query.Select(e => e.Location).Distinct().ToListAsync();
        return Ok(locations);
    }

    // POST: /api/exports
    [HttpPost]
    public async Task<ActionResult<Export>> CreateExport([FromBody] Export export)
    {
        context.Exports.Add(export);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetExports), new { id = export.Id }, export);
    }
}