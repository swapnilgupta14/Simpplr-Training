import { useNavigate } from 'react-router-dom';

export default function App() {
    const navigate = useNavigate();

    return (
        <main className="flex flex-col overflow-y-auto items-center justify-center w-full">
            <h1 className="my-4">React Design Patterns</h1>

            <div className='w-full flex gap-4 p-10'>

                <button
                    onClick={() => navigate("/Compound")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Compound Pattern
                </button>

                <button
                    onClick={() => navigate("/HOC")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    HOC Pattern
                </button>

                <button
                    onClick={() => navigate("/Container")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Container Pattern
                </button>

                <button
                    onClick={() => navigate("/Hooks")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Hooks Pattern
                </button>

                <button
                    onClick={() => navigate("/Render")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Render Props Pattern
                </button>

                
            </div>
        </main>
    );
}
