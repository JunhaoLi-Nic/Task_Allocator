using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace backend.Models;

public class User
{
    public string Name { get; set; }
    public Guid UserID { get; set; }

    // Optional: Additional constructor for your custom logic
    public User(Guid userID, string name)
    {
        UserID = userID;
        Name = name;
    }
}

