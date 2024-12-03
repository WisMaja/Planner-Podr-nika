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
    const [message, setMessage] = React.useState('');

    useEffect(() => {
        axios.get('http://localhost:5170/api/hello')
            .then(response =>  setMessage(response.data) )
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            <h1>Message from backend:</h1>
            <p>{message}</p>
        </div>
    );
}


function App() {
  return (
      <Router>
          <nav>
              <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/message">Backend Message</Link></li>
              </ul>
          </nav>

          <Routes>
          <Route path="/" element={<Home />} />
              <Route path="/message" element={<BackendMessage />} />
          </Routes>
      </Router>
  );
}

export default App;
