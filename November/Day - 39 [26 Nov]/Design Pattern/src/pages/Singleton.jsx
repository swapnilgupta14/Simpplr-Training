import React, { useState } from "react";

class SingletonClass {
  constructor() {
    if (SingletonClass.instance) {
      console.log("Existing instance returned");
      return SingletonClass.instance;
    }
    this.data = "Initial Singleton Data";
    SingletonClass.instance = this;
    console.log("First instance created");
  }

  getData() {
    return this.data;
  }

  setData(newData) {
    this.data = newData;
  }
}

export default function Singleton() {
  const [data, setData] = useState(() => {
    const instance = new SingletonClass();
    return instance.getData();
  });

  const createInstance = () => {
    const newAttempt = {
      timestamp: new Date().toLocaleTimeString(),
      result: "",
    };

    const instance = new SingletonClass();

    if (instance.getData() === data) {
      newAttempt.result = "Existing instance returned";
    } else {
      newAttempt.result = "New instance created (unexpected!)";
    }
  };

  const updateData = () => {
    const instance = new SingletonClass();
    instance.setData(`Updated at ${new Date().toLocaleTimeString()}`);
    setData(instance.getData());
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Singleton Pattern Demo</h1>

      <div className="mb-4">
        <p className="font-semibold">Current Data:</p>
        <p className="bg-white p-2 rounded">{data}</p>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={createInstance}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Attempt New Instance
        </button>
        <button
          onClick={updateData}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Update Data
        </button>
      </div>
    </div>
  );
}
