using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthyMom.Migrations
{
    public partial class Registration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Mother",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "Zip",
                table: "Mother",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Anganwadi",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Mother");

            migrationBuilder.DropColumn(
                name: "Zip",
                table: "Mother");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Anganwadi");
        }
    }
}
