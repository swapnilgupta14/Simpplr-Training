import { useNavigate } from 'react-router-dom';

export default function App() {
    const navigate = useNavigate();

    return (
        <main className="flex flex-col overflow-y-auto items-center justify-center w-full">
            <h1 className="my-4">Design Patterns</h1>

            <div className='w-full flex gap-4 p-10'>

                <button
                    onClick={() => navigate("/Singleton")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Singleton Page
                </button>

                <button
                    onClick={() => navigate("/Proxy")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Proxy Object
                </button>

                <button
                    onClick={() => navigate("/PrototypeDemo")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Prototype Pattern
                </button>

                <button
                    onClick={() => navigate("/Observer")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Observer Pattern
                </button>

                <button
                    onClick={() => navigate("/Mediator")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Mediator Pattern
                </button>
                <button
                    onClick={() => navigate("/Factory")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Factory Methods
                </button>

                <button
                    onClick={() => navigate("/StaticDynamic")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Static and Dynamic Imports
                </button>

            </div>
        </main>
    );
}
