import React, { useEffect } from 'react';
import { useMediaContext } from '../context/MediaContext';
import { Media } from '../types';
import { MediaListActions } from './MediaActions';
import { useNavigate } from 'react-router-dom';

const Trending: React.FC = () => {
  const { state, fetchMedia } = useMediaContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.trending) {
      fetchMedia('trending');
    }
  }, []);

  if (state.loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-zinc-400">Loading trending content...</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-red-400">{state.error}</p>
      </div>
    );
  }

  const trendingItems = state.trending?.slice(0, 10) || [];

  return (
    <section className="px-10 py-10">
      <div className="flex items-center justify-between mb-6 border-b-2 border-zinc-800">
        <div>
          <h2 className="text-2xl font-semibold text-orange-400">Trending Now</h2>
          <p className="text-lg text-zinc-400 mb-2">Most popular content this week</p>
        </div>
        <button
          className="px-4 py-2 text-lg text-zinc-300 hover:text-white transition-colors"
          onClick={() => {}}
        >
          See all trending
          <span className="ml-2">→</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {trendingItems.map((item: Media) => (
          <div
            key={item.id}
            className="group cursor-pointer gap-2"
            onClick={() => navigate(`/item/${item.id}`)}
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : '/api/placeholder/500/750'
                }
                alt={item.title || item.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="mt-3 space-y-1 mb-3">
              <h3 className="text-md font-medium text-white truncate">
                {item.title || item.name}{' '}
                {item.release_date && (
                  <span>({new Date(item.release_date).getFullYear()})</span>
                )}
                {item.first_air_date && (
                  <span>({new Date(item.first_air_date).getFullYear()})</span>
                )}
              </h3>
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <span className="inline-flex items-center">
                    <svg
                      className="w-5 h-5 mr-1 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {item.vote_average?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                  <MediaListActions media={item} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
