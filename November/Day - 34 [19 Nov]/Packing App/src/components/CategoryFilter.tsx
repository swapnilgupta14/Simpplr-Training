import { usePackingContext } from '../context/AppContext';
import { Category } from '../types';
import { categoryColors } from './ItemCard';

export default function CategoryFilter() {
    const { state, dispatch } = usePackingContext();
    const categories: (Category | 'all')[] = ['all', 'clothing' , 'electronics' , 'toiletries' , 'documents' , 'accessories' , "stationary" , "health" , "food" , "books"];

    return (
        <div className="flex gap-2 m-4">
            {categories.map((category, index) => (
                <button
                    key={category}
                    onClick={() => dispatch({ type: 'SET_CATEGORY', payload: category })}
                    className={`px-4 py-2 rounded-3xl ${state.selectedCategory === category
                            ? `${categoryColors[category]}`
                            : ` bg-white hover:bg-zinc-300`
                        } ${state.selectedCategory === "all" && index === 0 && "bg-black text-white" }`}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
        </div>
    );
}