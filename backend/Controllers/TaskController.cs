using Microsoft.AspNetCore.Mvc;
using System.Linq;
using backend.Data; // Assuming your DbContext is in the Data namespace
using backend.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class TaskController : Controller
    {
        private readonly ILogger<TaskController> _logger;
        private readonly AppDbContext _context;

        public TaskController(ILogger<TaskController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        // GET api/task/user/{userId}
        [HttpGet("home/user/{userId}/tasks")]
        public async Task<IActionResult> GetTasksByUserId(Guid userId)
        {
            var tasks = await (from tp in _context.TaskPermissions
                            join t in _context.Tasks on tp.TaskID equals t.TaskID
                            where tp.UserID == userId
                            select new
                            {
                                t.TaskID,
                                Description = t.Description ?? "",  // Handle NULL
                                RoomID = t.RoomID  // No need to handle NULL for Guid?
                            }).ToListAsync();

            if (tasks == null || !tasks.Any())
            {
                return NotFound();
            }

            return Json(tasks);
        }


        // POST api/task/create-task
        [HttpPost("home/user/{userId}/create-task")]

        // SP.NET Core will automatically look for a value in the URL path that matches the {userId} placeholder and bind it to the userId parameter.
        public async Task<IActionResult> CreateTaskByUserId(string userId, [FromBody] TasksCreateModel task)
        {
            if (task == null)
            {
                return BadRequest();
            }
            
            var newTask = new Tasks(Guid.NewGuid(), task.RoomID, task.Description, false, "Pending", "Unassigned");

            _context.Tasks.Add(newTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTasksByUserId), new { userId = userId, taskId = newTask.TaskID }, newTask);
        }

        // This class is used for model binding in the CreateTaskByUserId action
        public class TasksCreateModel
        {
            public Guid TaskID { get; set; }
            public string Description { get; set; } = "";
            public Guid RoomID { get; set; }
        }

        
    }
}
