import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import GetUsersList from './components/GetUserList';
//import GetAllTripsList from './components/GetAllTripsList';
import GetUserTripsList from './components/GetUsersTripList';
import LoginForm from "./components/LoginForm";


function GetAllTripsList(){
    const [trips, setTrips] = React.useState([]);

    useEffect(() => {
        axios.get('http://localhost:5170/api/trips')
            .then(response => {
                console.log(response.data);
                setTrips(response.data);
            })
            .catch(error => {
                console.error('Błąd wyświetlania danych:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista wycieczek:</h1>
            <ul>
                {trips.length > 0 ? (
                    trips.map((trip) => (
                        <li key={trip.id}>
                            {trip.destination}
                            <br/>
                            Daty wyjazdu: {new Date(trip.StartDate).toLocaleDateString()} - {new Date(trip.EndDate).toLocaleDateString()}
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


function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/users">List Of Users</Link></li>
                    <li><Link to="/trips">List Of Trips</Link></li>
                    <li><Link to="/trips/1">List Of Trips for User 1</Link></li>
                    <li><Link to="/login">Log in</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/users" element={<GetUsersList/>}/>
                <Route path="/trips" element={<GetAllTripsList/>}/>
                <Route path="/trips/:id" element={<GetUserTripsList/>}/>
                <Route path="/login" element={<LoginForm/>}/>
            </Routes>
        </Router>
  );
}

export default App;
