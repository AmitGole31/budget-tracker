using Microsoft.EntityFrameworkCore;
using BudgetAPI.Data; // Make sure this matches your actual namespace

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS - FIXED: Use correct method name
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add Entity Framework with SQLite - FIXED: Connection string
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=budget.db"));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// FIXED: UseCors should come BEFORE UseAuthorization and UseHttpsRedirection
app.UseCors("AllowAngular");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Create and seed database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        context.Database.EnsureCreated(); // This will create DB and tables
        Console.WriteLine("Database created successfully!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"An error occurred creating the database: {ex.Message}");
    }
}

app.Run();
