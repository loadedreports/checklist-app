using ChecklistApi.Entities;

namespace ChecklistApi.Repositories;

public interface ITeamRepository
{
    /// <summary>
    /// Create a new team member
    /// </summary>
    /// <param name="teamMember">The team member to create</param>
    /// <returns>The created team member</returns>
    public Task<TeamMember> Create(TeamMember teamMember);
    
    /// <summary>
    /// Get all team members
    /// </summary>
    /// <returns>The list of team members</returns>
    public Task<IList<TeamMember>> GetAll();
    
    /// <summary>
    /// Get a team member by id
    /// </summary>
    /// <param name="id">The id of the team member to get</param>
    /// <returns>The team member</returns>
    public Task<TeamMember?> Get(int id);
    
    /// <summary>
    /// Update a team member
    /// </summary>
    /// <param name="teamMember">TThe team member to update</param>
    /// <returns>The updated team member</returns>
    public Task<TeamMember> Update(TeamMember teamMember);
    
    /// <summary>
    /// Delete a team member
    /// </summary>
    /// <param name="id">The id of the team member to delete</param>
    public Task Delete(int id);
}