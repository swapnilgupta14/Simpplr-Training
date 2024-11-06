import React from "react";
import { createRoot } from "react-dom/client";
// import Pet from "./Pet.jsx";
import SearchParams from "./SearchParams.jsx";

const App = () => {
  return (
    <div>
      {/* <Pet /> */}
      <h1>Adopt Me</h1>
      <SearchParams />
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);
