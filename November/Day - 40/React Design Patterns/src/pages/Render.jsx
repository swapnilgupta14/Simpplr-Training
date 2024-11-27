import React from "react";
import { useState, useEffect } from "react";

const DataProvider = ({ render }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData({ message: "Hello This is the Comp to show the Render Props Design Pattern" });
    }, 2000);
  }, []);

  return <>{render(data)}</>;
};

const Render = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Render Props Pattern Demo</h2>
      <DataProvider
        render={(data) =>
          data ? (
            <p className="text-lg text-green-800">{data.message}</p>
          ) : (
            <p className="text-lg text-gray-500">Loading...</p>
          )
        }
      />
    </div>
  );
};

export default Render;
