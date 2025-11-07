import React from "react";

import "bulma/css/bulma.min.css";
import "../styles/App.css";
import "../styles/TilesSection.css";

const tiles = [
    { img: "/images/cocktails/old fashioned.jpeg", title:"OLD FASHIONED", text: "Jeden z najstarzych koktaili świata, jego historia sięga początku XVIII wieku." },
    { img: "/images/cocktails/lynchburg lemonade.jpeg", title: "LYNCHBURG LEMONADE", text: "Nazwa Lynchburg pochodzi od miejscowości, w której powstaje Jack Daniels." },
    { img: "/images/cocktails/basil smash.jpeg", title: "BASIL SMASH", text: "Koktajl powstał dopiero w 2008 roku, swój intrygujący kolor zawdzięcza właśnie bazylii." },
    { img: "/images/cocktails/amf.jpeg", title: "AMF", text: "Adios, Motherfucker... parafraza słów barmana po przygotowaniu tego mega mocnego drinka." },
];

const TilesSection = () => {
    return (
        <section className="bottom-section mt-5">
            <div className="columns is-justify-content-space-around is-multiline ">
                {tiles.map((tile, index) => (
                    <div key={index} className="column is-one-fifth ">
                        <div className="tile-card">
                            <figure className="image is-square">
                                <img src={tile.img} alt={tile.text} />
                                <div className="overlay is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered">
                                    <h1 className="title">{tile.title}</h1>
                                    <p className="overlay-text has-text-white text-desc">{tile.text}</p>
                                </div>
                            </figure>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TilesSection;
