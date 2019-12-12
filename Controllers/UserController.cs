using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HealthyMom.Models.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace HealthyMom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private MotherContext context;
        private IConfiguration configuration;
        public UserController(MotherContext _context, IConfiguration _configuration)
        {
            context = _context;
            configuration = _configuration;
        }
        [HttpGet]
        public IActionResult Details()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userId = identity.Claims.FirstOrDefault(x => x.Type == "userId");
            var user = context.User.FirstOrDefault(x => x.Id == Convert.ToInt64(userId));
            return Ok(user);
        }

    }
}