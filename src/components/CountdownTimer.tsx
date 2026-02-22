import { useTheme } from '../contexts/ThemeContext';

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

export default CountdownTimer;
