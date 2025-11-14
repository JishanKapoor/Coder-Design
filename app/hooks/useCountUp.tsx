'use client';
import { useEffect, useState, useRef } from 'react';

const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
}

export default function useCountUp({ end, duration = 2, start = 0 }: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / (duration * 1000), 1);
            const easedProgress = easeOutExpo(percentage);
            const currentCount = Math.floor(easedProgress * (end - start) + start);

            setCount(currentCount);

            if (percentage < 1) {
              animationFrameId.current = requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          animationFrameId.current = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [end, start, duration]);

  return { count, ref };
}
