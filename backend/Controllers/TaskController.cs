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

        /// <summary>
        /// Initializes a new instance of the TaskController class.
        /// </summary>
        /// <param name="logger">The logger for logging messages.</param>   
        /// <param name="context">The database context for accessing data.</param>
        public TaskController(ILogger<TaskController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        // GET api/task/user/{userId}
        /// <summary>
        /// Retrieves tasks for a specific user.
        /// </summary>
        /// <param name="userId">The ID of the user to retrieve tasks for.</param>
        /// <returns>A list of tasks for the specified user.</returns>
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

        // SP.NET Core will automatically look for a value in the URL path that matches the {userId} 
        // placeholder and bind it to the userId parameter.
        public async Task<IActionResult> CreateTaskByUserId(string userId, [FromBody] TasksCreateModel task)
        {
            if (task == null)
            {
                return BadRequest();
            }

            var newTask = new Tasks(Guid.NewGuid(), task.RoomID, task.Description, task.IsPrivate, task.Status, task.AssignedTo);

            _context.Tasks.Add(newTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTasksByUserId), new { userId = userId, taskId = newTask.TaskID }, newTask);
        }

        // Get taskHistory by userId and taskID
        [HttpGet("home/user/{userId}/task/{taskId}/task-history")]
        public async Task<IActionResult> GetTaskHistoryByUserIdAndTaskId(Guid userId, Guid taskId)
        {
            var taskHistory = await _context.TaskHistory
                .Where(th => th.UserID == userId && th.TaskID == taskId)
                .ToListAsync();

            if (taskHistory == null || !taskHistory.Any())
            {
                return NotFound();
            }

            return Json(taskHistory);
        }   

        // POST api/task/create-task-history
        [HttpPost("home/user/{userId}/task/{taskId}/create-task-history")]
        public async Task<IActionResult> CreateTaskHistoryByUserIdAndTaskId(Guid userId, Guid taskId, [FromBody] TaskHistoryCreateModel taskHistory)
        {
            if (taskHistory == null)
            {
                return BadRequest();
            }

            var newTaskHistory = new TaskHistory(Guid.NewGuid(), userId, taskId, taskHistory.Timestamp, taskHistory.Status);

            _context.TaskHistory.Add(newTaskHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskHistoryByUserIdAndTaskId), new { userId = userId, taskId = taskId }, newTaskHistory);
        }

        [HttpDelete("home/user/{userId}/task/{taskId}/delete-task-history/{taskHistoryId}")]
        public async Task<IActionResult> DeleteTaskHistoryByUserIdAndTaskId(Guid userId, Guid taskId, Guid taskHistoryId)
        {
            var taskHistory = await _context.TaskHistory
                .Where(th => th.UserID == userId && th.TaskID == taskId)
                .FirstOrDefaultAsync();

            if (taskHistory == null)
            {
                return NotFound();
            }

            _context.TaskHistory.Remove(taskHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        

        // This class is used for model binding in the CreateTaskByUserId action
        /// <summary>
        /// Represents the data model for creating a new task.
        /// </summary>
        public class TasksCreateModel
        {
            public Guid TaskID { get; set; }
            public string Description { get; set; } = "";
            public Guid RoomID { get; set; }

            public bool IsPrivate { get; set; }

            public string Status { get; set; } = "";

            public string AssignedTo { get; set; } = "Unassigned";
        }

        /// <summary>
        /// Represents the data model for creating a new task history.
        /// </summary>
        public class TaskHistoryCreateModel
        {
            public string Status { get; set; } = "";

            public DateTime Timestamp { get; set; }
        }

    }
}
