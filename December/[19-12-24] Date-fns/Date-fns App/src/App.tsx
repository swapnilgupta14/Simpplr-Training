import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import {
  getWeek,
  set,
  eachDayOfInterval,
  getDaysInMonth,
  nextDay,
  isLeapYear,
  roundToNearestMinutes,
  isSameDay,
  endOfMonth,
  startOfMonth,
  addBusinessDays,
  lastDayOfWeek,
  isWeekend,
  getQuarter,
  differenceInMilliseconds,
  endOfDay
} from 'date-fns';
import ClosetTo from "./component/ClosestTo";

interface DateMethodResult {
  method: string;
  result: string;
}

const App = () => {
  const [results, setResults] = useState<DateMethodResult[]>([]);
  const now = new Date();

  const runExamples = () => {
    const examples: DateMethodResult[] = [
      {
        method: 'getWeek()',
        result: `Week number of current date: ${getWeek(now)}`
      },
      {
        method: 'set()',
        result: `Set to specific time: ${set(now, { hours: 12, minutes: 0 }).toLocaleString()}`
      },
      {
        method: 'eachDayOfInterval()',
        result: `Days in next 3 days: ${eachDayOfInterval({
          start: now,
          end: addBusinessDays(now, 3)
        }).map(date => date.toLocaleDateString()).join(', ')}`
      },
      {
        method: 'getDaysInMonth()',
        result: `Days in current month: ${getDaysInMonth(now)}`
      },
      {
        method: 'nextDay()',
        result: `Next Monday: ${nextDay(now, 1).toLocaleDateString()}`
      },
      {
        method: 'isLeapYear()',
        result: `Is current year leap year? ${isLeapYear(now)}`
      },
      {
        method: 'roundToNearestMinutes()',
        result: `Rounded to nearest 15 minutes: ${roundToNearestMinutes(now, { nearestTo: 15 }).toLocaleTimeString()}`
      },
      {
        method: 'isSameDay()',
        result: `Is today same as tomorrow? ${isSameDay(now, addBusinessDays(now, 1))}`
      },
      {
        method: 'endOfMonth()',
        result: `End of current month: ${endOfMonth(now).toLocaleDateString()}`
      },
      {
        method: 'startOfMonth()',
        result: `Start of current month: ${startOfMonth(now).toLocaleDateString()}`
      },
      {
        method: 'addBusinessDays()',
        result: `Date after 5 business days: ${addBusinessDays(now, 5).toLocaleDateString()}`
      },
      {
        method: 'lastDayOfWeek()',
        result: `Last day of current week: ${lastDayOfWeek(now).toLocaleDateString()}`
      },
      {
        method: 'isWeekend()',
        result: `Is today weekend? ${isWeekend(now)}`
      },
      {
        method: 'getQuarter()',
        result: `Current quarter: ${getQuarter(now)}`
      },
      {
        method: 'differenceInMilliseconds()',
        result: `Milliseconds to end of day: ${differenceInMilliseconds(endOfDay(now), now)}`
      }
    ];
    setResults(examples);
  };

  return (
    <div className="max-full m-10 mx-auto p-6 bg-white  rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <CalendarIcon className="h-6 w-6 text-indigo-500" />
          <h1 className="text-2xl font-bold text-gray-900">
            Date Function React App
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

      <ClosetTo/>

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

export default App;