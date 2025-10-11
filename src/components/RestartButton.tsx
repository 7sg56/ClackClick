import { MdRefresh } from "react-icons/md";
import { useRef } from "react";

const RestartButton = ({
    onRestart: handleRestart,
    className = "",
}: {
    onRestart: () => void;
    className?: string;
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <button
            ref={buttonRef}
            onClick={() => {
                buttonRef.current?.blur();
                handleRestart();
            }}
            className={`block rounded px-8 py-2 hover:bg-slate-700/50 ${className}`}
        >
            <MdRefresh className="w-6 h-6"/>
        </button>
    )
}

export default RestartButton;