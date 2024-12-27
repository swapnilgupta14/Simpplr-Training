import React, { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
    id: number;
    text: string;
}

const Form: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:5000/todos");
                setTodos(response.data.todos || []);
                setError("");
            } catch (error) {
                setError("Failed to fetch todos");
                console.error("Error fetching todos:", error);
            }
        };

        fetchTodos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            try {
                const response = await axios.post("http://localhost:5000/todos", { text: text.trim() });
                setTodos((prev) => [...prev, response.data.todo]);
                setText("");
                setError("");
            } catch (error) {
                setError("Failed to add todo");
                console.error("Error adding todo:", error);
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={() => window.location.href = '/home'}
                    className="text-2xl font-bold"
                >
                    &lt;
                </button>
                <h1 className="text-xl font-bold">Todo List</h1>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mb-6 flex flex-col sm:flex-row gap-4 items-center"
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border border-black px-4 py-2 rounded"
                    placeholder="Enter Todo"
                    data-testid="todo-input"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white w-auto rounded"
                    data-testid="submit-button"
                >
                    Submit
                </button>
            </form>

            {error && (
                <div className="text-red-600 mb-4" role="alert">
                    {error}
                </div>
            )}

            {todos.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl mb-4">Submitted Todos:</h2>
                    <ul className="list-disc list-inside space-y-2" data-testid="todos-list">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="bg-gray-100 px-4 py-2 rounded-lg border"
                            >
                                {todo.text}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Form;