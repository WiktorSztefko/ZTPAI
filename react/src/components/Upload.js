import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { fetchUser } from "../api/fetchUser";
import { validateForm } from "../utils/validateUpload"; // ścieżka do pliku
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

    const [ingredientsList, setIngredientsList] = useState([]);             // lista dostępnych składników z API
    const [unitsList, setUnitsList] = useState([]);                         // lista jednostek z API
    const [selectedIngredients, setSelectedIngredients] = useState([]);     // aktualnie wybrane składniki w formularzu

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [preparationInstruction, setPreparationInstruction] = useState("");
    const [funFact, setFunFact] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [file, setFile] = useState(null);

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        preparationInstruction: "",
        difficultyLevel: "",
        ingredients: [], // tablica błędów dla każdego składnika
        file: "",
    });

    useEffect(() => {
        // Pobranie składników
        fetch(`${API_URL}/api/reference/ingredients`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setIngredientsList(data))
            .catch(err => console.error(err));

        // Pobranie jednostek
        fetch(`${API_URL}/api/reference/units`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setUnitsList(data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { isValid, newErrors } = validateForm({
            name,
            description,
            preparationInstruction,
            funFact,
            difficulty,
            file,
            selectedIngredients
        });

        setErrors(newErrors);

        if (!isValid) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("preparationInstruction", preparationInstruction);
        formData.append("funFact", funFact);
        formData.append("difficultyLevel", difficulty);
        formData.append("file", file);

        selectedIngredients.forEach((ing, idx) => {
            formData.append(`ingredients[${idx}][id_ingredient]`, ing.id_ingredient);
            formData.append(`ingredients[${idx}][quantity]`, ing.quantity);
            formData.append(`ingredients[${idx}][id_unit]`, ing.id_unit);
        });

        try {
            const response = await fetch(`${API_URL}/api/upload/cocktail`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            if (response.status === 409) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    name: "Koktajl o tej nazwie już istnieje"
                }));
                return;
            }

            const data = await response.json();
            if (!response.ok) {
                console.log(data.error || "Wystąpił błąd podczas dodawania koktajlu");
                return;
            }

            navigate("/cocktails");
        } catch (err) {
            console.error(err);
        }
    };

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

                    <form onSubmit={handleSubmit} >
                        <h1 className="title">Dodaj koktajl</h1>

                        {/* Nazwa koktajlu*/}
                        <div className="field">
                            <label className="label">Nazwa koktajlu</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Wpisz nazwę koktajlu"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            {errors.name && (
                                <p className="has-text-danger">{errors.name}</p>
                            )}
                        </div>

                        {/* Opis koktajlu*/}
                        <div className="field">
                            <label className="label">Opis koktajlu</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    placeholder="Wpisz opis koktajlu"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            {errors.description && (
                                <p className="has-text-danger">{errors.description}</p>
                            )}
                        </div>

                        {/* Instrukcja przygotowania*/}
                        <div className="field">
                            <label className="label">Instrukcja przygotowania</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    placeholder="Wpisz instrukcję przygotowania"
                                    value={preparationInstruction}
                                    onChange={(e) => setPreparationInstruction(e.target.value)}
                                />
                            </div>
                            {errors.preparationInstruction && (
                                <p className="has-text-danger">{errors.preparationInstruction}</p>
                            )}
                        </div>

                        {/* Ciekawostka o koktajlu */}
                        <div className="field">
                            <label className="label">Ciekawostka o koktajlu (opcjonalnie)</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    placeholder="Wpisz ciekawostkę"
                                    value={funFact}
                                    onChange={(e) => setFunFact(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Poziom trudności */}
                        <div className="field">
                            <label className="label mt-3">Poziom trudności</label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="input"
                            >
                                
                                <option value="" disabled hidden>Wybierz poziom trudności</option>
                                {[1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>

                            {errors.difficultyLevel && (
                                <p className="has-text-danger">{errors.difficultyLevel}</p>
                            )}
                        </div>

                        {/* Składniki koktajlu */}
                        <div id="ingredients-div" className="flex-column mt-3">

                            <label className="label">Składniki</label>
                            {errors.ingredientsGlobal && (
                                <p className="has-text-danger">{errors.ingredientsGlobal}</p>
                            )}

                            {selectedIngredients.map((ingredient, index) => (
                                <div>
                                    <div key={index} className="ingredient-container is-flex is-align-items-center gap-2 mb-3">
                                        
                                        <select
                                            className="ingredients-select input"
                                            value={ingredient.id_ingredient || ""}
                                            onChange={(e) => {
                                                const updated = [...selectedIngredients];
                                                updated[index].id_ingredient = e.target.value;
                                                setSelectedIngredients(updated);
                                            }}
                                        >
                                            <option value="" disabled hidden>Wybierz składnik</option>
                                            {ingredientsList.map(i => (
                                                <option key={i.id_ingredient} value={i.id_ingredient}>{i.name}</option>
                                            ))}
                                        </select>

                                        <input
                                            type="number"
                                            min="1"
                                            max="200"
                                            className="count-select input"
                                            value={ingredient.quantity || ""}
                                            onChange={(e) => {
                                                const updated = [...selectedIngredients];
                                                updated[index].quantity = e.target.value;
                                                setSelectedIngredients(updated);
                                            }}
                                            placeholder="Ilość"
                                        />

                                        <select
                                            className="unit-select input"
                                            value={ingredient.id_unit || ""}
                                            onChange={(e) => {
                                                const updated = [...selectedIngredients];
                                                updated[index].id_unit = e.target.value;
                                                setSelectedIngredients(updated);
                                            }}
                                        >
                                            <option value="" disabled hidden>Wybierz jednostkę</option>
                                            {unitsList.map(u => (
                                                <option key={u.id_unit} value={u.id_unit}>{u.name}</option>
                                            ))}
                                        </select>

                                        
                                        <button
                                            type="button"
                                                className="delete-button flex-center button is-warning"
                                                onClick={() => {
                                                    const updated = [...selectedIngredients];
                                                    updated.splice(index, 1);
                                                    setSelectedIngredients(updated);
                                                }}
                                        >
                                        <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                      
                                    </div>

                                    <div className="mb-3">
                                        {errors.ingredients[index]?.name && (
                                            <p className="has-text-danger">{errors.ingredients[index].name}</p>
                                        )}
                                        {errors.ingredients[index]?.quantity && (
                                            <p className="has-text-danger">{errors.ingredients[index].quantity}</p>
                                        )}
                                        {errors.ingredients[index]?.unit && (
                                            <p className="has-text-danger">{errors.ingredients[index].unit}</p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <button type="button" className="button is-warning"
                                onClick={() => setSelectedIngredients([...selectedIngredients, {}])}
                            >
                                Dodaj składnik
                            </button>

                        </div>

                        {/* Grafika koktajlu */}
                        <div className="field">
                            <label className="label mt-3">Grafika koktajlu</label>
                            <input
                                className="input"
                                type="file"
                                id="file-upload"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <div className="file-div">
                                <label
                                    htmlFor="file-upload"
                                    className="button is-warning label-file"
                                >
                                    Wybierz plik
                                </label>
                                <p className="ml-2">{file ? file.name : "Nie wybrano pliku"}</p>
                            </div>
                            {errors.file && (
                                <p className="has-text-danger">{errors.file}</p>
                            )}
                        </div>

                        {/* Button submit */}
                        <div className="submit-div mt-3">
                            <button type="submit" className="button is-warning mt-1">Wyślij</button>
                        </div>

                    </form>
                </main>
            </div>
            <Footer />
        </>
    );
};
export default Upload;
