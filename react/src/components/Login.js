import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import "../styles/Login.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faRightToBracket } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            console.log("Zalogowano:", data);
        } catch (err) {
            setError("Błąd połączenia z serwerem");
        }
    };

    return (
        <div id="login-page" className="columns is-gapless">

            {/* Lewa kolumna z obrazkiem */}
            <div id="panel-img" className="column">
                <img src="/images/photos/login.jpeg" alt="login" className="images-fit"/>
            </div>

            {/* Prawa kolumna z formularzem */}
            <div
                id="panel-form"
                className="column is-flex is-justify-content-center is-align-items-center black">
                
                <form onSubmit={handleSubmit} className="box black">
                    <div className="has-text-centered mb-4">
                        <a href="/login">
                            <img id="logo" src="/images/photos/logo.jpeg" alt="logo" />
                        </a>
                        <h1 className="has-text-white">Cocktail King</h1>
                    </div>

                    <div className="field">
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="email"
                                placeholder="Adres email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <span className="icon is-small is-left has-text-warning">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="password"
                                placeholder="Hasło"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="icon is-small is-left has-text-warning">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                        </div>
                    </div>

                    <p className="has-text-danger error" style={{ visibility: error ? "visible" : "hidden" }}>
                        {error}
                    </p>


                    <div id="button-section">
                        <button type="submit" className="button is-warning mt-4">
                            <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />Zaloguj się
                        </button>

                        <p className="mt-4 has-text-white">
                            Nie masz konta? <a href="/register" className="has-text-warning">zarejestruj się</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
