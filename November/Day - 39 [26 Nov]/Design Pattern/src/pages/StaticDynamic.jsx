import React, { useState } from "react";
import { add } from "../utils/Static";

const StaticDynamic = () => {
  const [dynamicResult, setDynamicResult] = useState(null);

  const handleDynamicImport = async () => {
    const { multiply } = await import("../utils/Static");
    const result = multiply(6, 7);
    setDynamicResult(result);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-bold">Static and Dynamic Import</h1>
      <p>Adding 10 and 50 using static imported function: {add(10, 50)}</p>

      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={handleDynamicImport}
      >
        Multiply 6 and 7 (Dynamic Import)
      </button>

      {dynamicResult !== null && (
        <p className="text-green-500 mt-2">
          Multiplying 6 and 7 using dynamic imported function: {dynamicResult}
        </p>
      )}
    </div>
  );
};

export default StaticDynamic;
