import React, {useEffect} from "react";
import axios from "axios";

// function GetAllTripsList(){
//     const [trips, setTrips] = React.useState([]);
//
//     useEffect(() => {
//         axios.get('http://localhost:5170/api/trips')
//             .then(response => {
//                 console.log(response.data);
//                 setTrips(response.data);
//             })
//             .catch(error => {
//                 console.error('Błąd wyświetlania danych:', error);
//             });
//     }, []);
//
//     return (
//         <div>
//             <h1>Lista wycieczek:</h1>
//             <ul>
//                 {trips.length > 0 ? (
//                     trips.map((trip) => (
//                         <li key={trip.id}>
//                             {trip.destination}
//                             <br/>
//                             Daty wyjazdu: {new Date(trip.StartDate).toLocaleDateString()} - {new Date(trip.EndDate).toLocaleDateString()}
//                             <br/>
//                             Koszt wyjazdu: {trip.budget} zł
//                         </li>
//                     ))
//                 ) : (
//                     <p>Brak dostępnych wycieczek.</p>
//                 )}
//             </ul>
//         </div>
//
//     )
// }

export default GetAllTripsList;