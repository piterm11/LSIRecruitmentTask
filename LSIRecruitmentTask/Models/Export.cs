namespace LSIRecruitmentTask.Models;

public class Export
{
    public int Id { get; init; }
    public string? ExportName { get; set; }
    public DateTime ExportDateTime { get; set; }
    public string? Username { get; set; }
    public string? Location { get; set; }
}