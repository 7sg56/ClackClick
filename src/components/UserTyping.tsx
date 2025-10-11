import Cursor from "./Cursor";

const Character = ({ char }: { char: string }) => {
  return <span className="text-yellow-400">{char}</span>;
};

const UserTyping = ({
  userInput,
  className,
}: {
  userInput: string;
  className?: string;
}) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return <Character key={`${char}_${index}`} char={char} />;
      })}
      <Cursor />
    </div>
  );
};

export default UserTyping;