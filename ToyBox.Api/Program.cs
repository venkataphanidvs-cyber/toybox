using ToyBox.Api.Models;
using ToyBox.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("ToyBoxDb");
builder.Services.AddDbContext<ToyBoxDbContext>(options =>
    options.UseNpgsql(connectionString));

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

app.MapGet("/api/products", async (ToyBoxDbContext db) => await db.Products.ToListAsync())
    .WithName("GetProducts");

app.Run();
