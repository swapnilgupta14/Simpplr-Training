import React from "react";
import Header from "./components/Header.jsx";
import FoodList from "./components/FoodList.jsx";
import ProductList from "./components/ProductList.jsx";

import "./style.css";

const App = () => {
  return (
    <>
      <Header />
      <FoodList />
      <ProductList />
    </>
  )
}

export default App;
