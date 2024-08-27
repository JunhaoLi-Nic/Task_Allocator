using Microsoft.EntityFrameworkCore;
using backend.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add CORS services
builder.Services.AddCors(options => 
{
    options.AddPolicy(name: "MyCorsPolicy",
        builder => 
        {
            builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials(); // Specify the origin(s) allowed to access Next.js API
        });
});


// This registers the services required for managing users and roles in the application. It sets up the identity system, which includes user registration, password management, authentication, and role management.
// AddEntityFramworkStores<AppDbContext>(): tells Identity to use Entity Framework Core to store identity data (like users and roles) in the database 
// AddDefaultTokenProviders(): This adds token providers for generating tokens that can be used for password resets, account confirmations, etc.
builder.Services.AddIdentity<ApplicationUser, Identityrole>().AddEntityFramworkStores<AppDbContext>().AddDefaultTokenProviders();


// Register DbContext with DI container
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), 
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
// CORS must be configured before UseRouting, UseAuthentication, and UseAuthorization for it to work correctly.
app.UseCors("MyCorsPolicy");


app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();