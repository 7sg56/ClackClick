import Footer from './components/Footer';
import Header from './components/Header';
import MobileOverlay from './components/MobileOverlay';
import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTyping from './components/UserTyping';
import useAutoScroll from './hooks/useAutoScroll';
import useEngine from './hooks/useEngine';
import { useTheme } from './contexts/ThemeContext';


const App = () => {
  const { state, words, timeLeft, typed, restart, errors, accuracy, wpm, totalWords, selectedTime, handleTimeChange } = useEngine();
  const containerRef = useAutoScroll(typed.length, state === "run");
  return (
    <>
      <MobileOverlay />
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <CountdownTimer 
            timeLeft={timeLeft} 
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
            state={state}
          />
          <WordsContainer containerRef={containerRef}>
            <GeneratedWords words={words} />
            <UserTyping userInput={typed} words={words} className="absolute inset-0" />
          </WordsContainer>
          <RestartButton 
            onRestart={restart} 
            className="text-slate-500 mx-auto mt-10"/>
          {timeLeft === 0 && (
            <Results
              errors={errors}
              accuracy={accuracy}
              wpm={wpm}
              total={totalWords}
              className="text-slate-500 mx-auto mt-10"/>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

const WordsContainer = ({children, containerRef} : {children: React.ReactNode, containerRef: React.RefObject<HTMLDivElement | null>}) => {
  return (
    <div className="relative max-w-4xl mx-auto mt-3 text-3xl leading-relaxed break-all overflow-hidden h-80">
      <div ref={containerRef} className="absolute inset-0 overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  )
}

const GeneratedWords = ({words} : {words: string}) => {
  return <div className=" text-slate-500">{words}</div>
}


const CountdownTimer = ({ 
  timeLeft, 
  selectedTime, 
  onTimeChange, 
  state 
}: { 
  timeLeft: number; 
  selectedTime: number; 
  onTimeChange: (time: number) => void; 
  state: string;
}) => {
  const { theme } = useTheme();
  const timeOptions = [30, 60];
  const currentIndex = timeOptions.indexOf(selectedTime);

  const handleSliderChange = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex > 0) {
      onTimeChange(timeOptions[currentIndex - 1]);
    } else if (direction === 'right' && currentIndex < timeOptions.length - 1) {
      onTimeChange(timeOptions[currentIndex + 1]);
    }
  };

  if (state === "start") {
    return (
      <div className="flex items-center justify-center gap-4">
        <button 
          onClick={() => handleSliderChange('left')}
        disabled={currentIndex === 0}
        className={`disabled:opacity-30 disabled:cursor-not-allowed text-2xl font-bold ${
          theme === 'light' 
            ? 'text-yellow-500 hover:text-yellow-400' 
            : 'text-yellow-400 hover:text-yellow-300'
        }`}
      >
        ‹
      </button>
      <h2 className={`font-medium text-lg ${
        theme === 'light' ? 'text-yellow-500' : 'text-yellow-400'
      }`}>
        Time: {selectedTime}
      </h2>
      <button 
        onClick={() => handleSliderChange('right')}
        disabled={currentIndex === timeOptions.length - 1}
        className={`disabled:opacity-30 disabled:cursor-not-allowed text-2xl font-bold ${
          theme === 'light' 
            ? 'text-yellow-500 hover:text-yellow-400' 
            : 'text-yellow-400 hover:text-yellow-300'
        }`}
      >
        ›
      </button>
    </div>
  );
}

  return (
    <h2 className={`font-medium text-center text-lg ${
      timeLeft === 0 
        ? (theme === 'light' ? 'text-red-500' : 'text-red-500')
        : (theme === 'light' ? 'text-yellow-500' : 'text-yellow-400')
    }`}>
      Time: {Math.floor(timeLeft)}
    </h2>
  );
}



export default App;