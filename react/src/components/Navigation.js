import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchUser } from "../api/fetchUser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMartiniGlass, faWineBottle, faUser, faFile } from '@fortawesome/free-solid-svg-icons';

import "../styles/App.css";
import "../styles/Navigation.css";

const Navigation = () => {
    const [isAdministrator, setIsAdministrator] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const result = await fetchUser();

            if (result.error) {
                return;
            }

            if (result.data) {
                
                if (Array.isArray(result.data.roles) && result.data.roles.includes("administrator")) {
                    setIsAdministrator(true);
                }
            }
        };

        getUser();

    });

    return (
        <div>
            <nav>
                <ul className="desktop-icons">
                    <Link to="/dashboard">
                        <li className="hover-effect text">
                                <FontAwesomeIcon icon={faHouse} className="icon-adjust"  />
                                <span className="ml-1">Strona główna</span>
                        </li>
                    </Link>

                    <Link to="/cocktails">
                        <li className="hover-effect text">
                                <FontAwesomeIcon icon={faMartiniGlass} className="icon-adjust" />
                                <span className="ml-1">Koktajle</span>
                        </li>
                    </Link>

                    <Link to="/alcohols">
                        <li className="hover-effect text">
                                <FontAwesomeIcon icon={faWineBottle} className="icon-adjust" />
                                <span className="ml-1">Alkohole</span>
                        </li>
                    </Link>

                    <Link to="/account">
                        <li className="hover-effect text">
                                <FontAwesomeIcon icon={faUser} className="icon-adjust" />
                                <span className="ml-1">Konto</span>
                        </li>
                    </Link>

                    {isAdministrator && (
                        <Link to="/upload">
                            <li className="hover-effect text">
                                    <FontAwesomeIcon icon={faFile} className="icon-adjust" />
                                    <span className="ml-1">Upload</span>
                            </li>
                        </Link>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
