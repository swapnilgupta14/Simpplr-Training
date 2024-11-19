import { usePackingContext } from '../context/AppContext';
import { GroupedItems, Item } from '../types';
import ItemCard from './ItemCard';
import SearchInput from "./SearchInput";

export default function PackedItems() {
    const { state } = usePackingContext();

    const filterBySearch = (items: Item[]) => {
        if (!state.packedSearchQuery) return items;
        return items.filter(item =>
            item.name.toLowerCase().includes(state.packedSearchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(state.packedSearchQuery.toLowerCase())
        );
    };

    const packedItems = state.items.filter((item) => item.isPacked);
    const searchResults = filterBySearch(packedItems);

    const initialGroupedItems: GroupedItems = {
        clothing: [],
        electronics: [],
        toiletries: [],
        documents: [],
        accessories: [],
        stationary: [],
        health: [],
        food: [],
        books: [],
    };

    const groupItemsByCategory = (items: Item[]) => {
        return items.reduce((acc, item) => {
            acc[item.category].push(item);
            return acc;
        }, { ...initialGroupedItems });
    };

    const itemsByCategory = groupItemsByCategory(searchResults);
    const filteredResult = Object.entries(itemsByCategory).filter(([category, items]) => items.length > 0);

    return (
        <div className="w-1/2 p-4 bg-gray-100 rounded">
            <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-xl font-bold">Packed Items</h2>
                <SearchInput isPacked={true} />
            </div>

            {state.packedSearchQuery && (
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

            {!state.packedSearchQuery && filteredResult.map(([category, items]) => (
                <div key={category} className="mb-4">
                    <h3 className="font-semibold mb-4 capitalize">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}