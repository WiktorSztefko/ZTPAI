import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../api/fetchUser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWineGlass, faWhiskeyGlass, faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';

import "bulma/css/bulma.min.css";
import "../styles/NotFound.css";


import Header from "./Header";

import Footer from "./Footer";

const Dashboard = () => {



    return (
        <>
            <Header />
            <main class="section has-text-centered is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                <h1 class="title is-1 has-text-weight-bold">Code 404</h1>
                <h2 class="subtitle is-3 mt-3">Przepraszamy, ale taka strona nie istnieje.</h2>
                <div class="icons mt-3">
                    <FontAwesomeIcon icon={faWineGlass} />
                    <FontAwesomeIcon icon={faWhiskeyGlass} />
                    <FontAwesomeIcon icon={faMartiniGlassCitrus} />
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Dashboard;
