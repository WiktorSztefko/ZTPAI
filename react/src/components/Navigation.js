import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMartiniGlass, faWineBottle, faUser } from '@fortawesome/free-solid-svg-icons';

import "../styles/Navigation.css";

const Navigation = ({ isAdministrator = false }) => {
    return (
        <div>
            <nav>
                <ul className="desktop-icons">
                    <li className="hover-effect text">
                        <Link to="/main">
                            <FontAwesomeIcon icon={faHouse} className="icon-adjust"  />
                            <span className="ml-1">Strona główna</span>
                        </Link>
                    </li>
                    <li className="hover-effect text">
                        <Link to="/cocktails">
                            <FontAwesomeIcon icon={faMartiniGlass} className="icon-adjust" />
                            <span className="ml-1">Koktajle</span>
                        </Link>
                    </li>
                    <li className="hover-effect text">
                        <Link to="/alcohols">
                            <FontAwesomeIcon icon={faWineBottle} className="icon-adjust" />
                            <span className="ml-1">Alkohole</span>
                        </Link>
                    </li>
                    <li className="hover-effect text">
                        <Link to="/account">
                            <FontAwesomeIcon icon={faUser} className="icon-adjust" />
                            <span className="ml-1">Konto</span>
                        </Link>
                    </li>
                    {/* {isAdministrator && (
                        <li className="hover-effect">
                            <Link to="/upload">
                                <i className="fa-solid fa-file-arrow-up"></i>
                                <span className="is-size-2">Upload</span>
                            </Link>
                        </li>
                    )} */}
                </ul>
            </nav>
        </div>
    );
};

export default Navigation;
