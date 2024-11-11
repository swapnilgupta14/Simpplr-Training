import React from "react";
import SearchParams from "./SearchParams";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1 className="app_heading">Adopt Me</h1>
      <SearchParams />
    </div>
  );
};

export default App;