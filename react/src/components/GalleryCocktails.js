import React, { useEffect, useState} from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import { fetchUser } from "../api/fetchUser";
import { API_URL } from "../api/url";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import "bulma/css/bulma.min.css";
import "../styles/App.css";
import "../styles/Gallery.css";

import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";

const GalleryCocktails = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const result = await fetchUser();

            if (result.error === "unauthorized") {
                navigate("/login");
                return;
            }

            if (result.data) {
                setUser(result.data);
                fetchCocktails();
            }
        };

        const fetchCocktails = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8000/api/cocktails");

                if (response.ok) {
                    const data = await response.json();

                    if(data) {
                        setCocktails(data);
                    }
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        };

        getUser();
    }, [navigate]);

    const fetchCocktailsByKey = async (search) => {
        console.log("szukam")
        try {
            setIsSearching(true);
            setLoading(true);

            const url = search.trim() === ""
                ? `${API_URL}/api/cocktails`                    
                : `${API_URL}/api/cocktails/search?key=${encodeURIComponent(search)}`;

            const response = await fetch(url, { credentials: "include" });

            if (!response.ok) {
                setCocktails([]);
                setLoading(false);
                setIsSearching(false);
                return;
            }

            const data = await response.json();
            setCocktails(data || []);
            setLoading(false);
            setIsSearching(false);
        } catch (err) {
            setCocktails([]);
            setLoading(false);
            setIsSearching(false);
        }
    };

    const slugify = (text) => {
        return text
            .toLowerCase()                // małe litery
            .normalize("NFD")             // usuwa polskie znaki diakrytyczne
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")         // spacje → myślniki
            .replace(/[^\w-]+/g, "")      // usuwa wszystko poza literami, cyframi i myślnikiem
            .replace(/--+/g, "-")         // podwójne myślniki → pojedynczy
            .replace(/^-+|-+$/g, "");     // usuwa myślniki z początku i końca
    };

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
                            <p>Ładowanie koktajli ...</p>
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
                    <div className="search-container is-flex is-justify-content-center is-align-items-center">

                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="text"
                                placeholder="Wyszukaj"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        fetchCocktailsByKey(searchTerm);
                                    }
                                }}

                            />
                            <span className="icon is-small is-left has-text-warning">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                        </div>

                    </div>
                    <div className="columns is-multiline is-centered">
                        {cocktails.map((cocktail) => (
                            <div key={cocktail.id_cocktail} className="column is-one-quarter m-3">
                                <figure
                                    className="card flex-column has-text-centered"
                                    onClick={() => navigate(`/cocktails/${slugify(cocktail.name)}`)}
                                >
                                    <div className="image-wrapper">
                                        <img
                                            src={`/images/cocktails/${cocktail.image}`}
                                            alt={cocktail.name}
                                            className="item-image"
                                        />
                                    </div>
                                    <figcaption className="alcohol-caption">
                                        {cocktail.name}
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

export default GalleryCocktails;