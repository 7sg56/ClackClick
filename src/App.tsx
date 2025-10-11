import Footer from './components/Footer';
import Header from './components/Header';
import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTyping from './components/UserTyping';
import useAutoScroll from './hooks/useAutoScroll';
import useEngine from './hooks/useEngine';


const App = () => {
  const { state, words, timeLeft, typed, restart, errors, accuracy, wpm, totalWords } = useEngine();
  const containerRef = useAutoScroll(typed.length, state === "run");
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <CountdownTimer timeLeft={timeLeft} />
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

const WordsContainer = ({children, containerRef} : {children: React.ReactNode, containerRef: React.RefObject<HTMLDivElement>}) => {
  return (
    <div className="relative max-w-4xl mx-auto mt-3 text-3xl leading-relaxed break-all overflow-hidden h-58">
      <div ref={containerRef} className="absolute inset-0 overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  )
}

const GeneratedWords = ({words} : {words: string}) => {
  return <div className=" text-slate-500">{words}</div>
}

const CountdownTimer = ({timeLeft} : {timeLeft: number}) => {
  return <h2 className={`font-medium text-center ${timeLeft === 0 ? 'text-red-500' : 'text-yellow-400'}`}> Time: {timeLeft}</h2>
}



export default App;