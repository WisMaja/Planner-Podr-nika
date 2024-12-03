//umożliwia korzystanie z Entity Framework Core (EF Core).
//bez tego AddDbContext i UseSqlServer nie byłyby dostępne.
using Microsoft.EntityFrameworkCore;

//worzy obiekt builder, który jest odpowiedzialny za konfigurację aplikacji.
var builder = WebApplication.CreateBuilder(args); //CreateBuilder inicjalizuje podstawowe usługi aplikacji, takie jak Dependency Injection, rejestrowanie i konfiguracja.


// Dodanie AppDbContext z connection string
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//Rejestruje kontrolery w kontenerze Dependency Injection.
//Bez tej linii aplikacja nie wiedziałaby, że ma obsługiwać kontrolery
builder.Services.AddControllers();

//Buduje obiekt app, który jest gotową do uruchomienia aplikacją.
var app = builder.Build();
//Połączenie wszystkich usług i konfiguracji staje się w tym momencie kompletne.

//Automatycznie mapuje kontrolery na odpowiadające im endpointy API.
app.MapControllers();

//Uruchamia aplikację i zaczyna nasłuchiwać na określonym porcie
app.Run();
