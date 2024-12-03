import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Przejdź by zobaczyć dane z backendu</p>
        </div>
    )
}

function BackendMessage(){
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        axios.get('http://localhost:5170/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching trips:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista użytkowników:</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul>

        </div>
    );
}


function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/users">List Of Users</Link></li>
                </ul>
            </nav>

          <Routes>
          <Route path="/" element={<Home />} />
              <Route path="/users" element={<BackendMessage />} />
          </Routes>
      </Router>
  );
}

export default App;
