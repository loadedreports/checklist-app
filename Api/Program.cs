using System.Reflection;
using ChecklistApi.Data;
using ChecklistApi.Repositories;
using ChecklistApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFile));
});

builder.Services.AddScoped<IChecklistRepository, ChecklistRepository>();
builder.Services.AddScoped<IChecklistService, ChecklistService>();

builder.Services.AddScoped<ITeamRepository, TeamRepository>();
builder.Services.AddScoped<ITeamService, TeamService>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite("Data Source=checklist.db")
);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseFileServer();
app.UseCors(options =>
    options
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
);
app.UseAuthorization();
app.MapControllers();

app.UseSpa(spa => { });

app.Run();
