using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ChecklistApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Checklists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreatedAt = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Checklists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TeamMembers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamMembers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChecklistItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    ChecklistId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChecklistItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChecklistItems_Checklists_ChecklistId",
                        column: x => x.ChecklistId,
                        principalTable: "Checklists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Checklists",
                columns: new[] { "Id", "CreatedAt", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "2024-04-01 11:00:00+13:00", "Checklist tracking what needs to be done first thing in the kitchen.", "Start of day - kitchen" },
                    { 2, "2024-04-01 11:40:00+13:00", "Closing process for end of day.", "End of day - kitchen" },
                    { 3, "2024-06-11 08:00:00+12:00", "Lists of tasks to be completed around midday, these can be done by anyone.", "Midday check in" }
                });

            migrationBuilder.InsertData(
                table: "TeamMembers",
                columns: new[] { "Id", "Email", "FirstName", "LastName" },
                values: new object[,]
                {
                    { 1, "ava@example.com", "Ava", "Cado" },
                    { 2, "cara@example.com", "Cara", "Mello" },
                    { 3, "pete@example.com", "Pete", "Zah" }
                });

            migrationBuilder.InsertData(
                table: "ChecklistItems",
                columns: new[] { "Id", "ChecklistId", "Description", "Title" },
                values: new object[,]
                {
                    { 1, 1, "Get the bins ready for use during the day, they'll be on the street after being emptied.", "Bring in bins" },
                    { 2, 1, "Check all fridge temps and record them in the checklist.", "Check fridge temps" },
                    { 3, 1, "Get the fryer warmed up.", "Turn on fryer" },
                    { 4, 1, "Get the coffee machine warmed up.", "Turn on coffee machine" },
                    { 5, 2, "Make sure the coffee machine is clean and turned off overnight.", "Turn off coffee machine and clean" },
                    { 6, 2, "Make sure the fryer is clean and turned off overnight.", "Turn off fryer and clean" },
                    { 7, 2, "Check all fridge temps and record them in the checklist.", "Check fridge temps" },
                    { 8, 2, "Last thing before you leave, put the bins out on the street.", "Put bins out" },
                    { 9, 3, "Check all fridge temps and record them in the checklist.", "Check fridge temps" },
                    { 10, 3, "Update the FOH team on today's specials so they can get them on the chalkboard.", "Let FOH know the specials" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChecklistItems_ChecklistId",
                table: "ChecklistItems",
                column: "ChecklistId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChecklistItems");

            migrationBuilder.DropTable(
                name: "TeamMembers");

            migrationBuilder.DropTable(
                name: "Checklists");
        }
    }
}
