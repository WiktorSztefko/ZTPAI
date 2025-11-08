import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../api/fetchUser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineGlass, faWhiskeyGlass, faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';

import "bulma/css/bulma.min.css";
import "../styles/App.css";
import "../styles/GalleryAlcohols.css";


import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

const GalleryAlcohols = () => {
    const [isAdministrator, setIsAdministrator] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            setIsAdministrator(true);
        };

        getUser();

    }, [navigate]);

    return (
        <>
            <Header />
            <div className="columns is-gapless">
                <div className="column is-2">
                    <Navigation isAdministrator={isAdministrator} />
                </div>
                <main className="column">

                </main>
            </div>
            <Footer />
        </>
    );
};

export default GalleryAlcohols;
