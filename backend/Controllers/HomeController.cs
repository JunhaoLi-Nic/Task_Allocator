using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;

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

        // POST method to create a new User
        [HttpPost("home/create-user")]
        public IActionResult CreateUser([FromBody] UserCreateModel model)
        {
            // Create a new User instance
            var newUser = new User(Guid.NewGuid(), model.Name, model.Email);

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
    }

    // This class is used for model binding in the CreateUser action    
    public class UserCreateModel
    {
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
    }
}
