using Microsoft.AspNetCore.Mvc;
using System.Linq;
using backend.Data; // Assuming your DbContext is in the Data namespace
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/task/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetTasksByUserId(Guid userId)
        {
            var tasks = await (from tp in _context.TaskPermissions
                               join t in _context.Tasks on tp.TaskID equals t.TaskID
                               where tp.UserID == userId
                               select new
                               {
                                   t.TaskID,
                                   t.Description
                               }).ToListAsync();

            if (tasks == null || !tasks.Any())
            {
                return NotFound();
            }

            return Ok(tasks);
        }

        
    }
}
