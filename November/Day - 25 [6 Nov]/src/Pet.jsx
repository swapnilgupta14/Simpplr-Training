import React from "react";

const Pet = ({ name, animal, breed }) => {
  return (
    <div className="animal-card">
      <h1>Name: {name}</h1>
      <h2>Animal: {animal}</h2>
      <h2>Animal Breed{breed}</h2>
    </div>
  );
};
export default Pet;
