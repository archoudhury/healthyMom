using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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

        private string GetClaimByName(string name)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            return identity.Claims.FirstOrDefault(x => x.Type == name).Value;
        }

        [HttpGet]
        [Route("GetAppointment")]
        public IActionResult GetAppointment()
        {
            var id = GetClaimByName("userId");
            var motherId = context.Mother.Where(a => a.UserId.ToString() == id).FirstOrDefault().Id;
            var motherAppointments = context.Appointment.Where(a => a.MotherId == motherId).ToList();
            return Ok(motherAppointments);
        }


        [HttpGet("{id}", Name = "GetMotherById")]
        [HttpHead]
        public IActionResult GetMotherById(int id)
        {
            var m = context.Mother
                            .Join(context.User,
                                m => m.UserId,
                                u => u.Id,
                                (m, u) => new { Mother = m, User = u }
                            ).FirstOrDefault(x => x.User.Id == x.Mother.UserId && x.Mother.UserId == id);

            if (m == null)
            {
                return Ok(context.Mother.Where(a => a.Id == id).FirstOrDefault());
            }
            return Ok(m.Mother);
        }

        [Route("SearchWithAadhar")]
        [HttpGet]
        public IActionResult SearchWithAadhar(string aadhar)
        {
            var m = context.Mother
                            .Join(context.User,
                                m => m.UserId,
                                u => u.Id,
                                (m, u) => new { Mother = m, User = u }
                            ).FirstOrDefault(x => x.User.Id == x.Mother.UserId);
            return Ok(m.Mother);
        }
    }
}