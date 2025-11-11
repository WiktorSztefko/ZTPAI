export const validateForm = ({
    name,
    description,
    preparationInstruction,
    funFact,
    difficulty,
    file,
    selectedIngredients
}) => {
    const newErrors = {
        name: name.trim() ? "" : "Podaj nazwę koktajlu",
        description: description.trim() ? "" : "Podaj opis",
        preparationInstruction: preparationInstruction.trim() ? "" : "Podaj instrukcję przygotowania",
        difficultyLevel: difficulty ? "" : "Wybierz poziom trudności",
        ingredients: [],
        ingredientsGlobal: "",
        file: file ? "" : "Wybierz plik z obrazkiem",
    };

    if (selectedIngredients.length === 0) {
        newErrors.ingredientsGlobal = "Dodaj conajmniej 1 składnik";
    }

    selectedIngredients.forEach((ing, idx) => {
        const ingErrors = {
            name: ing.id_ingredient ? "" : "Wybierz składnik",
            quantity: ing.quantity ? "" : "Wybierz ilość",
            unit: ing.id_unit ? "" : "Wybierz jednostkę",
        };
        newErrors.ingredients[idx] = ingErrors;
    });

    const isEmpty = (obj) => Object.values(obj).every(v => v === "" || v == null);
    const isValid =
        !newErrors.name &&
        !newErrors.description &&
        !newErrors.preparationInstruction &&
        !newErrors.funFact &&
        !newErrors.difficultyLevel &&
        !newErrors.file &&
        !newErrors.ingredientsGlobal &&
        newErrors.ingredients.every(isEmpty);

    return { isValid, newErrors };
};
