import React, { useState } from "react";

const ProxyDemo = () => {
  const person = {
    name: "Swapnil",
    age: 21,
  };

  const handler = {
    get: (target, property) => {
      console.log(`Accessing property: ${property} is ${target[property]}`);
      return target[property];
    },
    set: (target, property, value) => {
      console.log(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    },
  };

  const personProxy = new Proxy(person, handler);

  const [proxyData, setProxyData] = useState({ ...person });

  const accessName = () => {
    const name = personProxy.name;
  };

  const updateAge = () => {
    personProxy.age = 43;
    setProxyData({ ...person });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Proxy Pattern Demo</h1>

      <div className="mb-4">
        <p className="font-semibold">Original Object:</p>
        <p className="bg-white p-2 rounded">{JSON.stringify(person, null, 2)}</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Proxy Object:</p>
        <p className="bg-white p-2 rounded">{JSON.stringify(proxyData, null, 2)}</p>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={accessName}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Access Name
        </button>
        <button
          onClick={updateAge}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Update Age
        </button>
      </div>
    </div>
  );
};

export default ProxyDemo;
