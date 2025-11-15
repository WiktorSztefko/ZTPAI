import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/App.css";
import "../styles/SuccessModal.css";

const SuccessModal= () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(3);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (count === 0) {
            navigate("/login");
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => prev + 100 / 3); // dzielimy 100% na 3 sekundy
        }, 60); // fps dla płynnej animacji

        const timeout = setTimeout(() => {
            setCount(count - 1);
            setProgress(0);
        }, 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [count, navigate]);

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Konto zostało utworzone</h2>
                <div className="circle-container">
                    <svg className="progress-ring" width="100" height="100">
                        <circle
                            className="progress-ring__circle"
                            stroke="#D4AF37"
                            strokeWidth="8"
                            fill="transparent"
                            r="45"
                            cx="50"
                            cy="50"
                            style={{
                                strokeDasharray: `${2 * Math.PI * 45}`,
                                strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`
                            }}
                        />
                    </svg>
                    <div className="circle-number">{count}</div>
                </div>
                <p>Przekierowanie nastąpi za {count}...</p>
            </div>
        </div>
    );
};

export default SuccessModal;
