using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HealthyMom.Models;
using HealthyMom.ViewModelsAndEnum;
using HealthyMom.Models.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace HealthyMom.Controllers
{
    public class UserLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private MotherContext context;
        private IConfiguration configuration;
        public AuthController(MotherContext _context, IConfiguration _configuration)
        {
            context = _context;
            configuration = _configuration;
        }

        public IActionResult CheckToken()
        {
            var userInfoUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
            
            return Ok();
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody]UserLogin userForLoginDto)
        {
            try
            {
                var user = context.User.FirstOrDefault(x => x.Username == userForLoginDto.Username && userForLoginDto.Password == x.Password);
                if (user != null)
                {

                    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                    var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub,user.Username),
                    new Claim(JwtRegisteredClaimNames.Email,user.Email),
                    new Claim("userId",user.Id.ToString()),
                    new Claim("userType",((UserType)user.UserType).ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                };
                    var token = new JwtSecurityToken(
                       issuer: configuration["Jwt:Issuer"],
                       audience: configuration["Jwt:Issuer"],
                       claims: claims, expires: DateTime.Now.AddHours(1),
                       signingCredentials: credentials
                        );

                    var UserDetail = new UserDetail()
                    {
                        Id = user.Id,
                        UserName = user.Username,
                        Role = user.UserType,
                        Token = new JwtSecurityTokenHandler().WriteToken(token)
                    };
                    return Ok(UserDetail);
                }
                return BadRequest("Invalid Crentials");
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}