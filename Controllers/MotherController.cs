using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthyMom.Models.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace HealthyMom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MotherController : ControllerBase
    {
        private MotherContext context;
        private IConfiguration configuration;
        public MotherController(MotherContext _context, IConfiguration _configuration)
        {
            context = _context;
            configuration = _configuration;
        }

        
    }
}