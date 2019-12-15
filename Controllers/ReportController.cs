using System;
using System.Data;
using System.Linq;
using HealthyMom.Models.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace HealthyMom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private MotherContext context;
        private IConfiguration configuration;
        public ReportController(MotherContext _context, IConfiguration _configuration)
        {
            context = _context;
            configuration = _configuration;
        }
        [HttpGet]
        [Route("")]
        public IActionResult DownloadReport(DateTime startDate)
        {
            using (var command = context.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = "Report";
                command.CommandType = CommandType.StoredProcedure;
                context.Database.OpenConnection();
                using (SqlDataAdapter adapter = new SqlDataAdapter(command.CommandText, context.Database.GetDbConnection().ConnectionString))
                {
                    var ds = new DataSet();
                    adapter.Fill(ds);
                    var dt = ds.Tables[0];
                    var res = JsonConvert.SerializeObject(dt);
                    return Ok(res);
                }

            }
        }
    }
}