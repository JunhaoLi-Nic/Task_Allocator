using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Tasks
    {
        public Guid TaskID { get; set; }
        public Guid? RoomID { get; set; }  // Changed to nullable Guid
        public string? Description { get; set; }  // Made nullable
        public bool IsPrivate { get; set; }
        public string Status { get; set; } = ""; // Default value
        public string AssignedTo { get; set; } = "Unassigned"; // Default value
 
        public Tasks(Guid taskID, Guid? roomID, string? description, bool isPrivate, string? status = null, string? assignedTo = null)
        {
            TaskID = taskID;
            RoomID = roomID;
            Description = description ?? "";  // Use empty string if description is null
            IsPrivate = isPrivate;
            Status = status ?? "";
            AssignedTo = assignedTo ?? "Unassigned";
        }
        
        public Tasks(Guid taskID, string? description, Guid? roomID)
        {
            TaskID = taskID;
            Description = description ?? "";  // Use empty string if description is null
            RoomID = roomID;
            IsPrivate = false;  // Default value
            Status = "";  // Default value
            AssignedTo = "Unassigned";  // Default value
        }
    }
}