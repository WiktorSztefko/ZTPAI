import React from "react";
import { Link } from "react-router-dom";

import "../styles/App.css";
import "../styles/Header.css";

const Header = () => {
    return (
        <header className="is-flex is-align-items-center is-justify-content-center pt-3 black">
            <Link to="/dashboard">
                <img
                    id="logo"
                    src="/images/photos/logo.jpeg"
                    alt="logo"
                />
            </Link>
            <Link to="/dashboard">
                <h1 className="has-text-white has-text-centered ml-3">
                    Cocktail King
                </h1>
            </Link>
        </header>
    );
};

export default Header;

