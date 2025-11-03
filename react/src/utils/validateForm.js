export const validateForm = ({ name, surname, username, password, confirmedPassword }) => {
    const errors = {
        name : "",
        surname: "",
        username: "",
        password: "",
        confirmPassword: "",
    };

    if (!name || name.trim().length < 1) {
        errors.name = "To pole nie może być puste";
    }

    if (!surname || surname.trim().length < 1) {
        errors.surname = "To pole nie może być puste";
    }

    if (!username || username.trim().length < 3) {
        errors.username = "Nazwa użytkownika musi mieć co najmniej 3 znaki";
    }

    if (!password || password.length < 8) {
        errors.password = "Hasło musi mieć co najmniej 8 znaków.";
    } else if (!/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.password = "Hasło musi zawierać przynajmniej jedną cyfrę i znak specjalny";
    }

    if (password !== confirmedPassword) {
        errors.confirmedPassword = "Hasła nie są identyczne";
    }

    return errors;
};
