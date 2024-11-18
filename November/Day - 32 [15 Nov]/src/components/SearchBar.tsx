import React, { useState } from 'react';
import { searchMedia } from '../api/api';
import { SearchResult } from '../types';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (): Promise<void> => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await searchMedia(query);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const SearchIcon: React.FC = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-zinc-500"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-medium text-white text-center">
        Discover Movies & TV Shows
      </h2>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Search for a movie or TV show..."
            className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-800 focus:outline-none focus:border-orange-400
            0 transition-colors placeholder:text-zinc-500"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-orange-400 text-white font-medium rounded-lg hover:bg-orange-400 transition-colors"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="text-zinc-400 text-center">Loading...</div>
      )}
      {error && (
        <div className="text-red-400 text-center">{error}</div>
      )}

      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((item: SearchResult) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="aspect-[2/3] relative">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : '/api/placeholder/500/750'
                  }
                  alt={item.title || item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium truncate">
                  {item.title || item.name}
                </h3>
                <div className="flex items-center justify-between mt-2 text-sm text-zinc-400">
                  <span>IMDb: {item.vote_average || 'N/A'}</span>
                  <span>{item.media_type.toUpperCase()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;