import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import GetUsersList from './components/GetUserList';
import GetAllTripsList from './components/GetAllTripsList';
import GetUserTripsList from './components/GetUsersTripList';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/users">List Of Users</Link></li>
                    <li><Link to="/trips">List Of Trips</Link></li>
                    <li><Link to="/trips/1">List Of Trips for User 1</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/users" element={<GetUsersList/>}/>
                <Route path="/trips" element={<GetAllTripsList/>}/>
                <Route path="/trips/:id" element={<GetUserTripsList/>}/>
            </Routes>
        </Router>
  );
}

export default App;
