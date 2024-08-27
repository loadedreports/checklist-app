using ChecklistApi.Entities;

namespace ChecklistApi.Services;

public interface IChecklistService
{
    /// <summary>
    /// Create a new checklist
    /// </summary>
    /// <param name="checklist">The checklist to create</param>
    /// <returns>The created checklist</returns>
    Task<Checklist> Create(Checklist checklist);
    
    /// <summary>
    /// Get all checklists
    /// </summary>
    /// <returns>The list of checklists</returns>
    Task<IList<Checklist>> GetAll();
    
    /// <summary>
    /// Get a checklist by id
    /// </summary>
    /// <param name="id">The id of the checklist to get</param>
    /// <returns>The checklist</returns>
    Task<Checklist?> Get(int id);
    
    /// <summary>
    /// Update a checklist
    /// </summary>
    /// <param name="checklist">The checklist to update</param>
    /// <returns>The updated checklist</returns>
    Task<Checklist> Update(Checklist checklist);
    
    /// <summary>
    /// Delete a checklist
    /// </summary>
    /// <param name="id">The id of the checklist to delete</param>
    Task Delete(int id);
    
    /// <summary>
    /// Get a checklist item by id
    /// </summary>
    /// <param name="id">The id of the checklist to get the item from</param>
    /// <param name="itemId">The id of the item to get</param>
    /// <returns>The checklist item</returns>
    Task<ChecklistItem?> GetItem(int id, int itemId);
    
    /// <summary>
    /// Delete a checklist item
    /// </summary>
    /// <param name="id">The id of the checklist to delete the item from</param>
    /// <param name="itemId">The id of the item to delete</param>
    Task DeleteItem(int id, int itemId);
}