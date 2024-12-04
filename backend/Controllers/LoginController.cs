using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]

public class LoginController : ControllerBase
{
    private readonly AppDbContext _context; //prywatna zmienna

    public LoginController(AppDbContext context){
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // Znajdź użytkownika w bazie danych
        var user = await _context.Users!.FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid username or password ", user?.Username, user?.PasswordHash });

        }

        return Ok(new { message = "Login successful!" });
    }


}

public class LoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
