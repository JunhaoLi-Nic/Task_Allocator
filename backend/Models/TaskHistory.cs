using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class TaskHistory
    {
        public Guid TaskHistoryID { get; set; }
        public Guid TaskID { get; set; }

        public Guid UserID { get; set; }
        public DateTime Timestamp { get; set; }

        public string Status { get; set; }

        public TaskHistory(Guid taskHistoryID, Guid taskID, Guid userID, DateTime timestamp, string status)
        {
            TaskHistoryID = taskHistoryID;
            TaskID = taskID;
            UserID = userID;
            Timestamp = timestamp;
            Status = status;
        }
    }
}