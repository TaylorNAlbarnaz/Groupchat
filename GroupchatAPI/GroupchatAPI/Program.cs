using GroupchatAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

string path = Directory.GetCurrentDirectory();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")
        .Replace("[DataDirectory]", path));
});
builder.Services.AddCors(options => options.AddPolicy(name: "GroupchatAPI",
    policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("GroupchatAPI");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
