import React from "react";
import CardDetails from "./components/CardDetails.jsx";

const App = () => {
  const restaurantData = [
    {
      image: "https://cdn.dummyjson.com/recipe-images/1.webp",
      name: "Classic Margherita Pizza",
      cuisine: "Italian",
      rating: 4.5,
      prepTime: 30,
      price: 14.99
    },
    {
      image: "https://cdn.dummyjson.com/recipe-images/2.webp",
      name: "Spicy Thai Basil Noodles",
      cuisine: "Thai",
      rating: 4.8,
      prepTime: 25,
      price: 12.99
    },
    {
      image: "https://cdn.dummyjson.com/recipe-images/3.webp",
      name: "Mediterranean Mezze Platter",
      cuisine: "Mediterranean",
      rating: 4.3,
      prepTime: 20,
      price: 16.99
    }
  ];

  return (
    <div className="app-container">
      <h1 className="app-title">Featured Dishes</h1>
      <div className="cards-grid">
        {restaurantData.map((item, index) => (
          <CardDetails key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default App;