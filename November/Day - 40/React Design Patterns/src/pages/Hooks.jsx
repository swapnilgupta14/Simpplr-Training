import React from 'react';
import { useCounter } from '../utils/useCounter';

const Hooks = () => {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Hooks Design Pattern Demo</h2>
      <p className="text-lg mb-4">Current Count: <strong>{count}</strong></p>
      <div className="flex space-x-2">
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrement
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Hooks;
