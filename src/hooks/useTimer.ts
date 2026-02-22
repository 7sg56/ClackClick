import { useCallback, useEffect, useRef, useState } from "react";

const useTimer = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startCountdown = useCallback(() => {
    console.log("starting countdown...");
    if (intervalRef.current) return;

    startTimeRef.current = performance.now();

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        const elapsedSeconds = (performance.now() - startTimeRef.current) / 1000;
        const newTimeLeft = Math.max(0, Math.ceil(seconds - elapsedSeconds));

        setTimeLeft(newTimeLeft);

        if (newTimeLeft <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }
    }, 100);
  }, [seconds]);

  const resetCountdown = useCallback(() => {
    console.log("resetting countdown...");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    startTimeRef.current = null;
    setTimeLeft(seconds);
  }, [seconds]);

  // when the countdown reaches 0, clear the countdown interval
  useEffect(() => {
    if (timeLeft <= 0 && intervalRef.current) {
      console.log("clearing timer...");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [timeLeft]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { timeLeft, startCountdown, resetCountdown };
};

export default useTimer;
