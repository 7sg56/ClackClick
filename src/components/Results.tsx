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
    return (
    <>
        <div className={`flex flex-col items-center text-yellow-400 ${className}`}>
            <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Results</h2>
            <div className="flex flex-wrap justify-center items-center gap-6">
                <p className="text-xl font-semibold">Accuracy: {accuracy.toFixed(2)}%</p>
                <div className="w-1 h-6 bg-slate-500"></div>
                <p className="text-xl font-semibold">WPM: {wpm}</p>
                <div className="w-1 h-6 bg-slate-500"></div>
                <p className="text-xl font-semibold text-red-500">Errors: {errors}</p>
                <div className="w-1 h-6 bg-slate-500"></div>
                <p className="text-xl font-semibold">Total words: {total}</p>
            </div>
        </div>
    </>
    )
}

export default Results;