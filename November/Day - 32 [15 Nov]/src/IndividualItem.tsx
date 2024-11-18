import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMediaContext } from './context/MediaContext';
import { useUserLists } from './context/UserlistContext';
import { Media } from './types';
import { fetchMediaById } from './api/api';

const IndividualItem: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state } = useMediaContext();
  const { lists, isInList, addToList, removeFromList } = useUserLists();

  const [fetchedItem, setFetchedItem] = useState<Media | null>(null);
  const [loading, setLoading] = useState(false);

  const item: Media | undefined = state.trending?.find(media => media.id === Number(id));

  useEffect(() => {
    if (!item && id) {
      setLoading(true);
      fetchMediaById(id)
        .then((data) => setFetchedItem(data))
        .catch((error) => console.error('Error fetching item:', error))
        .finally(() => setLoading(false));
    }
  }, [id, item]);

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-zinc-400">Loading item...</p>
      </div>
    );
  }

  if (!item && !fetchedItem) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-zinc-400">Item not found</p>
      </div>
    );
  }

  const displayItem = item || fetchedItem;

  const handleAction = (listType: keyof typeof lists) => {
    if (isInList(listType, displayItem!.id)) {
      removeFromList(listType, displayItem!.id);
    } else {
      addToList(listType, displayItem!);
    }
  };

  return (
    <div className="px-10 py-5 text-white">
      <div className="my-4">
        <button onClick={() => navigate(`/`)} className="text-orange-600 hover:underline">
          Go Back
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={
              displayItem?.poster_path
                ? `https://image.tmdb.org/t/p/w500${displayItem.poster_path}`
                : '/public/poster.webp'
            }
            alt={displayItem?.title || displayItem?.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-semibold">{displayItem?.title || displayItem?.name}</h1>
          <p className="text-lg text-zinc-400 mt-4">
            {displayItem?.overview || 'No description available.'}
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            Release Date: {displayItem?.release_date || displayItem?.first_air_date || 'N/A'}
          </p>
          <p className="text-sm text-zinc-500">
            Rating: {displayItem?.vote_average?.toFixed(1) || 'N/A'}
          </p>
          <div className="flex gap-4 mt-6">
            {(['favorites', 'watchlist', 'watched'] as const).map(listType => (
              <button
                key={listType}
                onClick={() => handleAction(listType)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${isInList(listType, displayItem!.id)
                    ? 'bg-zinc-600 hover:bg-zinc-500'
                    : 'bg-orange-600 hover:bg-orange-500'
                  }`}
              >
                {isInList(listType, displayItem!.id)
                  ? `Remove from ${listType}`
                  : `Add to ${listType}`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualItem;
