import { useEffect, useState } from 'react';

type propType = {
    prop: number;
};

const Counter = ({ prop }: propType) => {
    const [count, setCount] = useState(prop);
    const [draftCounter, setDraftCounter] = useState<number>(prop);

    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCount(draftCounter);
    };
    
    const onChangeUpdateCounter = (event: React.ChangeEvent<HTMLInputElement>) => setDraftCounter(event.target.valueAsNumber);
    
    useEffect(() => {
        setDraftCounter(count);
    }, [count]);

    return (
        <section className="flex flex-col items-center w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-300">
            <p className="text-6xl font-semibold text-gray-800 my-10">{count}</p>

            <div className="flex space-x-4">
                <button
                    onClick={() => setCount((count) => count - 1)}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-3xl hover:bg-red-600 transition duration-200"
                    aria-label="Decrement"
                >
                    - Decrement
                </button>
                <button
                    onClick={() => setCount(prop)}
                    className="px-4 py-2 bg-gray-400 text-white font-medium rounded-3xl hover:bg-gray-500 transition duration-200"
                    aria-label="Reset"
                >
                    Reset
                </button>
                <button
                    onClick={() => setCount((count) => count + 1)}
                    className="px-4 py-2 bg-green-500 text-white font-medium rounded-3xl hover:bg-green-600 transition duration-200"
                    aria-label="Increment"
                >
                    + Increment
                </button>
            </div>

            <form onSubmit={onSubmit} className="mt-6 flex items-center space-x-3">
                <input
                    type="number"
                    value={draftCounter}
                    onChange={onChangeUpdateCounter}
                    className="w-24 p-2 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-3xl"
                    aria-label="Counter input"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-3xl hover:bg-blue-600 transition duration-200"
                >
                    Update Counter
                </button>
            </form>
        </section>
    );
};

export default Counter;
