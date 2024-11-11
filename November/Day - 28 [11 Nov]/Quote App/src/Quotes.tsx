import React from 'react';
import { QuotesProps } from "./types";

const Quotes: React.FC<QuotesProps> = ({ quotes, setQuotes, setLimit, children }) => {

    const handleClearQuotes = () => {
        setQuotes([]);
        setLimit('');
    };

    return (
        <section className="w-full max-w-[80%] mx-auto mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((quote, index) => (
                <div key={index} className="p-4 bg-white rounded shadow-md border-l-4 border-blue-500">
                    <p className="text-lg font-serif mb-2">"{quote.content}"</p>
                    <p className="text-right text-sm text-gray-600">- {quote.author}</p>
                </div>
            ))}

            {quotes.length > 0 && <div className='w-full flex items-center justify-center'>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700" onClick={handleClearQuotes}>
                    Clear Quotes
                </button>
            </div>}

            <div className="mt-6">
                {children}
            </div>
        </section>
    );
};

export default Quotes;
