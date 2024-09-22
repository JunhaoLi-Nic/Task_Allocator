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

        // SP.NET Core will automatically look for a value in the URL path that matches the {userId} 
        // placeholder and bind it to the userId parameter.
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

        // Create a home
        [HttpPost("home/user/{userId}/create-home")]
        public async Task<IActionResult> CreateHomeByUserId(string userId, [FromBody] HomeCreateModel homeModel)
        {
            if (homeModel == null)
            {
                return BadRequest();
            }

            var newHome = new Homes(Guid.NewGuid(), homeModel.GroupName, Guid.Parse(userId));

            _context.Homes.Add(newHome);
            await _context.SaveChangesAsync();
        /*
        nameof(GetHomesByUserId):
        nameof is a C# operator that returns the name of a variable, type, or member as a string.
        It's used here to provide the name of the action method that can be used to retrieve the newly created resource.
        Using nameof is beneficial because it's checked at compile-time. If you rename the method later, the compiler will catch any missed references.
        new { userId = userId, homeId = newHome.GroupID }:
        This creates an anonymous object with the route values needed to generate the URL for the GetHomesByUserId action.
        It assumes that GetHomesByUserId accepts userId and homeId as parameters.
        newHome:
        This is the newly created home object, which will be serialized into the response body.
        The CreatedAtAction method uses these parameters to:
        Generate a URL for the newly created resource (using the action name and route values).
        Set this URL in the Location header of the response.
        Set the status code to 201 (Created).
        Include the new home object in the response body.
        This follows REST conventions, allowing the client to know:
        That the resource was created successfully (201 status code).
        Where to find the new resource (Location header).
        What the new resource looks like (response body).
        */
            return CreatedAtAction(nameof(GetHomeByHomeId), new { userId = userId, homeId = newHome.GroupID }, newHome);
        }   


        // GET api/task/user/{userId}/homes
        [HttpGet("home/user/{userId}/homes")]
        public async Task<IActionResult> GetHomesByUserId(string userId)
        {
            if (!Guid.TryParse(userId, out Guid userGuid))
            {
                return BadRequest("Invalid user ID format");
            }

            var homes = await _context.Homes
                .Where(h => h.CreatorID == userGuid)
                .Select(h => new
                {
                    h.GroupID,
                    h.GroupName,
                    h.CreatorID
                })
                .ToListAsync();

            if (homes == null || !homes.Any())
            {
                return NotFound("No homes found for this user");
            }

            return Ok(homes);
        }

        // GET api/task/user/{userId}/homes/{homeId}
        [HttpGet("home/user/{userId}/homes/{homeId}")]
        public async Task<IActionResult> GetHomeByHomeId(string userId, string homeId)
        {
            if (!Guid.TryParse(userId, out Guid userGuid) || !Guid.TryParse(homeId, out Guid homeGuid))
            {
                return BadRequest("Invalid user ID or home ID format");
            }

            var home = await _context.Homes
                .Where(h => h.GroupID == homeGuid && h.CreatorID == userGuid)
                .Select(h => new
                {
                    h.GroupID,
                    h.GroupName,
                    h.CreatorID
                })
                .FirstOrDefaultAsync();

            if (home == null)
            {
                return NotFound("Home not found for this user");
            }

            return Ok(home);
        }

        // This class is used for model binding in the CreateTaskByUserId action

        public class TasksCreateModel
        {
            public Guid TaskID { get; set; }
            public string Description { get; set; } = "";
            public Guid RoomID { get; set; }
        }

        // This class is used for model binding in the CreateHomeByUserId action
        public class HomeCreateModel
        {
            public string GroupName { get; set; }
        }

    }
}
