import { useState } from "react";

const ANIMALS = ["Dog", "Cat", "Bird", "Horse", "Rabbit"];

const ANIMAL_BREEDS = {
  Dog: ["Labrador", "Beagle", "Bulldog", "Poodle"],
  Cat: ["Persian", "Siamese", "Maine Coon", "Ragdoll"],
  Bird: ["Cockatiel", "Parakeet", "Canary", "Macaw"],
  Horse: ["Arabian", "Thoroughbred", "Mustang", "Clydesdale"],
  Rabbit: ["Lop", "Rex", "Lionhead", "Angora"],
};

const SearchParams = () => {
  const [location, setLocation] = useState("Kanpur, UP");
  const [animal, setAnimal] = useState("");
  const [animalBreed, setAnimalBreed] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location, animal, animalBreed});
  };

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setAnimalBreed("");
            }}
          >
            <option value="">Select Animal</option>
            {ANIMALS.map((animal, idx) => (
              <option value={animal} key={idx}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        
        <label htmlFor="animalBreed">
          Animal Breed
          <select
            id="animalBreed"
            value={animalBreed}
            onChange={(e) => setAnimalBreed(e.target.value)}
            disabled={!animal}
          >
            <option value="">Select Breed</option>
            {animal && ANIMAL_BREEDS[animal]?.map((breed, idx) => (
              <option value={breed} key={idx}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchParams;
