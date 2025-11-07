import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../api/fetchUser";

import "bulma/css/bulma.min.css";
import "../styles/App.css";
import "../styles/Dashboard.css";


import Header from "./Header";
import Navigation from "./Navigation";
import MiddleSlider from "./MiddleSlider";
import TilesSection from "./TilesSection";
import Footer from "./Footer";

const Dashboard = () => {

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
    
    }, [navigate]);

    if (!user) return <p></p>;

    return (
        <>
            <Header />
            <section className="mt-5 top-section">
                <div className="columns is-gapless">

                        <div className="column is-2">
                            <Navigation isAdministrator={isAdministrator}/>
                        </div>

                        <div className="column is-8">
                            <MiddleSlider />
                        </div>

                    <aside className="column is-2 has-text-centered mt-3-mobile">

                        <div>
                            <h2>
                                <span>Mistrz</span>
                                <span>Barmańskiej</span>
                                <span>Sztuki</span>
                            </h2>

                            <button id="button-task" class="button mt-2 has-text-white hover-effect">
                                Wylosuj Zadanie
                            </button>
                        </div>

                    </aside>
                </div>
            </section>
            <TilesSection />
            <Footer />
        </>
    );
};

export default Dashboard;
