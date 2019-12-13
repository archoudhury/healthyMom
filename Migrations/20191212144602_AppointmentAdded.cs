using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMom.Migrations
{
    public partial class AppointmentAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Anganwadi",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 500, nullable: false),
                    Address = table.Column<string>(maxLength: 2000, nullable: false),
                    WorkerName = table.Column<string>(maxLength: 300, nullable: false),
                    WorkerId = table.Column<string>(maxLength: 20, nullable: true),
                    Zip = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedBy = table.Column<long>(nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Anganwadi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Appointment",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    Type = table.Column<short>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    IsCompleted = table.Column<bool>(nullable: false, defaultValue: false),
                    MotherId = table.Column<long>(nullable: false),
                    ApproverId = table.Column<long>(nullable: false),
                    Otp = table.Column<int>(nullable: false),
                    OtpExpiry = table.Column<DateTime>(nullable: false),
                    IsOtpVerified = table.Column<bool>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedBy = table.Column<long>(nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointment", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Mother",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 500, nullable: false),
                    HusbandName = table.Column<string>(maxLength: 500, nullable: false),
                    FertilityDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ExpectedDeliveryDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Age = table.Column<int>(nullable: false),
                    Address = table.Column<string>(maxLength: 4000, nullable: false),
                    Anganwadi = table.Column<long>(nullable: false),
                    NumberOfBabies = table.Column<short>(nullable: false),
                    NumberOfPregnency = table.Column<short>(nullable: false),
                    IsHivInfected = table.Column<bool>(nullable: false),
                    OtherComplications = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<long>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Updatedby = table.Column<long>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mother", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(maxLength: 100, nullable: false),
                    Password = table.Column<string>(nullable: false),
                    Mobile = table.Column<string>(maxLength: 20, nullable: false),
                    Email = table.Column<string>(maxLength: 200, nullable: true),
                    Aadhar = table.Column<string>(maxLength: 12, nullable: false),
                    UserType = table.Column<short>(nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedBy = table.Column<long>(nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    UpdatedBy = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Anganwadi");

            migrationBuilder.DropTable(
                name: "Appointment");

            migrationBuilder.DropTable(
                name: "Mother");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
