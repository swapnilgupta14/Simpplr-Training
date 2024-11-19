import { usePackingContext } from '../context/AppContext';
import { Item } from '../types';
import ItemCard from './ItemCard';
import SearchInput from "./SearchInput"

export default function UnpackedItems() {
    const { state } = usePackingContext();

    const filterBySearch = (items: Item[]) => {
        if (!state.unpackedSearchQuery) return items;
        return items.filter(item =>
            item.name.toLowerCase().includes(state.unpackedSearchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(state.unpackedSearchQuery.toLowerCase())
        );
    };

    const topSuggestions = state.items.filter((item) => !item.isPacked && item.category === state.selectedCategory);
    //const topSuggestions = filteredItems.filter((item) => state.selectedCategory !== 'all' && item.category === state.selectedCategory);

    const allItems: Item[] = state.items.filter((item) => !item.isPacked)
    
    const searchResults = filterBySearch(allItems);

    return (
        <div className="w-1/2 p-4 px-6 bg-gray-100 rounded min-h-[83vh]">
            <div className='flex justify-between items-center rounded-xl bg-zinc-200 py-2 px-4 mb-4'>
                <h2 className="text-xl font-medium">Unpacked Items ({allItems.length})</h2>
                <div>
                    <SearchInput isPacked={false} />
                </div>
            </div>

            {state.unpackedSearchQuery && (
                <>
                    <h3 className="font-semibold mb-2 text-zinc-800">
                        Search Results ({searchResults.length})
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {searchResults.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </>
            )}

            {state.selectedCategory !== 'all' && topSuggestions.length > 0 && (
                <>
                    <h3 className="font-semibold mb-2 text-zinc-800 capitalize">Top Suggestions: {state.selectedCategory}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {topSuggestions.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </>
            )}

            <h3 className="font-semibold text-zinc-800 mb-4">All Items</h3>
            <div className="flex flex-wrap gap-2">
                {allItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}