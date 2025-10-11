import { useState, useEffect } from 'react';

const MobileOverlay = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md text-center border border-slate-600">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">Desktop Recommended</h2>
          <p className="text-slate-300 text-lg">
            This typing speed test is optimized for desktop devices with physical keyboards.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="text-slate-400 text-sm">
            <p className="mb-2">For the best experience, please use:</p>
            <ul className="text-left space-y-1">
              <li>• Desktop or laptop computer</li>
              <li>• Physical keyboard</li>
              <li>• Screen width of 768px or larger</li>
            </ul>
          </div>
          
          <button 
            onClick={() => setIsMobile(false)}
            className="w-full bg-yellow-400 text-slate-800 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileOverlay;
