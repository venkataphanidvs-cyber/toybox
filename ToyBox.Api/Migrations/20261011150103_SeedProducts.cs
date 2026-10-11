using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ToyBox.Api.Migrations
{
    /// <inheritdoc />
    public partial class SeedProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Age", "Category", "Description", "Name", "Price", "Rating" },
                values: new object[,]
                {
                    { 1, "6+", "Cars", "Remote controlled • Ages 6+", "Turbo Racing Car", 5999, 4.7000000000000002 },
                    { 2, "5+", "Figures", "Adventure set • Ages 5+", "Dinosaur Explorer", 1499, 4.7999999999999998 },
                    { 3, "8+", "STEM", "STEM kit • Ages 8+", "Build Your Robot", 2299, 4.9000000000000004 },
                    { 4, "8+", "Puzzles", "500 pieces • Ages 8+", "World Explorer Puzzle", 699, 4.5999999999999996 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
