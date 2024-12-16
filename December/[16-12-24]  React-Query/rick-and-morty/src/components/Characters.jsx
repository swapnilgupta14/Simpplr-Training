import { useState } from "react";
import CharacterCard from "./CharacterCard";
import { useQuery } from "react-query";

const Character = () => {
  // const [characters, setCharacters] = useState([]);
  // const [info, SetInfo] = useState({});
  const [page, setPage] = useState(1);

  const fetchCharacters = async (page) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch characters");
    }
    return response.json();
  };

  const { data, isLoading, isError, error, isFetching, isPending } = useQuery(
    ["characters", page],
    () => fetchCharacters(page),
    {
      keepPreviousData: true,
    }
  );

  console.log(isError, error);
  console.log(isLoading, isFetching);
  console.log(data);


  const handleNext = () => {
    if (data?.info?.next) {
      setPage((old) => old + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((old) => old - 1);
    }
  };

  if (isLoading || isPending) {
    return (
      <div className="h-screen flex items-center justify-center text-black">
        <p>Loading characters...</p>;
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center text-black">
        <p>Error: {error.message}</p>;
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10">
        {data?.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <div className="flex justify-center items-center py-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mx-2 disabled:opacity-50"
          onClick={handlePrev}
          disabled={page === 1 || isFetching}
        >
          Prev
        </button>
        <p className="text-lg font-semibold mx-4">Page {page}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mx-2 disabled:opacity-50"
          onClick={handleNext}
          disabled={!data?.info?.next || isFetching}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Character;
