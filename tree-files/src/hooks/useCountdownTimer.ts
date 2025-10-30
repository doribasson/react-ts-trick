import { useRef, useState } from 'react';

export const useCountdownTimer = () => {
  const [countdown, setCountdown] = useState(0);
  const [initialValue, setInitialValue] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const start = (value: number) => {
    if (value <= 0) return;
    clear();
    setCountdown(value);
    setInitialValue(value);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clear();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = () => {
    clear();
    setIsRunning(false);
  };

  const resume = () => {
    if (countdown > 0) start(countdown);
  };

  const reset = () => {
    clear();
    setCountdown(0);
    setIsRunning(false);
  };

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return { countdown, isRunning, start, stop, resume, reset };
};
