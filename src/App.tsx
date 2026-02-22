import Footer from './components/Footer';
import Header from './components/Header';
import MobileOverlay from './components/MobileOverlay';
import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTyping from './components/UserTyping';
import useAutoScroll from './hooks/useAutoScroll';
import useEngine from './hooks/useEngine';
import WordsContainer from './components/WordsContainer';
import GeneratedWords from './components/GeneratedWords';
import CountdownTimer from './components/CountdownTimer';


const App = () => {
  const { state, words, timeLeft, typed, cursor, restart, errors, accuracy, wpm, totalWords, selectedTime, handleTimeChange } = useEngine();
  const containerRef = useAutoScroll(cursor, state === "run");
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

export default App;
