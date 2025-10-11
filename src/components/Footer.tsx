import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`fixed bottom-0 left-0 right-0 w-[75vw] mx-auto flex items-center justify-between py-4 border-t ${
      theme === 'light' 
        ? 'border-slate-300 bg-transparent' 
        : 'border-slate-600 bg-transparent'
    }`}>
      <div className="flex flex-col">
        <p className={`text-sm ${theme === 'light' ? 'text-slate-700' : 'text-slate-400'}`}>
          Built by{' '}
          <a 
            href="https://github.com/7sg56" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`transition-colors ${
              theme === 'light' 
                ? 'text-slate-700 hover:text-slate-900' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            7sg56
          </a>
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className={`text-sm ${theme === 'light' ? 'text-slate-700' : 'text-slate-400'}`}>
          <span className={theme === 'light' ? 'text-yellow-500' : 'text-yellow-400'}>2025</span>{' '}
          <span className={theme === 'light' ? 'text-red-500' : 'text-red-500'}>ClickClack</span>
        </p>
      </div>
      
      
    </footer>
  );
};

export default Footer;
