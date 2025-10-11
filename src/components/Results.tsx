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
        <div className={`flex flex-col items-center text-yellow-400 space-y-2 ${className}`}>
            
            <p className="text-xl font-semibold">Accuracy: {accuracy}</p>
            <p className="text-xl font-semibold">WPM: {wpm}</p>
            <p className="text-xl font-semibold text-red-500">Errors: {errors}</p>
            <p className="text-xl font-semibold">Total words: {total}</p>
        </div>
    </>
    )
}

export default Results;