import React, { useState } from 'react';
import { Quote } from "./types";
import { fetchRandomQuote } from './fetchQuotes';
import Quotes from './Quotes';

const App: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [limit, setLimit] = useState<string>('');
  // const [isLoading, setisLoading] = useState<Boolean>(false);

  const handleLimitChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLimit(e.target.value);
  };

  const handleFetchQuotes = () => {
    // setisLoading(true);
    if (limit === '' || isNaN(Number(limit))) {
      alert("Input the number first");
      return;
    }
    fetchRandomQuote(Number(limit))
      .then(setQuotes)
      .catch((error) => console.error("Error fetching quotes:", error));
    // setisLoading(false);
  };

  return (
    <main className="w-screen min-h-screen py-12 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <section className="w-full max-w-5xl mx-auto p-6 rounded-lg bg-white shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">Quote Application</h2>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleFetchQuotes();
          }}
          className="flex flex-col gap-2"
        >
          <label htmlFor="quote-limit" className="text-lg font-medium text-gray-700">Number of Quotes</label>
          <div className='flex'>
            <div className="flex-1 flex flex-col">
              <input
                id="quote-limit"
                type="number"
                min={1}
                max="25"
                value={limit}
                onChange={handleLimitChange}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLimit(e.target.value)}
                placeholder="Enter number of quotes"
                className="p-2 border border-blue-300 rounded-l-3xl focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-[10%] text-white font-bold rounded-r-3xl bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Fetch
            </button>
          </div>
        </form>
      </section>

      <Quotes quotes={quotes} setQuotes={setQuotes} setLimit={setLimit}>
        <div>
          {Number(limit) > 0 && quotes.length > 0 && `${limit} quotes loaded`}
        </div>
      </Quotes>
    </main>
  );
};

export default App;
