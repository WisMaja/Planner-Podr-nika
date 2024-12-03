using Microsoft.AspNetCore.Mvc;

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
        var trips = _context.Trips?.ToList();
        return Ok(trips);
    }

    // Endpoint: POST /api/trips
    [HttpPost]
    public IActionResult CreateTrip(Trip newTrip)
    {
        if (_context.Trips == null)
            return Problem("Tabela podróży nie istnieje.");

        _context.Trips.Add(newTrip);
        _context.SaveChanges();
        return Ok(newTrip);
    }
}
