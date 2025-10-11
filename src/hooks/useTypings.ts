import { useCallback, useEffect, useRef, useState } from "react";

const isKeyboardCode = (code: string) => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        code === "Backspace" ||
        code === "Space"
    )
}


const useTypings = (enabled: boolean) => {
    const [cursor, setCursor] = useState<number>(0);
    const [typed, setTyped] = useState<string>("");
    const totalTyped = useRef(0);
    
    const keydownHandler = useCallback(
        ({key, code}: KeyboardEvent) => {
            if(!enabled || !isKeyboardCode(code)) return;

            switch (key) {
                case "Backspace":
                    setTyped((prev) => prev.slice(0, -1));
                    setCursor(cursor - 1);
                    totalTyped.current -= 1;
                    break;
                default: 
                    setTyped((prev) => prev + key);
                    setCursor(cursor + 1);
                    totalTyped.current += 1;
                    break;
            }
        }, [cursor, enabled]);

    const clearTyped = useCallback(() => {
        setTyped("");
        setCursor(0);
    }, []);

    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0;
    }, []);

    // attach the keydown event listener to record keystrokes
    useEffect(() => {
        window.addEventListener("keydown", keydownHandler)
        // remove event listener on cleanup
        return () => { 
            window.removeEventListener("keydown", keydownHandler)
        };
    }, [keydownHandler])

    return {
        typed, 
        cursor, 
        clearTyped,
        resetTotalTyped,
        totalTyped: totalTyped.current,
    };
}

export default useTypings;