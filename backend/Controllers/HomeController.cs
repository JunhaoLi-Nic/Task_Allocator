﻿using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using Microsoft.Identity.Client;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using BCrypt.Net;

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
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest("Email and password are required.");
            }

            if (_context.Users.Any(u => u.Email == model.Email))
            {
                return Conflict("A user with this email already exists.");
            }

            var newUser = new User(model.Name, model.Email, model.Password);

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetUserByUserId), new { userId = newUser.UserID }, new { userId = newUser.UserID, name = newUser.Name, email = newUser.Email });
        }

        
        // This class is used for model binding in the CreateUser action    
        /// <summary>
        /// Represents the data model for creating a new user.
        /// </summary>
        public class UserCreateModel
        {
            public string Name { get; set; } = "";
            public string Email { get; set; } = "";
            public string Password { get; set; } = "";
        }

        [HttpDelete("home/user/{userId}")]
        public IActionResult DeleteUser(Guid userId)
        {
            var user = _context.Users.Find(userId); 
            if(user == null)
            {
                return NotFound($"User with ID {userId} not found.");
            }
            _context.Users.Remove(user);
            _context.SaveChanges();
            return NoContent();
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

        [HttpDelete("home/user/{userId}/homes")]
        public async Task<IActionResult> DeleteHomesByUserId(string userId)
        {
            if (!Guid.TryParse(userId, out Guid userGuid)) // Check if the userId is in the correct format, It returns a boolean value indicating whether the conversion succeeded or failed.
            {
                return BadRequest("Invalid user ID format");
            }

            var homes = await _context.Homes
                .Where(h => h.CreatorID == userGuid)
                .ToListAsync();

            if (homes == null || !homes.Any())
            {
                return NotFound("No homes found for this user");
            }
                
            _context.Homes.RemoveRange(homes);
            await _context.SaveChangesAsync();

            return NoContent();
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

        // Delete a room
        // summary: Deletes a room by its ID for a specific home.
        // parameters:
        // - userId: The ID of the user.
        // - homeId: The ID of the home.
        // - roomId: The ID of the room to delete.
        // returns:
        // - 204 No Content: If the room was deleted successfully.
        // - 400 Bad Request: If the user ID, home ID, or room ID format is invalid.
        // - 404 Not Found: If the room is not found for the specified home.
        [HttpDelete("home/user/{userId}/homes/{homeId}/rooms/{roomId}")]
        public async Task<IActionResult> DeleteRoomByRoomId(string userId, string homeId, string roomId)
        {
            if (!Guid.TryParse(userId, out Guid userGuid) || !Guid.TryParse(homeId, out Guid homeGuid) || !Guid.TryParse(roomId, out Guid roomGuid))
            {
                return BadRequest("Invalid user ID, home ID, or room ID format");
            }

            var room = await _context.Rooms.FindAsync(roomGuid);

            if (room == null || room.HomeID != homeGuid)
            {
                return NotFound("Room not found for this home");
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// Retrieves rooms for a specific home.
        /// </summary>
        /// <param name="userId">The ID of the user to retrieve rooms for.</param>
        /// <param name="homeId">The ID of the home to retrieve rooms for.</param>
        /// <returns>A list of rooms for the specified home.</returns>
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
        /// <summary>
        /// Represents the data model for creating a new home.
        /// </summary>
        public class HomeCreateModel
        {
            public string GroupName { get; set; } = string.Empty;
        }

        // This class is used for model binding in the CreateRoomByHomeId action
        /// <summary>
        /// Represents the data model for creating a new room.
        /// </summary>
        public class RoomCreateModel
        {
            public string RoomName { get; set; } = string.Empty;
        }

        // Login
        /// <summary>
        /// Represents the data model for user login.
        /// </summary>
        [HttpPost("home/login")]
        public IActionResult Login([FromBody] UserLoginModel model)
        {
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest("Email and password are required.");
            }

            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);

            if (user == null || !user.VerifyPassword(model.Password))
            {
                return Unauthorized("Invalid email or password.");
            }

            // TODO: Generate and return a JWT token for authentication

            return Ok(new { userId = user.UserID, name = user.Name, email = user.Email });
        }

        public class UserLoginModel
        {
            public string Email { get; set; } = "";
            public string Password { get; set; } = "";
        }
    }


}
