import React, {useEffect} from "react";
import axios from "axios";
import Home from "./Home";

function GetUsersList(){
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

export default GetUsersList;