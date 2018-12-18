import { useState, useEffect } from "react";

/**
 * Inspired by nprogress - returns an incrementing value between 0 and 1, for realistic loading indicators
 */
const usePretendProgress = () => {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(
    () => {
      let interval;
      if (active) {
        interval = setInterval(() => setProgress(nextVal), 200);
      }
      return () => clearInterval(interval);
    },
    [active]
  );

  const start = () => setActive(true);
  const stop = () => {
    setActive(false);
    setProgress(0);
  };

  return { progress, active, start, stop };
};

export default usePretendProgress;

function clamp(n, min, max) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

function nextVal(current: number): number {
  let step;
  if (current >= 0 && current < 0.2) {
    step = 0.1;
  } else if (current >= 0.2 && current < 0.5) {
    step = 0.04;
  } else if (current >= 0.5 && current < 0.8) {
    step = 0.02;
  } else if (current >= 0.8 && current < 0.99) {
    step = 0.005;
  } else {
    step = 0;
  }
  return clamp(current + step, 0, 0.994);
}
