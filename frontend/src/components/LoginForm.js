import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LoginForm( {onLoginSuccess} ) {
    // Stan dla pól formularza
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Hook do nawigacji

    // Obsługa zmiany danych w polach
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    // Obsługa wysyłania formularza
    const handleSubmit = async (e) => {
        e.preventDefault(); // Zapobiega przeładowaniu strony
        try {
            const response = await axios.post("http://localhost:5170/api/login", {
                username: username,
                password: password,
            });

            // Jeśli żądanie się powiedzie
            console.log("Axios Response:", response.data);
            setError(null);

            // Przekierowanie do strony Home po udanym logowaniu
            navigate("/home");
            // setSuccessMessage(response.data.message); // Wyświetlenie wiadomości sukcesu
        } catch (err) {
            // Jeśli żądanie zakończy się błędem
            setError(err.response ? err.response.data.message : err.message); // Wyświetlenie błędu
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        cursor: "pointer",
                        width: "100%",
                    }}
                >
                    Log in
                </button>
            </form>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            {/*{successMessage && <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>}*/}
        </div>
    );
}

export default LoginForm;