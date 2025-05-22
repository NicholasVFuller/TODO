using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Data;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            // CRITICAL: Always return grouped and ordered
            return await _context.TodoItems
                .OrderBy(t => t.IsComplete)
                .ThenBy(t => t.OrderNum)
                .ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoItem(int id, [FromBody] TodoItem updatedTodo)
        {
            if (id != updatedTodo.Id)
                return BadRequest();

            var todo = await _context.TodoItems.FindAsync(id);
            if (todo == null)
                return NotFound();

            // Update fields
            todo.Name = updatedTodo.Name;
            todo.IsComplete = updatedTodo.IsComplete;
            todo.CompletedAt = updatedTodo.CompletedAt;
            // Add any other fields you have

            await _context.SaveChangesAsync();
            return Ok(todo);
        }

        // PUT: api/todo/reorder
        [HttpPut("reorder")]
        public async Task<IActionResult> ReorderTodos([FromBody] List<TodoOrderDto> orderList)
        {
            foreach (var item in orderList)
            {
                var todo = await _context.TodoItems.FindAsync(item.Id);
                if (todo != null)
                {
                    todo.OrderNum = item.OrderNum;
                }
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodoItem([FromBody] TodoItem newTodo)
        {
            _context.TodoItems.Add(newTodo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodoItems), new { id = newTodo.Id }, newTodo);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var todo = await _context.TodoItems.FindAsync(id);
            if (todo == null)
                return NotFound();
            _context.TodoItems.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class TodoOrderDto
    {
        public int Id { get; set; }
        public int OrderNum { get; set; }
    }
}