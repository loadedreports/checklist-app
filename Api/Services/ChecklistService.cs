using ChecklistApi.Repositories;
using ChecklistApi.Entities;

namespace ChecklistApi.Services;

public class ChecklistService(
    IChecklistRepository checklistRepository
) : IChecklistService
{
    
    public async Task<Checklist> Create(Checklist checklist)
    {
        checklist.CreatedAt = DateTimeOffset.UtcNow;
        return await checklistRepository.Create(checklist);
    }

    public async Task<IList<Checklist>> GetAll()
    {
        return await checklistRepository.GetAll();
    }
    
    public async Task<Checklist?> Get(int id)
    {
        return await checklistRepository.Get(id);
    }

    public async Task<Checklist> Update(Checklist checklist)
    {
        return await checklistRepository.Update(checklist);
    }

    public async Task Delete(int id)
    {
        await checklistRepository.Delete(id);
    }

    public async Task<ChecklistItem?> GetItem(int id, int itemId)
    {
        return await checklistRepository.GetItem(id, itemId);
    }

    public async Task DeleteItem(int id, int itemId)
    {
        await checklistRepository.DeleteItem(id, itemId);
    }
}
