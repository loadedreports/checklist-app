using ChecklistApi.Entities;
using ChecklistApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChecklistApi.Controllers;

[ApiController]
[Route("api/checklists")]
public class ChecklistApi(
    IChecklistService checklistService
) : ControllerBase
{

    /// <summary>
    /// Create a new checklist
    /// </summary>
    /// <param name="checklist">The checklist to create</param>
    /// <returns>The created checklist</returns>
    [HttpPost]
    public async Task<ActionResult<Checklist>> Create(
        [FromBody] Checklist checklist
    )
    {
        return Ok(
            await checklistService.Create(checklist)
        );
    }
    
    /// <summary>
    /// Get all checklists
    /// </summary>
    /// <returns>A list of checklists</returns>
    [HttpGet]
    public async Task<ActionResult<IList<Checklist>>> Get()
    {
        return Ok(
            await checklistService.GetAll()
        );
    }
    
    /// <summary>
    /// Get a checklist by id
    /// </summary>
    /// <param name="id">The id of the checklist to get</param>
    /// <returns>The checklist</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<Checklist>> Get(int id)
    {
        var item = await checklistService.Get(id);
        if (item == default)
        {
            return NotFound();
        }
        return Ok(item);
    }
    
    /// <summary>
    /// Update a checklist
    /// </summary>
    /// <param name="id"></param>
    /// <param name="checklist"></param>
    /// <returns></returns>
    [HttpPut("{id}")]
    public async Task<ActionResult<Checklist>> Update(string id, [FromBody] Checklist checklist)
    {
        if (checklist == default)
        {
            return BadRequest();
        }
        return Ok(
            await checklistService.Update(checklist)
        );
    }

    /// <summary>
    /// Delete a checklist
    /// </summary>
    /// <param name="id">The id of the checklist to delete</param>
    /// <returns></returns>
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var item = await checklistService.Get(id);
        if (item == default)
        {
            return NotFound();
        }

        await checklistService.Delete(id);
        return NoContent();
    }
    
    /// <summary>
    /// Delete a checklist item
    /// </summary>
    /// <param name="id">The id of the checklist to delete the item from</param>
    /// <param name="itemId">The id of the item to delete</param>
    /// <returns></returns>
    [HttpDelete("{id}/item/{itemId}")]
    public async Task<ActionResult> DeleteItem(int id, int itemId)
    {
        var item = await checklistService.GetItem(id, itemId);
        if (item == default)
        {
            return NotFound();
        }

        await checklistService.DeleteItem(id, itemId);
        return NoContent();
    }
    
}