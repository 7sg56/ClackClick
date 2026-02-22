import React from 'react';

const WordsContainer = ({children, containerRef} : {children: React.ReactNode, containerRef: React.RefObject<HTMLDivElement | null>}) => {
  return (
    <div className="relative max-w-4xl mx-auto mt-3 text-3xl leading-relaxed break-all overflow-hidden h-48">
      <div ref={containerRef} className="absolute inset-0 overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  )
}

export default WordsContainer;
