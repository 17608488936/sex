import { useEffect, useRef, useState } from "react";

// 默认时间
export const initializationTime = 60;

/**
 * 倒计时
 * @param _time 默认时间
 * @returns
 */

export const useCountdown: () => [number, (step?: number) => void] = (
  _time = initializationTime
) => {
  const [time, setTime] = useState(_time);
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      timerId.current !== null && clearInterval(timerId.current);
    };
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timerId.current!);
      timerId.current = null;
      setTime(initializationTime);
    }
  }, [time]);

  const setTimeFn = (step = 1) => {
    if (time === _time) {
      setTime((prev) => prev - step);

      timerId.current = setInterval(() => {
        setTime((prev) => prev - step);
      }, 1000) as unknown as number;
    }
  };
  return [time, setTimeFn];
};
