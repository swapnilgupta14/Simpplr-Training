import React, { useEffect, useState, useCallback } from "react";
import useFetchBreed from "./useFetchBreed";
import Pet from "./Pet";
import { PetData } from "./types";

const SearchParams: React.FC = () => {
  const [location, setLocation] = useState<string>("Kanpur, UP");
  const [animalList, setAnimalList] = useState<string[]>([]);
  const [animal, setAnimal] = useState<string>("");
  const [breed, setBreed] = useState<string>("");

  const [breedList, setBreedList] = useState<PetData[]>([]);
  const [breedResponse, status] = useFetchBreed(animal);

  useEffect(() => {
    if (status === "Available") {
      setBreedList(breedResponse);
    }
  }, [breedResponse, status]);

  const fetchPetsDataByAnimal = async (): Promise<void> => {
    try {
      const response = await fetch(`http://pets-v2.dev-apis.com/pets`);
      const { pets } = await response.json();
      const animalSet: Set<string> = new Set();
      pets.forEach((pet: PetData) => {
        animalSet.add(pet.animal);
      });
      setAnimalList([...animalSet]);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPetsDataByAnimal();
  }, []);

  const handleAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setAnimal(e.target.value);
    setBreed("");
  };

  const updateLocation = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setLocation(e.target.value);
    },
    []
  );

  return (
    <div className="search-params">
      <form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
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