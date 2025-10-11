const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-[75vw] mx-auto flex items-center justify-between py-4 border-t border-slate-600 bg-slate-800">
      <div className="flex flex-col">
        <p className="text-slate-400 text-sm">
          Built by{' '}
          <a 
            href="https://github.com/7sg56" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            7sg56
          </a>
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-slate-400 text-sm">
          <span className="text-yellow-400">2025</span>{' '}
          <span className="text-red-500">ClickClack</span>
        </p>
      </div>
      
      
    </footer>
  );
};

export default Footer;
