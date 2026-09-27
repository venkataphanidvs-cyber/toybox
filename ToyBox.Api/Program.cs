using ToyBox.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("ToyBoxCorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("ToyBoxCorsPolicy");
app.UseHttpsRedirection();

var products = new List<Product>
{
    new()
    {
        Id = 1,
        Name = "Turbo Racing Car",
        Category = "Cars",
        Description = "Remote controlled • Ages 6+",
        Price = 5999,
        Rating = 4.7,
        Age = "6+"
    },
    new()
    {
        Id = 2,
        Name = "Dinosaur Explorer",
        Category = "Figures",
        Description = "Adventure set • Ages 5+",
        Price = 1499,
        Rating = 4.8,
        Age = "5+"
    },
    new()
    {
        Id = 3,
        Name = "Build Your Robot",
        Category = "STEM",
        Description = "STEM kit • Ages 8+",
        Price = 2299,
        Rating = 4.9,
        Age = "8+"
    },
    new()
    {
        Id = 4,
        Name = "World Explorer Puzzle",
        Category = "Puzzles",
        Description = "500 pieces • Ages 8+",
        Price = 699,
        Rating = 4.6,
        Age = "8+"
    }
};

app.MapGet("/api/products", () => products)
    .WithName("GetProducts");

app.Run();
