import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { fetchUser } from "../api/fetchUser";
import { API_URL } from "../api/url";

import "bulma/css/bulma.min.css";
import "../styles/App.css";
import "../styles/Upload.css";

import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Upload= () => {
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

    if (!user) return <p></p>;

    return (
        <>
            <Header />
            <div className="columns is-gapless">
                <div className="column is-2">
                    <Navigation />
                </div>
                <main className="column panel-upload">


                </main>
            </div>
            <Footer />
        </>
    );
};
export default Upload;
