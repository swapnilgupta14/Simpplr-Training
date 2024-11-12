import React, { useState, useEffect } from 'react';
import { Quote } from "./utils/types";
import { fetchRandomQuote } from './utils/fetchQuotes';
import Quotes from './components/Quotes';
import DailyQuote from './components/DailyQuote';

const App: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [limit, setLimit] = useState<string>('');
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRandomQuote(1)
      .then((quoteArray) => setDailyQuote(quoteArray[0]))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLimitChange: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(e.target.value);
  };

  const handleFetchQuotes = () => {
    if (limit === '' || isNaN(Number(limit))) {
      alert("Please input a valid number first.");
      return;
    }
    setIsLoading(true);
    fetchRandomQuote(Number(limit))
      .then((quotesArray) => {
        setQuotes(quotesArray);
        setDailyQuote(null);
      })
      .catch((error) => console.error("Error fetching quotes:", error))
      .finally(() => setIsLoading(false));
  };

  return (
    <main className="w-full min-h-screen py-12 px-4 flex flex-col items-center justify-start overflow-x-hidden">

      <section className="w-[70%] mx-auto p-6 rounded-lg bg-white shadow-lg overflow-x-hidden">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">Quote Application Using React</h2>

        {quotes.length === 0 && (
          <DailyQuote dailyQuote={dailyQuote} isLoading={isLoading} />
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFetchQuotes();
          }}
          className="flex flex-col gap-4 mt-6"
        >
          <label htmlFor="quote-limit" className="text-lg font-medium text-gray-700">Number of Quotes</label>
          <div className="flex">
            <input
              id="quote-limit"
              type="number"
              min={1}
              max="25"
              value={limit}
              onChange={handleLimitChange}
              placeholder="Enter number of quotes"
              className="p-2 border border-blue-300 rounded-l-3xl focus:ring-2 focus:ring-blue-300 flex-1"
            />
            <button
              type="submit"
              className="w-[10%] text-white font-bold rounded-r-3xl bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Fetch
            </button>
          </div>
        </form>

      </section>

      {quotes.length > 0 && (
        <Quotes quotes={quotes} setQuotes={setQuotes} setLimit={setLimit}>
          <div className="text-center text-gray-600 mt-4">
            {`${limit} quotes loaded`}
          </div>
        </Quotes>
      )}
    </main>
  );
};

export default App;
