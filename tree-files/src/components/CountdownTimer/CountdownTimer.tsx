
import { useState } from 'react';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';

export const CountdownTimer = () => {
  const [inputValue, setInputValue] = useState('');
  const { countdown, isRunning, start, stop, resume, reset } = useCountdownTimer();

  const handleInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^\d*$/.test(value)) return;
    setInputValue(value);
  };

  const handleStartClick = () => {
    const num = parseInt(inputValue, 10);
    if (isNaN(num) || num <= 0) {
      alert('Please enter a positive number');
      return;
    }
    start(num);
  };

  return (
    <div className="app3_body">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter seconds"
        className="border px-3 py-2 rounded"
      />

      <div className="flex gap-2">
        <button onClick={handleStartClick} disabled={isRunning} className="bg-green-500 text-white px-4 py-2 rounded">
          Start
        </button>
        <button onClick={stop} disabled={!isRunning} className="bg-red-500 text-white px-4 py-2 rounded">
          Stop
        </button>
        <button onClick={resume} disabled={isRunning || countdown === 0} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Resume
        </button>
        <button onClick={()=> {reset(); setInputValue("")}} disabled={countdown === 0 && !isRunning} className="bg-blue-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>

      <div className="text-4xl font-bold">{countdown}</div>
    </div>
  );
};
