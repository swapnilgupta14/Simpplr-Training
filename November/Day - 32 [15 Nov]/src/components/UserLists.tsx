import { useUserLists } from '../context/UserlistContext';
import { useNavigate } from 'react-router-dom';

const UserLists = () => {
  const navigate = useNavigate();
  const { lists } = useUserLists();

  const renderList = (listType: keyof typeof lists, title: string) => {
    const items = lists[listType].slice(0, 4);

    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.length > 0 ? (
            items.map(item => (
              <div
                key={item.id}
                className="bg-black/20 rounded-lg p-4 shadow-lg text-white flex flex-col items-center"
              >
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                      : '/poster.webp'
                  }
                  alt={item.title || item.name}
                  className="w-full rounded-md mb-2 cursor-pointer"
                  onClick={() => navigate(`/item/${item.id}`)}
                />
                <p className="text-sm font-medium text-start w-full">
                  {item.title || item.name}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-400">No items in this list.</p>
          )}
        </div>
        <div className='flex justify-end'>

          {lists[listType].length > 4 && (
            <button className="mt-4 px-4 py-2 text-sm font-medium rounded-md hover:bg-orange-500 text-white ">
              View All
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black/10 rounded-xl p-6 backdrop-blur-sm border border-white/5">
      {renderList('favorites', 'Favourites')}
      {renderList('watchlist', 'Watchlist')}
      {renderList('watched', 'Already Watched')}
    </div>
  );
};

export default UserLists;
