import React, { useState } from 'react';
import { vehicleFactory } from '../utils/factory';

const Factory = () => {
  const [vehicle, setVehicle] = useState(null);

  const createVehicle = (type) => {
    const newVehicle = vehicleFactory(type);
    setVehicle(newVehicle);
  };

  return (
    <div className="flex flex-col p-10">
      <h1 className="text-lg font-bold">Factory Pattern Example</h1>
      <div className="flex gap-4 mt-4">
        {['Car', 'Bike', 'Truck'].map((type) => (
          <button
            key={type}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => createVehicle(type)}
          >
            Create {type}
          </button>
        ))}
      </div>
      {vehicle && (
        <div className="mt-6 border border-gray-300 p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold">Vehicle Details</h2>
          <p>Type: {vehicle.type}</p>
          <p>Wheels: {vehicle.wheels}</p>
          <p>Engine: {vehicle.engine}</p>
          <p className="italic mt-2">{vehicle.describe()}</p>
        </div>
      )}
    </div>
  );
};

export default Factory;
