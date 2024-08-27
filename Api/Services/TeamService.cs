using ChecklistApi.Entities;
using ChecklistApi.Repositories;

namespace ChecklistApi.Services;

public class TeamService(
    ITeamRepository teamRepository
) : ITeamService
{
    
    public async Task<TeamMember> Create(TeamMember teamMember)
    {
        return await teamRepository.Create(teamMember);
    }
    public async Task<IList<TeamMember>> GetAll()
    {
        return await teamRepository.GetAll();
    }
    
    public async Task<TeamMember?> Get(int id)
    {
        return await teamRepository.Get(id);
    }

    public async Task<TeamMember> Update(TeamMember teamMember)
    {
        return await teamRepository.Update(teamMember);
    }

    public async Task Delete(int id)
    {
        await teamRepository.Delete(id);
    }
}