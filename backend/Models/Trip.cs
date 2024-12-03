public class Trip{
    public int Id {get; set;} //P Key
    public string Destination {get; set;} = string.Empty;
    public DateTime StartDate {get; set;}
    public DateTime EndDate {get; set;}
    public decimal Budget {get; set;}
    public int UserId {get; set;}
    public User? User {get; set;}
}