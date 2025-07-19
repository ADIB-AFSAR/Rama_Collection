// hooks/useTimer.js
import { useState, useEffect, useRef } from 'react';

export default function useTimer(initialSeconds = 900) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    clearInterval(intervalRef.current); // Clear any existing interval
    setSeconds(initialSeconds);
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');

  return { seconds, timeString: `${m}:${s}`, startTimer, stopTimer };
}
