import { usePackingContext } from '../context/AppContext';
import { Item } from '../types';

export const categoryColors: Record<string, string> = {
    clothing: 'bg-blue-100 text-blue-900',
    electronics: 'bg-zinc-300',
    toiletries: 'bg-yellow-100 text-yellow-900',
    documents: 'bg-red-100 text-red-900',
    accessories: 'bg-purple-100 text-purple-900',
    stationary: 'bg-orange-100 text-orange-900',
    health: "bg-green-100 text-green-900",
    food: "bg-cyan-100 text-cyan-900",
    books: "bg-fuchsia-100 text-fuchsia-950"
};

export default function ItemCard({ item }: { item: Item }) {
    const { dispatch } = usePackingContext();

    return (
        <div
            className={`w-fit px-4 py-2 rounded-xl flex justify-between items-center cursor-pointer ${categoryColors[item.category]} hover:shadow-md transition-shadow `}
            onClick={() => dispatch({ type: 'TOGGLE_PACK', payload: item.id })}
        >
            <span>{item.name}</span>
            {item.isPacked && (
                <span className="text-gray-600 ml-2">×</span>
            )}
        </div>
    );
}