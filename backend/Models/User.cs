namespace backend.Models;

public class User
{
    public string Name { get; set; }
    public Guid UserID { get; set; }
    public string Password { get; set; }
    

    // Optional: Additional constructor for your custom logic
    public User(Guid userID, string name, string password)
    {
        UserID = userID;
        Name = name;
        Password = password;
    }
}