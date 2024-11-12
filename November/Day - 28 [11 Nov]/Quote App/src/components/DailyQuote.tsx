import React from 'react';
import { DailyQuoteProps } from '../utils/types';



const DailyQuote: React.FC<DailyQuoteProps> = ({ dailyQuote, isLoading }) => {
  if (isLoading) {
    return <div className="text-center text-xl text-blue-600">Loading...</div>;
  }

  return (
    dailyQuote && (
      <div className="p-4 mb-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
        <p className="text-lg font-serif">"{dailyQuote.content}"</p>
        <p className="text-right text-sm text-gray-600">- {dailyQuote.author}</p>
      </div>
    )
  );
};

export default DailyQuote;