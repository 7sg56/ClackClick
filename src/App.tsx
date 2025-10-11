import { generate } from 'random-words';
import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTyping from './components/UserTyping';
import useEngine from './hooks/useEngine';

const words = generate(10).join(' ');

const App = () => {
  const { state, words } = useEngine();
  return (
    <>
      <CountdownTimer timeLeft={10} />
      <WordsContainer>
        <GeneratedWords words={words} />
        <UserTyping userInput={words} className="absolute inset-0" />
      </WordsContainer>
      <RestartButton 
        onRestart={() => {}} 
        className="text-slate-500 mx-auto mt-10"/>
      <Results
        errors={0}
        accuracy={100}
        wpm={0}
        total={0}
        className="text-slate-500 mx-auto mt-10"/>
    </>
  );
}

const WordsContainer = ({children} : {children: React.ReactNode}) => {
  return <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all">{children}</div>
}

const GeneratedWords = ({words} : {words: string}) => {
  return <div className=" text-slate-500">{words}</div>
}

const CountdownTimer = ({timeLeft} : {timeLeft: number}) => {
  return <h2 className="text-yellow-400 font-medium "> Time: {timeLeft}</h2>
}



export default App;