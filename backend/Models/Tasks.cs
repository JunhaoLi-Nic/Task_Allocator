using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Tasks
    {
        public Guid TaskID { get; set; }

        public int RoomID { get; set; }

        public string Description { get; set; }

        public bool IsPrivate { get; set; }
        public string Status { get; set; } = ""; // Default value
        public string AssignedTo { get; set; } = "Unassigned"; // Default value
 
        public Tasks(Guid taskID, int roomID, string description, bool isPrivate, string status, string assignedTo)
        {
            TaskID = taskID;
            RoomID = roomID;
            Description = description;
            IsPrivate = isPrivate;
            Status = status;
            AssignedTo = assignedTo;
        }
        
        public Tasks(Guid taskID, string description, int roomID)
        {
            TaskID = taskID;
            Description = description;
            RoomID = roomID;
        }
    }
}