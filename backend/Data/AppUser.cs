namespace backend.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public Guid UserID { get; set; }
        public string Password { get; set; }
    }
}