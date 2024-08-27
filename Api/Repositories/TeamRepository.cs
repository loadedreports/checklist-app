using ChecklistApi.Data;
using ChecklistApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChecklistApi.Repositories;

public class TeamRepository(
    ApplicationDbContext context
) : ITeamRepository
{

    public async Task<TeamMember> Create(TeamMember teamMember)
    {
        context.TeamMembers.Add(teamMember);
        await context.SaveChangesAsync();
        return teamMember;
    }
    
    public async Task<IList<TeamMember>> GetAll()
    {
        return await context.TeamMembers
            .ToListAsync();
    }
    
    public async Task<TeamMember?> Get(int id)
    {
        return await context.TeamMembers
            .Where(t => t.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<TeamMember> Update(TeamMember teamMember)
    {
        context.TeamMembers.Update(teamMember);
        await context.SaveChangesAsync();
        return teamMember;
    }

    public async Task Delete(int id)
    {
        var teamMember = await context.TeamMembers.FindAsync(id);
        if (teamMember is not null)
        {
            context.TeamMembers.Remove(teamMember);
            await context.SaveChangesAsync();
        }
    }
}