import { API_URL } from "./url";

export const fetchUser = async () => {
    try {
        const response = await fetch(`${API_URL}/api/user`, {
            method: "GET",
            credentials: "include",
        });

        if (response.status === 401) {
            return { error: "unauthorized" };
        }

        if (!response.ok) {
            return { error: "server_error" };
        }

        const data = await response.json();
        return { data };
    } catch (err) {
        return { error: "network_error" };
    }
};
