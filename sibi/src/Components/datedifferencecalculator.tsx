import React, { useState } from 'react';
import { differenceInDays, differenceInHours } from 'date-fns';

const DateDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('12:00');
  const [endTime, setEndTime] = useState<string>('12:00');
  const [includeAllDays, setIncludeAllDays] = useState(false);
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [result, setResult] = useState<{ days: number; hours: number } | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [selected, setSelected] = useState(false);

  const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'S', 'S'];
  const toggleDaySelection = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };
  const calculateDifference = () => {
    if (!startDate || !endDate) return;
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    let days = differenceInDays(end, start);
    if (includeEndDay) {
      days += 1;
    }
    const hours = differenceInHours(end, start);
    setResult({ days, hours });
  };
  const handleSelectButtonClick = () => {
    setShowCalculator(true);
    setSelected(true);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-3 text-center text-black-400">Days & Time Between Dates</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button className="px-4 py-2 bg-[#DCDCDC] text-gray-400 cursor-not-allowed text-sm" disabled>
          Days Until...
        </button>
        <button className="px-4 py-2 bg-[#DCDCDC] text-gray-400 cursor-not-allowed text-sm" disabled>
          Days From Today
        </button>
        <button
          className="px-4 bg-[#00AA00] text-white text-sm "
          onClick={handleSelectButtonClick}
        >
          Days Between Dates
          {selected && <span className="ml-2 text-white">&#10003;</span>}
        </button>
      </div>
      {showCalculator && (
        <>
          <div className="bg-[#52575C] text-white p-6 rounded-xl max-w-lg mx-auto mt-8 shadow-lg">
            <div className="bg-[#A0A4A8] p-4 rounded-lg mb-4 space-y-4">
              <div>
                <label className="mt-2 flex items-center space-x-2">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none"
                />
                <div className="mt-6 flex items-center space-x-2">
                  <label className="text-sm font-semibold">Start Time: (optional)</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mt-2 flex items-center space-x-2">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none"
                />
                <div className="mt-6 flex items-center space-x-2">
                  <label className="text-sm font-semibold">End Time: (optional)</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold">Include all days?</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAllDays}
                  onChange={() => setIncludeAllDays(!includeAllDays)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-gray-700 rounded-full peer-checked:bg-green-500 peer-focus:outline-none transition-all"></div>
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    includeAllDays ? 'translate-x-4' : ''
                  }`}
                ></span>
              </label>
            </div>
            {!includeAllDays && (
              <div className="mb-4">
                <span className="text-sm font-semibold">Days to include:</span>
                <div className="flex space-x-2 mt-2">
                  {daysOfWeek.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => toggleDaySelection(day)}
                      className={`px-3 py-2 rounded-md border ${
                        selectedDays.includes(day) ? 'bg-[#00AA00] text-white' : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold">Include end day?</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeEndDay}
                  onChange={() => setIncludeEndDay(!includeEndDay)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-gray-700 rounded-full peer-checked:bg-green-500 peer-focus:outline-none transition-all"></div>
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    includeEndDay ? 'translate-x-4' : ''
                  }`}
                ></span>
              </label>
            </div>
            <button
              onClick={calculateDifference}
              className="w-full bg-[#00AA00] text-white p-3 font-semibold hover:bg-green-400 rounded-md transition-all"
            >
              Calculate
            </button>
          </div>
          {result && (
          <div className="bg-gray-900 text-white p-6 rounded-xl max-w-lg mx-auto mt-6 shadow-lg border border-green-400">
            <h2 className="text-lg font-semibold text-green-400 mb-3">Days between dates</h2>
            <div className="p-4 bg-gray-800 rounded-lg mb-4 border border-green-500">
              <p className="text-sm mb-1">From:</p>
              <p className="text-lg font-medium">{new Date(startDate).toLocaleDateString()}</p>
              <p className="text-sm mt-3 mb-1">To:</p>
              <p className="text-lg font-medium">{new Date(endDate).toLocaleDateString()}</p>
            </div> 
            <div className="table w-full bg-gray-700 rounded-lg">
              <div className="table-row-group">
                <div className="table-row border-b border-gray-600">
                  <div className="table-cell p-4 text-lg font-semibold">Days:</div>
                  <div className="table-cell p-4 font-semibold">{result.days} day(s)</div>
                  <div className="table-cell p-4">
                    <button className="text-blue-400 hover:text-blue-300">Copy</button>
                  </div>
                </div>
                <div className="table-row">
                  <div className="table-cell p-4 text-lg font-semibold">OR</div>
                  <div className="table-cell p-4 font-semibold">{result.hours} hours</div>
                  <div className="table-cell p-4">
                    <button className="text-blue-400 hover:text-blue-300">Copy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </>
      )}
    </>
  );
};
export default DateDifferenceCalculator;
