import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../api/fetchUser";

const Dashboard = () => {
    const [user, setUser] = useState(null);
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
                console.log(result.data)
            }
        };

        getUser();
    }, [navigate]);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <main style={{ padding: "20px" }}>
                <h2>Welcome!</h2>
                <p>Email: {user.email}</p>
                <p>Username: {user.username}</p>
            </main>
        </div>
    );
};

export default Dashboard;