import React from 'react';
import { Media } from '../types';
import { useUserLists } from '../context/UserlistContext';
import { Heart, List, CheckCircle } from 'lucide-react';

interface MediaListActionsProps {
    media: Media;
}

export const MediaListActions: React.FC<MediaListActionsProps> = ({ media }) => {
    const { isInList, addToList, removeFromList } = useUserLists();

    const toggleList = (listType: 'favorites' | 'watchlist' | 'watched') => {
        if (isInList(listType, media.id)) {
            removeFromList(listType, media.id);
        } else {
            addToList(listType, media);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => toggleList('favorites')}
                className={`p-1.5 rounded-full transition-colors ${isInList('favorites', media.id)
                        ? 'bg-pink-500/20 text-pink-500'
                        : 'bg-white/5 text-gray-400 hover:text-pink-500 hover:bg-pink-500/10'
                    }`}
                title={isInList('favorites', media.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Heart className="h-4 w-4" />
            </button>

            <button
                onClick={() => toggleList('watchlist')}
                className={`p-1.5 rounded-full transition-colors ${isInList('watchlist', media.id)
                        ? 'bg-blue-500/20 text-blue-500'
                        : 'bg-white/5 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10'
                    }`}
                title={isInList('watchlist', media.id) ? 'Remove from watchlist' : 'Add to watchlist'}
            >
                <List className="h-4 w-4" />
            </button>

            <button
                onClick={() => toggleList('watched')}
                className={`p-1.5 rounded-full transition-colors ${isInList('watched', media.id)
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-white/5 text-gray-400 hover:text-green-500 hover:bg-green-500/10'
                    }`}
                title={isInList('watched', media.id) ? 'Remove from watched' : 'Mark as watched'}
            >
                <CheckCircle className="h-4 w-4" />
            </button>
        </div>
    );
};