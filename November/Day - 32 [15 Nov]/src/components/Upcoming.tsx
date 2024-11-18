import React from 'react';
import { useMediaContext } from '../context/MediaContext';
import { ArrowUpRight, Calendar, Star } from 'lucide-react';
import { Media } from '../types';
import { useNavigate } from 'react-router-dom';

const Upcoming: React.FC = () => {
  const navigate = useNavigate();
  const { state, fetchMedia } = useMediaContext();
  const { upcoming, loading, error } = state;

  React.useEffect(() => {
    fetchMedia('upcoming');
  }, []);

  const formatDate = (date: string | undefined) => {
    if (!date) return 'TBA';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTitle = (media: Media) => {
    return media.title || media.name || 'Untitled';
  };

  const getReleaseDate = (media: Media) => {
    return media.release_date || media.first_air_date;
  };

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const firstDate = upcoming?.[0] && getReleaseDate(upcoming[0]);
  const lastDate = upcoming?.[upcoming.length - 1] && getReleaseDate(upcoming[upcoming.length - 1]);

  return (
    <div className="bg-black/10 rounded-xl p-6 backdrop-blur-sm border border-white/5">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-orange-400 bg-clip-text text-transparent">
            Upcoming Releases
          </h2>
          <p className="text-sm text-gray-400 mt-1">Latest upcoming entertainment</p>
        </div>
        <div className="flex items-start gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-full">
          <Calendar className="h-4 w-4 text-orange-400" />
          {upcoming?.[0] && (
            <span className="text-xs">
              {formatDate(firstDate)} - {formatDate(lastDate)}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {upcoming?.map((media) => (
          <div
            key={media.id}
            className="group relative p-4 rounded-lg transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10 bg-zinc-950"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium text-white/90 truncate group-hover:text-orange-400 transition-colors">
                    {getTitle(media)}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange-400 cursor-pointer" 
                   onClick={() => navigate(`/item/${media.id}`)}
                  />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-md justify-between">
                  <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-full">
                    <Calendar className="h-3.5 w-3.5 text-orange-400" />
                    <span className="text-xs text-white/70">{formatDate(getReleaseDate(media))}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-full">
                    <Star className="h-3.5 w-3.5 text-yellow-400" />
                    <span className="text-xs text-white/70">{media.vote_average.toFixed(1)}</span>
                  </div>

                  {media.media_type && (
                    <div className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300 font-medium">
                      {media.media_type.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;