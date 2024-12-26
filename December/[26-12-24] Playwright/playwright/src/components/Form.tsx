import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [submittedText, setSubmittedText] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            setSubmittedText((prev) => [...prev, text.trim()]);
            setText("");
        }
    };

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/home");
    };

    return (
        <div className="p-6">
            <h1 className="mb-4 text-xl font-bold"><span className="px-2 cursor-pointer" onClick={handleNavigate}>{"<"}</span>Form</h1>
            <form
                onSubmit={handleSubmit}
                className="mb-6 flex flex-col sm:flex-row gap-4 items-center"
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border border-black px-4 py-2 rounded"
                    placeholder="Enter Input"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white w-auto rounded"
                >
                    Submit
                </button>
            </form>

            {submittedText.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl mb-4">
                        Submitted Response:
                    </h2>
                    <div className="list-disc list-inside space-y-2">
                        {submittedText.map((value, index) => (
                            <p
                                key={index}
                                className="bg-gray-100 px-4 py-2 rounded-lg border"
                            >
                                {value}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Form;
