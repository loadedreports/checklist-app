using System.ComponentModel.DataAnnotations;

namespace ChecklistApi.Entities;

public class Checklist
{
    public int Id { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    [MaxLength(100)]
    public string Name { get; set; } = "";

    [MaxLength(1000)]
    public string Description { get; set; } = "";

    public IList<ChecklistItem> Items { get; set; } = new List<ChecklistItem>();
}