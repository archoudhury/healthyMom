using System;
using System.Linq;
using System.Security.Claims;
using HealthyMom.Models;
using HealthyMom.Models.Context;
using HealthyMom.ViewModelsAndEnum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace HealthyMom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private MotherContext context;
        private IConfiguration configuration;
        public DoctorController(MotherContext _context, IConfiguration _configuration)
        {
            context = _context;
            configuration = _configuration;
        }
        private string GetClaimByName(string name)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            return identity.Claims.FirstOrDefault(x => x.Type == name).Value;
        }

        [HttpPost]
        [Route("RegisterMother")]
        public IActionResult RegisterMother(MotherRegistration model)
        {
            var mother = new Mother
            {
                Name = model.MotherName,
                HusbandName = model.HusbandName,
                FertilityDate = model.FertilityDate,
                ExpectedDeliveryDate = model.ExpectedDeliveryDate,
                IsHivInfected = model.IsHivInfected,
                OtherComplications = model.OtherComplications,
                NumberOfBabies = model.NumberOfBabies,
                NumberOfPregnency = model.NumberOfPregnency,
                Anganwadi = model.AnganwadiId,
                Address = model.Address,
                Zip = model.Zip,
                CreatedBy = long.Parse(GetClaimByName("userId")),
                CreatedDate = DateTime.Now
            };

            var user = new User
            {
                Username = model.Username,
                Password = model.Password,
                Aadhar = model.Aadhar,
                Mobile = model.Mobile,
                Email = model.Email,
                UserType = (short)UserType.Mother,
                CreatedBy = long.Parse(GetClaimByName("userId")),
                CreatedDate = DateTime.Now
            };
            context.Mother.Add(mother);
            context.User.Add(user);
            context.SaveChanges();
            return Ok("Created");
        }


    }
}