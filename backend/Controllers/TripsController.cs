using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TripsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TripsController(AppDbContext context)
    {
        _context = context;
    }

    // Endpoint: GET /api/trips
    [HttpGet]
    public IActionResult GetTrips()
    {
        var trips = _context.Trips?
            .Include(t => t.User) // Ładowanie danych użytkownika
            .ToList();

        return Ok(trips);
    }

    [HttpGet("{id}")]
    public IActionResult GetTripWithUser(int id)
    {
        var trip = _context.Trips?.Include(t => t.User).FirstOrDefault(t => t.Id == id);
        if (trip == null)
        {
            return NotFound();
        }

        return Ok(new
        {
            Destination = trip.Destination,
            StartDate = trip.StartDate,
            EndDate = trip.EndDate,
            Budget = trip.Budget,
            User = new
            {
                trip.User?.Username,
                trip.User?.Email
            }
        });
    }


    [HttpGet("user/{userId}")]
    public IActionResult GetTripsByUserId(int userId)
    {
        // Pobieramy wycieczki dla danego użytkownika
        var trips = _context.Trips?
            .Where(t => t.UserId == userId) // Filtrujemy po UserId
            .Include(t => t.User) // Ładujemy dane użytkownika
            .ToList();

        // Sprawdzamy, czy znaleziono jakieś wycieczki
        if (trips == null || trips.Count == 0)
        {
            return NotFound(new { message = $"Brak wycieczek dla użytkownika o id {userId}." });
        }

        return Ok(trips); // Zwracamy listę wycieczek
    }



    // Endpoint: POST /api/trips
    [HttpPost]
    public IActionResult CreateTrip([FromBody] Trip newTrip)
    {
        // Walidacja danych wejściowych
        if (string.IsNullOrWhiteSpace(newTrip.Destination) || 
            newTrip.StartDate == default || 
            newTrip.EndDate == default || 
            newTrip.UserId <= 0)
        {
            return BadRequest(new { message = "Nieprawidłowe dane wejściowe." });
        }

        // Sprawdzenie logiki: StartDate < EndDate
        if (newTrip.StartDate >= newTrip.EndDate)
        {
            return BadRequest(new { message = "Data rozpoczęcia musi być wcześniejsza niż data zakończenia." });
        }

        // Sprawdzenie, czy użytkownik istnieje
        var user = _context.Users?.Find(newTrip.UserId);
        if (user == null)
        {
            return NotFound(new { message = $"Użytkownik o id {newTrip.UserId} nie istnieje." });
        }

        // Dodanie wycieczki do bazy danych
        _context.Trips?.Add(newTrip);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetTrips), new { id = newTrip.Id }, newTrip);
    }

}
