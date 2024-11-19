import { useState } from 'react';
import { PackingProvider } from './context/AppContext';
import CategoryFilter from './components/CategoryFilter';
import UnpackedItems from './components/Unpacked';
import PackedItems from './components/Packed';
import AddNewPopup from './components/AddNewPopup';

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <PackingProvider>
            <div className="container mx-auto p-4 select-none">
                {/* <h1 className="text-lg font-medium my-2 text-black">Packing Application using React + ContextAPI</h1> */}
                <div className='w-full flex justify-between items-baseline'>
                    <CategoryFilter />
                    <button
                        className='rounded-3xl bg-black text-white py-2 px-4 mx-4 hover:bg-white hover:border-black border-2 hover:text-black'
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add New Item
                    </button>
                </div>
                <div className="flex gap-4">
                    <UnpackedItems />
                    <PackedItems />
                </div>
                <AddNewPopup
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </PackingProvider>
    );
}