import Cursor from "./Cursor";
import { useTheme } from "../contexts/ThemeContext";

const Character = ({
    actual, 
    expected
}: {
    actual: string;
    expected: string;
}) => {
    const { theme } = useTheme();
    const isCorrect = actual === expected;
    const isWhitespace = expected === " ";
       
    return (
        <span
            className={`${
                !isCorrect && !isWhitespace ? "text-red-500" :
                isCorrect && !isWhitespace ? (theme === 'light' ? "text-yellow-500" : "text-yellow-400") :
                !isCorrect && isWhitespace ? "bg-red-500/50" : ""
            }`}
        >
            {expected}
        </span>
    );
};

const UserTyping = ({
  userInput,
  className,
  words
}: {
  userInput: string;
  words: string;
  className?: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return (
            <Character 
             key={`${char}_${index}`}
             actual={char}
             expected={words[index]}
             />
        );
      })}
      <Cursor />
    </div>
  );
};

export default UserTyping;