using System.ComponentModel.DataAnnotations;

namespace ChecklistApi.Entities;

public class TeamMember
{
    public int Id { get; set; }
 
    [MaxLength(100)]
    public string FirstName { get; set; } = "";

    [MaxLength(100)]
    public string LastName { get; set; } = "";

    [MaxLength(100)]
    public string Email { get; set; } = "";
}