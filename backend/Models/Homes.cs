using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using backend.Controllers;

namespace backend.Models
{
    public class Homes
    {
        public Guid GroupID { get; set; }
        
        public string GroupName { get; set; }

        public Guid CreatorID {get; set;}  

        public Homes(Guid groupID, string groupName, Guid creatorID)
        {
            GroupID = groupID;
            GroupName = groupName;
            CreatorID = creatorID;
        }
    }
}