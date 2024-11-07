import { useEffect, useState, useCallback } from "react";
import useFetchBreed from "./useFetchBreed";
import Pet from "./Pet";

const SearchParams = () => {
  const [location, setLocation] = useState("Kanpur, UP");
  const [animalList, setAnimalList] = useState([]);
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breedList, setBreedList] = useState([]);

  const [breedResponse, status] = useFetchBreed(animal);

  useEffect(() => {
    if (status === "Available") {
      setBreedList(breedResponse);
    }
  }, [breedResponse]);

  const updateLocation = useCallback((e) => {
    setLocation(e.target.value);
  }, []);

  const fetchPetsDataByAnimal = async () => {
    try {
      const response = await fetch(`http://pets-v2.dev-apis.com/pets`);
      const { pets } = await response.json();
      const animalSet = new Set();
      pets.forEach((pet) => {
        animalSet.add(pet.animal);
      });
      console.log(animalSet);
      setAnimalList([...animalSet]);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPetsDataByAnimal();
  }, []);

  const handleAnimalChange = (e) => {
    setAnimal(e.target.value);
    setBreed("");
  };

  return (
    <div className="search-params">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Location"
            onChange={updateLocation}
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={handleAnimalChange}
            disabled={animalList.length < 1}
          >
            <option value="">Select Animal</option>
            {animalList.map((animalOption) => (
              <option key={animalOption} value={animalOption}>
                {animalOption}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            disabled={!animal || breedList.length < 1}
          >
            <option value="">Select Breed</option>
            {breedList.map((breedOption) => (
              <option key={breedOption.id} value={breedOption.breed}>
                {breedOption.breed}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div className="pet-results">
        <Pet animal={animal} breed={breed} breedList={breedList} />
      </div>
    </div>
  );
};

export default SearchParams;
