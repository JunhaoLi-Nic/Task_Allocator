using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using Microsoft.Identity.Client;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly AppDbContext _context;

        public HomeController(ILogger<HomeController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        // Test method to retrieve all users
        [HttpGet("home/data")]
        public IActionResult GetData()
        {
            var users = _context.Users.ToList();
            return Json(users);
        }

        [HttpGet("home/user/{userId}")]
        public IActionResult GetUserByUserId(Guid userId)
        {
            _logger.LogInformation($"Attempting to find user with ID: {userId}");
            var user = _context.Users.Find(userId);
            if (user == null)
            {
                _logger.LogWarning($"User with ID {userId} not found.");
                return NotFound($"User with ID {userId} not found.");
            }
            return Json(user);
        }


        // POST method to create a new User
        [HttpPost("home/create-user")]
        public IActionResult CreateUser([FromBody] UserCreateModel model)
        {
            // Create a new User instance
            var newUser = new User(Guid.NewGuid(), model.Name);

            // Add the new User to the database context
            _context.Users.Add(newUser);
            _context.SaveChanges();

            // Return the created user with a 201 Created status
            return CreatedAtAction(nameof(GetData), new { id = newUser.UserID }, newUser);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
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

        // Delete a home
        [HttpDelete("home/user/{userId}/homes/{homeId}")]
        public async Task<IActionResult> DeleteHomeByHomeId(string userId, string homeId)
        {
            if (!Guid.TryParse(userId, out Guid userGuid) || !Guid.TryParse(homeId, out Guid homeGuid))
            {
                return BadRequest("Invalid user ID or home ID format");
            }   

            var home = await _context.Homes
                .Where(h => h.GroupID == homeGuid && h.CreatorID == userGuid)
                .FirstOrDefaultAsync();

            if (home == null)
            {
                return NotFound("Home not found for this user");
            }

            _context.Homes.Remove(home);
            await _context.SaveChangesAsync();

            return NoContent();
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

        // Create a room
        [HttpPost("home/user/{userId}/homes/{homeId}/create-room")]
        public async Task<IActionResult> CreateRoomByHomeId(string userId, string homeId, [FromBody] RoomCreateModel roomModel)
        {
            if (roomModel == null)
            {
                return BadRequest();
            }

            var newRoom = new Rooms(Guid.NewGuid(), roomModel.RoomName, Guid.Parse(homeId));

            _context.Rooms.Add(newRoom);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoomsByHomeId), new { userId = userId, homeId = homeId, roomId = newRoom.RoomID }, newRoom);
        }

        // Get rooms by homeId
        [HttpGet("home/user/{userId}/homes/{homeId}/rooms")]
        public async Task<IActionResult> GetRoomsByHomeId(string userId, string homeId)
        {
            if (!Guid.TryParse(userId, out Guid userGuid) || !Guid.TryParse(homeId, out Guid homeGuid))
            {
                return BadRequest("Invalid user ID or home ID format");
            }

            var rooms = await _context.Rooms
                .Where(r => r.HomeID == homeGuid)
                .Select(r => new
                {
                    r.RoomID,
                    r.RoomName,
                    r.HomeID
                })
                .ToListAsync();

            if (rooms == null || !rooms.Any())
            {
                return NotFound("No rooms found for this home");
            }

            return Ok(rooms);
        }

        // This class is used for model binding in the CreateHomeByUserId action
        public class HomeCreateModel
        {
            public string GroupName { get; set; } = string.Empty;
        }

        // This class is used for model binding in the CreateRoomByHomeId action
        public class RoomCreateModel
        {
            public string RoomName { get; set; } = string.Empty;
        }
    }

    // This class is used for model binding in the CreateUser action    
    public class UserCreateModel
    {
        public string Name { get; set; } = "";
    }
}
