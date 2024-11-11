export interface PetData {
  id: number;
  name: string;
  animal: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
  description: string;
}

export interface BreedListResponse {
  pets: PetData[];
}

export interface PetProps {
  animal: string;
  breed: string;
  breedList: PetData[];
}