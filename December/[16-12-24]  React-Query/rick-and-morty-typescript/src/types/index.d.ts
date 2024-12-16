export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}

export interface CharacterCardProps {
  character: Character;
}

export interface CharacterInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterResponse {
  info: CharacterInfo;
  results: Character[];
}
