import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { fetchUser } from "../api/fetchUser";
import { API_URL } from "../api/url";

import "bulma/css/bulma.min.css";
import "../styles/App.css";
import "../styles/Account.css";

import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Account = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const result = await fetchUser();

            if (result.error === "unauthorized") {
                navigate("/login");
                return;
            }

            if (result.data) {
                setUser(result.data);
            }
        };

        getUser();

    }, [navigate]);

    const logoutUser = async () => {
        try {
            const response = await fetch(`${API_URL}/api/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (response.ok)
                navigate("/login");

        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (!user) return <p></p>;

    return (
        <>
            <Header />
            <div className="columns is-gapless">
                <div className="column is-2">
                    <Navigation />
                </div>
                <main className="column panel-account">

                    <div class="is-flex mb-2 mobile-mt-2">
                        <span class="field-header">Imię:</span>
                        <span class="field-content">{user.name}</span>
                    </div>

                    <div class="is-flex mt-2 mb-2">
                        <span class="field-header">Nazwisko:</span>
                        <span class="field-content">{user.surname}</span>
                    </div>

                    <div class="is-flex mt-2 mb-2">
                        <span class="field-header">Nazwa Użytkownika:</span>
                        <span class="field-content">{user.username}</span>
                    </div>

                    <div class="is-flex mt-2 mb-2">
                        <span class="field-header">Adres mailowy:</span>
                        <span class="field-content">{user.email}</span>
                    </div>

                    <div class="is-flex mt-2 mb-2">
                        <span className="field-header">Typ konta:</span>
                        <span className="field-content">
                            {Array.isArray(user.roles) && user.roles.length > 0
                                ? user.roles.join(", ")
                                : ""}
                        </span>
                    </div>

                    <div class="is-flex mt-2 mb-2 button-div">
                        <button id="button-logout" className="button is-warning" onClick={logoutUser}>
                            <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />Wyloguj
                        </button>
                    </div>

                </main>
            </div>
            <Footer />
        </>
    );
};

export default Account;
