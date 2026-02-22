import { useTheme } from '../contexts/ThemeContext';
import { formatPercentage } from '../utils/helpers';

const Results = ({
    errors,
    accuracy,
    wpm,
    total, 
    className = "",
} : {
    errors: number;
    accuracy: number;
    wpm: number;
    total: number;
    className?: string;
}) => {
    const { theme } = useTheme();

    return (
    <>
        <div className={`flex flex-col items-center ${theme === 'light' ? 'text-yellow-500' : 'text-yellow-400'} ${className}`}>
            <h2 className={`text-2xl font-semibold mb-4 ${theme === 'light' ? 'text-yellow-500' : 'text-yellow-500'}`}>Results</h2>
            <div className="flex flex-wrap justify-center items-center gap-6">
                <p className="text-xl font-semibold">Accuracy: {formatPercentage(accuracy)}</p>
                <div className={`w-1 h-6 ${theme === 'light' ? 'bg-slate-400' : 'bg-slate-500'}`}></div>
                <p className="text-xl font-semibold">WPM: {wpm}</p>
                <div className={`w-1 h-6 ${theme === 'light' ? 'bg-slate-400' : 'bg-slate-500'}`}></div>
                <p className={`text-xl font-semibold ${theme === 'light' ? 'text-red-500' : 'text-red-500'}`}>Errors: {errors}</p>
                <div className={`w-1 h-6 ${theme === 'light' ? 'bg-slate-400' : 'bg-slate-500'}`}></div>
                <p className="text-xl font-semibold">Total words: {total}</p>
            </div>
        </div>
    </>
    )
}

export default Results;