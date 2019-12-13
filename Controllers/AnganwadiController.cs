using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthyMom.Models;
using HealthyMom.Models.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace HealthyMom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnganwadiController : ControllerBase
    {
        private MotherContext context;
        private IConfiguration configuration;
        public AnganwadiController(MotherContext _context, IConfiguration _configuration)
        {
            context = _context;
            configuration = _configuration;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(context.Anganwadi.ToList());
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(long id)
        {
            return Ok(context.Anganwadi.FirstOrDefault(a => a.Id == id));
        }

        [HttpGet]
        [Route("GetByZip/{id}")]
        public IActionResult GetByZip(string zip)
        {
            return Ok(context.Anganwadi.Where(a => a.Zip == zip).ToList());
        }
    }
}