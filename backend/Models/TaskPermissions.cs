using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
        public class TaskPermissions
    {
        public Guid TaskID { get; set; }
        public Guid UserID { get; set; }

        // Parameterless constructor for EF Core
        public TaskPermissions()
        {
        }

        // Constructor with parameters
        public TaskPermissions(Guid userId, Guid taskId)
        {
            UserID = userId;
            TaskID = taskId;
        }
    }

}