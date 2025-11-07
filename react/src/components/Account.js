import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../api/fetchUser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import "bulma/css/bulma.min.css";
import "../styles/Account.css";

import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Account = () => {
    const [user, setUser] = useState(null);
    const [isAdministrator, setIsAdministrator] = useState(false);
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
            
                if (Array.isArray(result.data.roles) && result.data.roles.includes("administrator")) {
                    setIsAdministrator(true);
                }
            }
        };

        getUser();
        console.log(user.roles)
    
    }, [navigate]);

    if (!user) return <p></p>;

    return (
        <>
            <Header />
            <div className="columns is-gapless">
                <div className="column is-2">
                    <Navigation isAdministrator={isAdministrator} />
                </div>
                <main className="column">

                    <div class="is-flex mt-2 mb-2">
                        <div class="field-header">Imię:</div>
                        <div class="field-content">{user.name}</div>
                    </div>

                    <div class="is-flex mt-2 mb-2">
                        <div class="field-header">Nazwisko:</div>
                        <div class="field-content">{user.surname}</div>
                    </div>

                    <div class="is-flex mt-2 mb-2">
                        <div class="field-header">Nazwa Użytkownika:</div>
                        <div class="field-content">{user.username}</div>
                    </div>

                    <div class="is-flex mt-2 mb-2">
                        <div class="field-header">Adres mailowy:</div>
                        <div class="field-content">{user.email}</div>
                    </div>

                    <div class="is-flex mt-2 mb-2">
                        <div className="field-header">Typ konta:</div>
                        <div className="field-content">
                            {Array.isArray(user.roles) && user.roles.length > 0
                                ? user.roles.join(", ")
                                : ""}
                        </div>
                    </div>

                    <div class="is-flex  mt-2 mb-2 field-header button-div">
                        <button id="button-logout" className="button is-warning">
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
