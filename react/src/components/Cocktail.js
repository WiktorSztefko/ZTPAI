import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

import { fetchUser } from "../api/fetchUser";
import { API_URL } from "../api/url";

import "bulma/css/bulma.min.css";
import "../styles/App.css";
import "../styles/Cocktail.css";

import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";


const Cocktail = () => {
    const [user, setUser] = useState(null);
    const { slug } = useParams();
    const [cocktail, setCocktail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchCocktail = async () => {
            const response = await fetch(`${API_URL}/api/cocktails/${slug}`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setCocktail(data);
            }
        };

        const getUser = async () => {
            const result = await fetchUser();

            if (result.error === "unauthorized") {
                navigate("/login");
                return;
            }

            if (result.data) {
                setUser(result.data);
                fetchCocktail();
            }
        };

        getUser();
 
    }, [navigate, slug]);

    if (!user || !cocktail) return <p></p>;

    return (
        <>
            <Header />
            <div className="columns is-gapless">
                <div className="column is-2">
                    <Navigation />
                </div>
                <main className="column panel-cocktail">
                   
                    <div className="columns is-gapless panel-cocktail-inner">
                        <div className="column is-three-quarters column-main">

                            <div className="center-image-mobie">
                                <figure className="card has-text-centered">
                                    <div className="image-wrapper">
                                        <img
                                            src={`/images/cocktails/${cocktail.image}`}
                                            alt={cocktail.name}
                                            className="item-image"
                                        />
                                    </div>
                                    <figcaption className="cocktail-caption">
                                        {cocktail.name}
                                    </figcaption>
                                </figure>
                            </div>

                            <div className="cocktail-difficulty">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <FontAwesomeIcon
                                        key={index}
                                        icon={index < cocktail.difficulty_level ? faStarSolid : faStarRegular}
                                        style={{ color: index < cocktail.difficulty_level ? "#D4AF37" : "#800020", marginRight: "4px" }}
                                    />
                                ))}
                            </div>


                            <div className="has-text-centered has-text-white pr-2 pl-2">
                                <p>{cocktail.description}</p>
                            </div>

                        </div>

                   
                        <div className="column is-one-quarter column-recipe">
                            <div className="pl-2 pr-2 border-line">
                                <h1>Składniki</h1>
                                <ul>
                                    {cocktail.ingredients.map((ingredient, index) => (
                                        <li key={index} className="has-text-white">
                                            {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pl-2 pr-2 mt-2 border-line">
                                <h1>Instrukcja przygotowania</h1>
                                <ul>
                                    {cocktail.preparation_instruction
                                        .split(". ")
                                        .filter(sentence => sentence.trim() !== "") // usuwa puste zdanie, znaczenie na końcu całej instrukcji, dodawało zbędną kropkę
                                        .map((sentence, index) => (
                                            <li key={index} className="has-text-white">
                                                {sentence}
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            <div className="pl-2 pr-2 mt-2 border-line">
                                <h1>Ciekawostka</h1>
                                <p className="has-text-white">{cocktail.fun_fact}</p>
                            </div>

                        </div>
                    </div>

                </main>

            </div>
            <Footer />
        </>
    );
};

export default Cocktail;
