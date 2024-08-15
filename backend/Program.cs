using Microsoft.EntityFrameworkCore;
using backend.Data;

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


// Add services to the container.
builder.Services.AddControllers();

// Register DbContext with DI container
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

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