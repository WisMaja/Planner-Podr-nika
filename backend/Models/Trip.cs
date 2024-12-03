public class Trip{
    public int id {get; set;} //P Key
    public string Destination {get; set;} = string.Empty;
    public DateTime StartDate {get; set;}
    public DateTime EndDate {get; set;}
    public decimal Budget {get; set;}
    public int UserId {get; set;}
    public required User User {get; set;}
}