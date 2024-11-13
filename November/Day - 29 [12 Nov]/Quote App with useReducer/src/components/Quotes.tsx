import React from 'react';
import { QuotesProps} from "../utils/types";

const Quotes: React.FC<QuotesProps> = ({ quotes, dispatch, children }) => {
  const handleClearQuotes = (): void => {
    dispatch({ type: 'CLEAR_QUOTES' });
  };

  return (
    <section className="w-full max-w-[80%] mx-auto mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 overflow-x-hidden">
      {quotes.map((quote) => (
        <div key={quote.id} className="p-4 bg-white rounded shadow-md border-l-4 border-blue-500">
          <p className="text-lg font-serif mb-2">"{quote.content}"</p>
          <p className="text-right text-sm text-gray-600">- {quote.author}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {quote.tags.map((tag, idx) => (
              <span 
                key={`${quote.id}-${idx}`}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
      {quotes.length > 0 && (
        <div className='w-full flex items-center justify-center'>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700"
            onClick={handleClearQuotes}
          >
            Clear Quotes
          </button>
        </div>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
};

export default Quotes;