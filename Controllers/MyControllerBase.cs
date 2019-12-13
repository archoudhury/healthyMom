using System;
using System.Linq;
using System.Security.Claims;
using HealthyMom.Models;
using HealthyMom.ViewModelsAndEnum;
using Microsoft.AspNetCore.Mvc;

namespace HealthyMom.Controllers
{
    public class MyControllerBase : ControllerBase
    {
        public CurrentUser CurrentUser;
        public MyControllerBase()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userType = identity.Claims.FirstOrDefault(x => x.Type == "userType").Value;
            Enum.TryParse(userType, out UserType us);
            CurrentUser = new CurrentUser
            {
                Id = int.Parse(identity.Claims.FirstOrDefault(x => x.Type == "userId").Value),
                Email = identity.Claims.FirstOrDefault(x => x.Type == "email").Value,
                Username = identity.Claims.FirstOrDefault(x => x.Type == "sub").Value,
                UserType = us
            };
        }
    }
}