import { useEffect, useState } from "react";
const cacheObject = {};

export default function useFetchBreed(animal) {
  const [animalBreed, setAnimalBreed] = useState([]);
  const [status, setStatus] = useState("Pending");

  async function fetchAnimalBreedFromAPI() {
    setStatus("Pending");
    setAnimalBreed([]);

    const response = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}`);
    const { pets } = await response.json();

    const filteredBreeds = pets.filter((pet) => {return pet.animal === animal});

    cacheObject[animal] = filteredBreeds || [];
    setStatus("Available");
    setAnimalBreed(filteredBreeds);
  }

  useEffect(() => {
    if (cacheObject[animal]) {
      setAnimalBreed(cacheObject[animal]);
    } else {
        fetchAnimalBreedFromAPI();
    }
  }, [animal]);

  return [animalBreed, status];
}
