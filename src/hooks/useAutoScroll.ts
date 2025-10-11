import { useEffect, useRef } from 'react';

const useAutoScroll = (cursor: number, isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const lineHeight = 48; // 3xl text with leading-relaxed ≈ 48px
    const currentLine = Math.floor(cursor / 80); // Approximate characters per line
    const scrollTop = currentLine * lineHeight;

    container.scrollTo({
      top: scrollTop,
      behavior: 'smooth'
    });
  }, [cursor, isActive]);

  return containerRef;
};

export default useAutoScroll;
