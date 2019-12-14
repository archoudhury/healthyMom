using System;
using System.Collections.Generic;

namespace HealthyMom.Models
{
    public partial class UserDetail
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public short Role { get; set; }
    }
}