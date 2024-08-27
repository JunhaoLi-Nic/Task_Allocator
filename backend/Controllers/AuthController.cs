using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;

namespace backend.Controllers;

[ApiController]
[Route("auth/[controller]")]
public class AuthController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new ApplicationUser { UserName = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new { Message = "User registered successfully" });
            }
            return BadRequest(result.Errors);
        }
        return BadRequest("Invalid data");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] RegisterModel model)
    {
        if (ModelState.IsValid)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);


            if (result.Succeeded)
            {
                return Ok(new { Message = "Login successfuly" });
            }
            return Unauthorized("Invalid login attempt");
        }
        return BadRequest("Invalid data"); 
    }    
}