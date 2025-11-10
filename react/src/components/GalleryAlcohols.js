import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../api/fetchUser";

import "bulma/css/bulma.min.css";
import "../styles/App.css";
import "../styles/Gallery.css";

import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

const GalleryAlcohols = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [alcohols, setAlcohols] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getUser = async () => {
            const result = await fetchUser();

            if (result.error === "unauthorized") {
                navigate("/login");
                return;
            }

            if (result.data) {
                setUser(result.data);
                fetchAlcohols();
            }
        };

        const fetchAlcohols = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8000/api/alcohols");

                if (response.ok) {
                    const data = await response.json();

                    if (data) {
                        setAlcohols(data);
                    }
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        };

        getUser();

    }, [navigate]);

    if (!user) return <p></p>;

    if (loading) {
        return (
            <>
                <Header />
                <div className="columns is-gapless">
                    <div className="column is-2">
                        <Navigation />
                    </div>
                    <main id="gallery" className="column has-text-centered">
                        <div className="has-text-centered mt-6">
                            <ClipLoader size={80} color="#005028" />
                            <p>Ładowanie Alkoholi ...</p>
                        </div>
                    </main>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="columns is-gapless">
                <div className="column is-2">
                    <Navigation />
                </div>

                <main id="gallery" className="column">
            
                        <div className="columns is-multiline is-centered">
                            {alcohols.map((alcohol) => (
                                <div key={alcohol.id_alcohol} className="column is-one-quarter m-3">
                
                                    <figure className="card flex-column has-text-centered">
                                        <div className="image-wrapper">
                                            <img
                                                src={`/images/alcohols/${alcohol.image}`}
                                                alt={alcohol.name}
                                                className="item-image"
                                            />
                                        </div>
                                        <figcaption className="alcohol-caption">
                                            {alcohol.name}
                                        </figcaption>
                                    </figure>

                                </div>
                            ))}
                        </div>
               
                </main>
            </div>
            <Footer />
        </>
    );
};

export default GalleryAlcohols;
