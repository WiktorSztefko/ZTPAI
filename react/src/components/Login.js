import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { fetchUser } from "../api/fetchUser";
import { API_URL } from "../api/url";

import "bulma/css/bulma.min.css";
import "../styles/App.css";
import "../styles/Login-Register.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); 

     useEffect(() => {
            const getUser = async () => {
                const result = await fetchUser();
    
                if (result.data) {
                    navigate("/dashboard");
                    return;
                }
            };
    
            getUser();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${API_URL}/api/login`, {
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

            navigate("/dashboard");

        } catch (err) {
            setError("Connection error");
        }
    };

    return (
            <main id="login-page" className="columns is-gapless">

                <section id="panel-img" className="column">
                    <img src="/images/photos/login.jpeg" alt="login" className="images-fit"/>
                </section>

                <section
                    id="panel-form"
                    className="column is-flex is-justify-content-center is-align-items-center">
                    
                    <form onSubmit={handleSubmit} className="box black">
                        <header className="has-text-centered mb-4">
                            <a href="/login">
                                <img id="logo" src="/images/photos/logo.jpeg" alt="logo" />
                            </a>
                            <h1 className="has-text-white">Cocktail King</h1>
                        </header>

                        <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Adres email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                             
                                />
                                <span className="icon is-small is-left has-text-warning">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                            </div>
                    
                        <div className="mt-5">
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Hasło"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                   
                                />
                                <span className="icon is-small is-left has-text-warning">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                        </div>

                        <p className="has-text-danger error mt-1" style={{ visibility: error ? "visible" : "hidden" }}>
                            {error}
                        </p>

                        <div id="button-div">
                            <button type="submit" className="button is-warning mt-1">
                                <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />Zaloguj się
                            </button>

                            <p className="mt-4 has-text-white">
                                Nie masz konta? <a href="/register" className="has-text-warning">zarejestruj się</a>
                            </p>
                        </div>
                        
                    </form>
                </section>
            </main>
    );
};

export default Login;
