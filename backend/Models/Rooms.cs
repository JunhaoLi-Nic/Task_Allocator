using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Rooms
    {
        public Guid RoomID { get; set; }
        public string RoomName { get; set; }
        public Guid HomeID { get; set; }

        public Rooms(Guid roomID, string roomName, Guid homeID)
        {
            RoomID = roomID;
            RoomName = roomName;
            HomeID = homeID;
        }
    }
}