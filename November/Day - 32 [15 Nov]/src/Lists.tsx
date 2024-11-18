import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserLists } from './context/UserlistContext';
import { Media } from './types';

const Lists = () => {
  const [activeTab, setActiveTab] = useState<'watchlist' | 'favorites' | 'watched'>('watchlist');
  const { lists, removeFromList, addToList } = useUserLists();
  const navigate = useNavigate();

  const handleTabClick = (tab: 'watchlist' | 'favorites' | 'watched') => {
    setActiveTab(tab);
  };

  const renderMediaItemOptions = (media: Media, listType: 'watchlist' | 'favorites' | 'watched') => (
    <div className="mt-3 flex flex-col justify-between">
      <button
        onClick={() => removeFromList(listType, media.id)}
        className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-500 text-sm"
      >
        Remove
      </button>
      {/* <button
        onClick={() => {
          const otherList = listType === 'watchlist' ? 'favorites' : 'watchlist';
          addToList(otherList, media);
          removeFromList(listType, media.id);
        }}
        className="bg-zinc-700 text-white px-3 py-1 rounded-md hover:bg-orange-400 text-sm"
      >
        Move to {listType === 'watchlist' ? 'Favorites' : 'Watchlist'}
      </button> */}
    </div>
  );

  const renderList = (listType: 'watchlist' | 'favorites' | 'watched') => {
    const items = lists[listType];

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8">
        {items.length > 0 ? (
          items.map((item: any) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-lg shadow-lg text-white p-3 flex flex-col"
            >
              <div className="relative group w-full aspect-[2/3] mb-3">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                      : '/api/placeholder/200/300'
                  }
                  alt={item.title || item.name}
                  className="rounded-md w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between">
                <div className='flex flex-col justify-between'>
                  <h3 className="text-sm font-semibold mb-1">{item.title || item.name}</h3>
                  <p className="text-xs text-zinc-400">
                    {item.release_date ? `Year: ${item.release_date.split('-')[0]}` : 'Year: N/A'}
                  </p>
                  <p className="text-xs text-orange-400">Rating: {item.vote_average || 'N/A'}/10</p>
                </div>
                <div>
                  {renderMediaItemOptions(item, listType)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-400">No items in this list.</p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="my-4">
        <button
          onClick={() => navigate(`/`)}
          className="px-4 py-2 text-white rounded-md hover:text-orange-500"
        >
          Go Back
        </button>
      </div>

      <div className="text-4xl font-semibold mb-6 px-10 text-orange-400">
        Saved Movies and Webshows
      </div>

      <div className="flex space-x-4 mb-6 px-10">
        {['watchlist', 'favorites', 'watched'].map(tab => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab as 'watchlist' | 'favorites' | 'watched')}
            className={`py-2 px-4 ${activeTab === tab
              ? 'border-b-2 border-orange-400 text-orange-400'
              : 'bg-black text-white'
              } hover:text-orange-400`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {renderList(activeTab)}
    </>
  );
};

export default Lists;
