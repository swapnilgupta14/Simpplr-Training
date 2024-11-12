import { useEffect, useReducer } from 'react';

type propType = {
    prop: number;
};

type ActionsWithoutPayload = 'INCREMENT' | 'DECREMENT' | 'RESET' | 'SYNC_COUNT';
type ActionTypes = { type: ActionsWithoutPayload } | { type: 'SYNC_DRAFT_COUNTER'; payload: number };


const initialState = (prop: number) => ({
    count: prop,
    draftCounter: prop,
});

function counterReducer(state: { count: number; draftCounter: number }, action: ActionTypes) {
    const { count, draftCounter } = state;

    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: count + 1 };
        case 'DECREMENT':
            return { ...state, count: count - 1 };
        case 'RESET':
            return { ...state, count: 0 };
        case 'SYNC_DRAFT_COUNTER':
            return { ...state, draftCounter: action.payload };
        case 'SYNC_COUNT':
            return { ...state, count: draftCounter };
        default:
            return state;
    }
}

const Counter = ({ prop }: propType) => {
    const [state, dispatch] = useReducer(counterReducer, initialState(prop));

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch({ type: 'SYNC_COUNT' });
    };

    const onChangeUpdateCounter = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SYNC_DRAFT_COUNTER', payload: event.target.valueAsNumber });
    };

    useEffect(() => {
        dispatch({ type: 'SYNC_DRAFT_COUNTER', payload: state.count });
    }, [state.count]);

    return (
        <section className="flex flex-col items-center w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-300">
            <p className="text-6xl font-semibold text-gray-800 my-10">{state.count}</p>

            <div className="flex space-x-4">
                <button
                    onClick={() => dispatch({ type: 'DECREMENT' })}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-3xl hover:bg-red-600 transition duration-200"
                    aria-label="Decrement"
                >
                    - Decrement
                </button>
                <button
                    onClick={() => dispatch({ type: 'RESET' })}
                    className="px-4 py-2 bg-gray-400 text-white font-medium rounded-3xl hover:bg-gray-500 transition duration-200"
                    aria-label="Reset"
                >
                    Reset
                </button>
                <button
                    onClick={() => dispatch({ type: 'INCREMENT' })}
                    className="px-4 py-2 bg-green-500 text-white font-medium rounded-3xl hover:bg-green-600 transition duration-200"
                    aria-label="Increment"
                >
                    + Increment
                </button>
            </div>

            <form onSubmit={onSubmit} className="mt-6 flex items-center space-x-3">
                <input
                    type="number"
                    value={state.draftCounter}
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
