using ChecklistApi.Entities;
using ChecklistApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChecklistApi.Controllers;

[ApiController]
[Route("api/team-members")]
public class TeamMembersApi(
    ITeamService teamService
) : ControllerBase
{
    
    /// <summary>
    /// Create a new team member
    /// </summary>
    /// <param name="teamMember">The team member to create</param>
    /// <returns>The created team member</returns>
    [HttpPost]
    public async Task<ActionResult<TeamMember>> Create(TeamMember teamMember)
    {
        return Ok(
            await teamService.Create(teamMember)
        );
    }
    
    /// <summary>
    /// Get all team members
    /// </summary>
    /// <returns>A list of team members</returns>
    [HttpGet]
    public async Task<ActionResult<IList<TeamMember>>> Get()
    {
        return Ok(
            await teamService.GetAll()
        );
    }
    
    /// <summary>
    /// Get a team member by id
    /// </summary>
    /// <param name="id">The id of the team member to get</param>
    /// <returns>The team member</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<TeamMember>> Get(int id)
    {
        var item = await teamService.Get(id);
        if (item == default)
        {
            return NotFound();
        }
        return Ok(item);
    }
    
    /// <summary>
    /// Update a team member
    /// </summary>
    /// <param name="teamMember">The team member to update</param>
    /// <returns>The updated team member</returns>
    [HttpPut("{id}")]
    public async Task<ActionResult<TeamMember>> Update(TeamMember teamMember)
    {
        if (teamMember == default)
        {
            return BadRequest();
        }
        return Ok(
            await teamService.Update(teamMember)
        );
    }
    
    /// <summary>
    /// Delete a team member
    /// </summary>
    /// <param name="id">The id of the team member to delete</param>
    /// <returns>The deleted team member</returns>
    [HttpDelete("{id}")]
    public async Task<ActionResult<TeamMember>> Delete(int id)
    {
        var item = await teamService.Get(id);
        if (item == default)
        {
            return NotFound();
        }

        await teamService.Delete(id);
        return NoContent();
    }
    
}