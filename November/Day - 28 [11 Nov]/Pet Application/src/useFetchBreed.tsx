import { useEffect, useState } from "react";
import { PetData, BreedListResponse } from "./types";

type Status = "Pending" | "Available";
type CacheObject = { [key: string]: PetData[] };

const cacheObject: CacheObject = {};

export default function useFetchBreed(animal: string): [PetData[], Status] {
  const [animalBreed, setAnimalBreed] = useState<PetData[]>([]);
  const [status, setStatus] = useState<Status>("Pending");

  async function fetchAnimalBreedFromAPI(): Promise<void> {
    setStatus("Pending");
    setAnimalBreed([]);

    try {
      const response = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}`
      );
      const { pets }: BreedListResponse = await response.json();

      const filteredBreeds = pets.filter((pet) => pet.animal === animal);

      cacheObject[animal] = filteredBreeds || [];
      setStatus("Available");
      setAnimalBreed(filteredBreeds);
    } catch (error) {
      console.error("Error fetching breeds:", error);
      setStatus("Available");
      setAnimalBreed([]);
    }
  }

  useEffect(() => {
    if (!animal) return;

    if (cacheObject[animal]) {
      setAnimalBreed(cacheObject[animal]);
      setStatus("Available");
    } else {
      fetchAnimalBreedFromAPI();
    }
  }, [animal]);

  return [animalBreed, status];
}