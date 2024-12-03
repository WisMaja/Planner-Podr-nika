import React, {useEffect} from "react";
import axios from "axios";
import App from "../App";

function GetUserTripsList(){
    const [userId, setUserId] = React.useState(1); // Pobieramy userId z parametrów URL
    const [trips, setTrips] = React.useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5170/api/trips/user/${userId}`)
            .then(response => {
                console.log(response.data)
                setTrips(response.data);
            })
            .catch(error => {
                console.error('Błąd wyświetlania danych:', error);
            });
    }, [userId]);

    return (
        <div>
            <h1>Lista wycieczek:</h1>
            <ul>
                {trips.length > 0 ? (
                    trips.map((trip) => (
                        <li key={trip.id}>
                            {trip.destination}
                            <br/>
                            Daty wyjazdu: {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                            <br/>
                            Koszt wyjazdu: {trip.budget} zł
                        </li>
                    ))
                ) : (
                    <p>Brak dostępnych wycieczek.</p>
                )}
            </ul>
        </div>

    )
}

export default GetUserTripsList;