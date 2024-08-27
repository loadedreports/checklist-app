using ChecklistApi.Data;
using ChecklistApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChecklistApi.Repositories;

public class ChecklistRepository(
    ApplicationDbContext context
) : IChecklistRepository
{
    public async Task<Checklist> Create(Checklist checklist)
    {
        context.Checklists.Add(checklist);
        await context.SaveChangesAsync();
        return checklist;
    }

    public async Task<IList<Checklist>> GetAll()
    {
        return await context.Checklists
            .Include(c => c.Items)
            // TODO - task is to add ordering, allow the user to adjust the order of items?
            .ToListAsync();
    }

    public async Task<Checklist?> Get(int id)
    {
        return await context.Checklists
            .Include(c => c.Items)
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<Checklist> Update(Checklist checklist)
    {
        context.Checklists.Update(checklist);
        await context.SaveChangesAsync();
        return checklist;
    }

    public async Task Delete(int id)
    {
        var checklist = await context.Checklists.FindAsync(id);
        if (checklist is not null)
        {
            context.Checklists.Remove(checklist);
            await context.SaveChangesAsync();
        }
    }
    
    public async Task<ChecklistItem?> GetItem(int id, int itemId)
    {
        return await context.ChecklistItems
            .Where(i =>
                i.ChecklistId == id
                && i.Id == itemId
            )
            .FirstOrDefaultAsync();
    }

    public async Task DeleteItem(int id, int itemId)
    {
        var item = await GetItem(id, itemId);

        if (item is not null)
        {
            context.ChecklistItems.Remove(item);
            await context.SaveChangesAsync();
        }
    }
}