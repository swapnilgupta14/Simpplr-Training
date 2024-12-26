import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/form");
    };

    return (
        <div className="h-screen text-center flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">Playwright React + TSC</h1>
            <button
                onClick={handleNavigate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Go to Form
            </button>
        </div>
    );
};

export default Home;
