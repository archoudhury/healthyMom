using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMom.Migrations
{
    public partial class DoctorAddedwithuserid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Doctor",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Doctor");
        }
    }
}
