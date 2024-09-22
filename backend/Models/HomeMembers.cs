using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class HomeMembers
    {
        public Guid GroupID { get; set; }

        public Guid UserID { get; set; }

        public HomeMembers(Guid groupID, Guid userID)
        {
            GroupID = groupID;
            UserID = userID;
        }
    }
}