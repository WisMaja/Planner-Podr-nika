using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

[ApiController]
[Route("api/[controller]")]
public class RegisterController : ControllerBase
{
    private readonly AppDbContext _context; //prywatna zmienna

    public RegisterController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
    // Sprawdź, czy użytkownik o podanej nazwie już istnieje
    var existingUser = await _context.Users!.FirstOrDefaultAsync(u => u.Username == request.Username);
    if (existingUser != null)
    {
        return BadRequest(new { message = "Username already exists" });
    }

    // Hashowanie hasła
    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

    // Stwórz nowego użytkownika
    var user = new User
    {
        Username = request.Username,
        Email = request.Email,
        PasswordHash = hashedPassword
    };

    // Zapisz użytkownika w bazie danych
    _context.Users!.Add(user);
    await _context.SaveChangesAsync();

    return Ok(new { message = "User registered successfully!" });
    }

    // Klasa RegisterRequest
    public class RegisterRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Email {get; set;} = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

}