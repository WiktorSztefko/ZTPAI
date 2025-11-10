import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { fetchUser } from "../api/fetchUser";
import { validateForm } from "../utils/validateForm";

import "bulma/css/bulma.min.css";
import "../styles/App.css";
import "../styles/Login-Register.css";

import SuccessModal from "./SuccessModal";

const Register = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const [errorName, setErrorName] = useState("");
    const [errorSurname, setErrorSurname] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmedPassword, setErrorCorfirmedPassword] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);

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

        const errors = validateForm({ name, surname, username, email, password, confirmedPassword });

        setErrorName(errors.name);
        setErrorSurname(errors.surname);
        setErrorUsername(errors.username);
        setErrorEmail(errors.email);
        setErrorPassword(errors.password);
        setErrorCorfirmedPassword(errors.confirmedPassword);

       const isValid = !errors.name && !errors.surname && !errors.username && !errors.email && !errors.password && !errors.confirmedPassword;

        if (!isValid) return;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, email, password })
            });

            const result = await response.json();

            if (!response.ok) {
                setErrorUsername(result.errors?.username || "");
                setErrorEmail(result.errors?.email || "");
                return;
            }

            setShowSuccess(true);

        } catch (err) {
            console.error(err);
        }
    };


    return (
            <main  className="columns is-gapless">
                {showSuccess && <SuccessModal />}

                <section id="panel-img" className="column">
                    <img src="/images/photos/register.jpeg" alt="login" className="images-fit" />
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

                        <div className="">
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Imie"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <span className="icon is-small is-left has-text-warning">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </div>
                        </div>

                        <p className="has-text-danger error mt-1 mb-1" style={{ visibility: errorName ? "visible" : "hidden" }}>
                            {errorName}
                        </p>

                        <div className="">
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Nazwisko"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    required
                                />
                                <span className="icon is-small is-left has-text-warning">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </div>
                        </div>

                        <p className="has-text-danger error mt-1 mb-1" style={{ visibility: errorSurname ? "visible" : "hidden" }}>
                            {errorSurname}
                        </p>

                        <div className="">
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Nazwa użytkownika"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <span className="icon is-small is-left has-text-warning">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </div>
                        </div>

                        <p className="has-text-danger error mt-1 mb-1" style={{ visibility: errorUsername ? "visible" : "hidden" }}>
                            {errorUsername}
                        </p>

                        <div className="">
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

                        <p className="has-text-danger error mt-1 mb-1" style={{ visibility: errorEmail ? "visible" : "hidden" }}>
                            {errorEmail}
                        </p>

                        <div className="">
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
                    
                        <p className="has-text-danger error mt-1 mb-1" style={{ visibility: errorPassword ? "visible" : "hidden" }}>
                            {errorPassword}
                        </p>

                        <div className="">
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Ponów hasło"
                                    value={confirmedPassword}
                                    onChange={(e) => setConfirmedPassword(e.target.value)}
                                    required
                                />
                                <span className="icon is-small is-left has-text-warning">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                        </div>

                        <p className="has-text-danger error mt-1 mb-1" style={{ visibility: errorConfirmedPassword ? "visible" : "hidden" }}>
                            {errorConfirmedPassword}
                        </p>
                
                        <div id="button-div">
                            <button type="submit" className="button is-warning mt-1">
                                <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />Zarejestruj się
                            </button>

                            <p className="mt-4 has-text-white">
                                Masz już konto? <a href="/login" className="has-text-warning">zaloguj się</a>
                            </p>
                        </div>

                    </form>
                </section>
            </main>
    );
};

export default Register;
