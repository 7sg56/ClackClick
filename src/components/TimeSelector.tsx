interface TimeSelectorProps {
  selectedTime: number;
  onTimeChange: (time: number) => void;
  disabled?: boolean;
}

const TimeSelector = ({ selectedTime, onTimeChange, disabled = false }: TimeSelectorProps) => {
  const timeOptions = [15, 30, 45, 60];

  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-sm font-semibold text-slate-300">Select Time</h3>
      <div className="flex gap-2">
        {timeOptions.map((time) => (
          <button
            key={time}
            onClick={() => !disabled && onTimeChange(time)}
            disabled={disabled}
            className={`px-3 py-1 rounded border transition-all ${
              selectedTime === time
                ? 'bg-yellow-400 text-slate-800 border-yellow-400'
                : 'bg-slate-700 text-slate-300 border-slate-600 hover:border-slate-500'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="text-sm font-bold">{time}s</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
