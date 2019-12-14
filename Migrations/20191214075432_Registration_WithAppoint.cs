using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMom.Migrations
{
    public partial class Registration_WithAppoint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApproverInput",
                table: "Appointment",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "Appointment",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SampleAppointmentData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Type = table.Column<short>(nullable: false),
                    Details = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SampleAppointmentData", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SampleAppointmentData");

            migrationBuilder.DropColumn(
                name: "ApproverInput",
                table: "Appointment");

            migrationBuilder.DropColumn(
                name: "Details",
                table: "Appointment");
        }
    }
}
