using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HealthyMom.Models.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace HealthyMom.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private MotherContext context;
        private IConfiguration configuration;
        public AuthController(MotherContext _context, IConfiguration _configuration)
        {
            context = _context;
            configuration = _configuration;
        }
        [Route("login")]
        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            var user = context.User.FirstOrDefault(x => x.Username == username && password==x.Password);
            if (user != null)
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub,user.Username),
                    new Claim(JwtRegisteredClaimNames.Email,user.Email),
                    new Claim("userId",user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                };
                var token = new JwtSecurityToken(
                   issuer: configuration["Jwt:Issuer"],
                   audience: configuration["Jwt:Issuer"],
                   claims: claims, expires: DateTime.Now.AddHours(1),
                   signingCredentials: credentials
                    );
                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            return BadRequest("Invalid Crentials");
        }
    }

    internal class ICOnfiguration
    {
    }
}