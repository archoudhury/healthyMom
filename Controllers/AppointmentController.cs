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

    public class OPTClass{
        public int otp { get; set; }
        public int id { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private MotherContext context;
        private IConfiguration configuration;
        public AppointmentController(MotherContext _context, IConfiguration _configuration)
        {
            context = _context;
            configuration = _configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {

            return Ok(context.Appointment.Where(u => u.Type == short.Parse(GetClaimByName("userType"))).ToList());
        }
        [HttpGet]
        [Route("Today")]
        public IActionResult Today()
        {
            return Ok(
                context.Appointment.Where(u =>
                u.Type == short.Parse(GetClaimByName("userType")) &&
                u.Date.Date == DateTime.Now.Date).ToList()
            );
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(long id)
        {
            return Ok(context.Appointment.FirstOrDefault(x => x.Id == id));
        }

        [HttpPost]
        [Route("GenerateOtp/{id}")]
        public IActionResult GenerateOtp(long id)
        {
            var appointment = context.Appointment.FirstOrDefault(x => x.Id == id);
            var otp = new Random().Next(1000, 9999);
            appointment.Otp = otp;
            appointment.OtpExpiry = DateTime.Now.AddMinutes(3);
            context.SaveChanges();
            return Ok(otp.ToString());
        }

        [HttpPost]
        [Route("ValidateOtp")]
        public IActionResult ValidateOtp([FromBody]OPTClass otp)
        {
            var appointment = context.Appointment.FirstOrDefault(x => x.Id == otp.id && x.Otp == otp.otp);
            if (appointment == null)
            {
                return BadRequest("Invalid OTP");
            }
            if (appointment.OtpExpiry < DateTime.Now)
            {
                return BadRequest("OTP Expired");
            }

            appointment.Otp = 0;
            appointment.IsOtpVerified = true;
            appointment.IsCompleted = true;
            context.SaveChanges();
            return Ok();
        }

        private string GetClaimByName(string name)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            return identity.Claims.FirstOrDefault(x => x.Type == name).Value;
        }
    }
}