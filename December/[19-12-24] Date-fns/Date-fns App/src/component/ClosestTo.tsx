import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import {
  closestTo,
  parseISO,
  format
} from 'date-fns';

interface DateMethodResult {
  method: string;
  result: string;
}

const ClosestTO = () => {
  const [results, setResults] = useState<DateMethodResult[]>([]);

  const runExamples = () => {
    const now = new Date();
    const dateList = [
      parseISO('2024-12-18T14:30:00'),
      parseISO('2024-12-19T09:00:00'),
      parseISO('2024-12-20T16:00:00'),
      parseISO('2024-12-21T10:00:00'),
    ];

    const closestDate = closestTo(now, dateList);

    const examples: DateMethodResult[] = [
      {
        method: 'closestTo()',
        result: `Closest date to now: ${format(
          closestDate!,
          'yyyy-MM-dd HH:mm:ss'
        )}`
      },
      {
        method: 'Current Date',
        result: `Current date and time: ${now.toLocaleString()}`
      },
      {
        method: 'Dates List',
        result: `Available dates: ${dateList
          .map(date => format(date, 'yyyy-MM-dd HH:mm:ss'))
          .join(', ')}`
      }
    ];

    setResults(examples);
  };

  return (
    <div className="max-full m-10 mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <CalendarIcon className="h-6 w-6 text-indigo-500" />
          <h1 className="text-2xl font-bold text-gray-900">
            Date Function React ClosestTO
          </h1>
        </div>
      </div>

      <button
        onClick={runExamples}
        className="mb-8 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg 
                 transition-colors duration-200 flex items-center gap-2 shadow-sm"
      >
        <CalendarIcon className="h-4 w-4" />
        Run Examples
      </button>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700
                     bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-shadow
                     duration-200"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 
                               dark:bg-indigo-900/30 px-2 py-1 rounded">
                  {result.method}
                </code>
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {result.result}
              </p>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
            No results yet
          </h3>
        </div>
      )}
    </div>
  );
};

export default ClosestTO;
