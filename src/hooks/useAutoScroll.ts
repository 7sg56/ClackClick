import { useEffect, useRef } from 'react';

const useAutoScroll = (cursor: number, isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    
    // More accurate approach: use actual DOM measurements
    const lineHeight = 48; // 3xl text with leading-relaxed (text-3xl leading-relaxed)
    const containerHeight = container.clientHeight;
    const linesVisible = Math.floor(containerHeight / lineHeight);
    
    // Calculate current line based on cursor position
    // Estimate characters per line more accurately
    const containerWidth = container.clientWidth;
    const avgCharWidth = 20; // Approximate character width for text-3xl
    const charsPerLine = Math.floor(containerWidth / avgCharWidth);
    const currentLine = Math.floor(cursor / charsPerLine);
    
    // Only scroll if we're approaching the bottom of visible area
    const scrollThreshold = linesVisible - 2; // Start scrolling when 2 lines from bottom
    
    if (currentLine >= scrollThreshold) {
      // Scroll to keep the current line visible with some buffer
      const targetLine = Math.max(0, currentLine - Math.floor(linesVisible / 2));
      const targetScrollTop = targetLine * lineHeight;
      
      // Smooth scroll for better UX
      container.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  }, [cursor, isActive]);

  return containerRef;
};

export default useAutoScroll;