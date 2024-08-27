using System.ComponentModel.DataAnnotations;

namespace ChecklistApi.Entities;

public class ChecklistItem
{
    public int Id { get; set; }

    [MaxLength(100)]
    public string Title { get; set; } = "";

    [MaxLength(1000)]
    public string Description { get; set; } = "";

    public virtual int ChecklistId { get; set; }
}