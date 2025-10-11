import { useEffect, useRef } from 'react';

const useAutoScroll = (cursor: number, isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const lineHeight = 48; // 3xl text with leading-relaxed ≈ 48px
    const containerHeight = container.clientHeight;
    const totalHeight = container.scrollHeight;
    
    // Calculate which line the cursor is on
    const currentLine = Math.floor(cursor / 80); // Approximate characters per line
    const linesVisible = Math.floor(containerHeight / lineHeight);
    
    // Calculate scroll position to keep cursor in the middle of visible area
    const targetScrollTop = Math.max(0, (currentLine - Math.floor(linesVisible / 2)) * lineHeight);
    
    // Only scroll if we need to move the view
    const currentScrollTop = container.scrollTop;
    const scrollThreshold = lineHeight; // Only scroll if we need to move more than one line
    
    if (Math.abs(targetScrollTop - currentScrollTop) > scrollThreshold) {
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  }, [cursor, isActive]);

  return containerRef;
};

export default useAutoScroll;
