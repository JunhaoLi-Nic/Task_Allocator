using System.Security.Cryptography;
using BCrypt.Net;

namespace backend.Models;

public class User
{
    public Guid UserID { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    // Parameterless constructor for EF Core
    public User() { }

    // Method to create a new user with a password
    public User(string name, string email, string password)
    {
        
        UserID = Guid.NewGuid();
        Name = name;
        Email = email;
        PasswordHash = HashPassword(password);
    }

    private static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool VerifyPassword(string password)
    {
        return BCrypt.Net.BCrypt.Verify(password, PasswordHash);
    }
}

