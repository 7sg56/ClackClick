import { useState, useCallback, useEffect, useMemo } from "react";
import useWords from "./useWords";
import useTimer from "./useTimer";
import useTypings from "./useTypings";
import { countErrors, calculateAccuracyPercentage, calculateWPM, countWords } from "../utils/helpers";

export type State = "start" | "run" | "finish";

const WORDS_COUNT = 500; // Generate many words for infinite scrolling
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
    const [state, setState] = useState<State>("start");
    const { words, updateWords } = useWords(WORDS_COUNT);
    const { timeLeft, startCountdown, resetCountdown } = useTimer(COUNTDOWN_SECONDS);
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(state !== "finish");
    
    const [errors, setErrors] = useState(0);
    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, cursor);
        setErrors((prev) => prev + countErrors(typed, wordsReached));
    }, [typed, cursor, words]);

    const isStarting = state === "start" && cursor > 0;

    // when the user starts typing, start the countdown
    useEffect(() => {
        if(isStarting) {
            setState("run");
            startCountdown();
        }
    }, [isStarting, startCountdown, cursor]);

    const isFinishing = cursor === words.length;

    // when the countdown reaches 0, sum the errors
    useEffect(() => {
        if(!timeLeft) {
            setState("finish");
            sumErrors();
        }
    }, [timeLeft, sumErrors]);

    useEffect(() => {
        if(isFinishing) {
            setState("finish");
            sumErrors();
            updateWords();
            clearTyped();
        }
    }, [cursor, words, clearTyped, typed, isFinishing, sumErrors, updateWords])

    const restart = useCallback(() => {
        setState("start");
        setErrors(0);
        clearTyped();
        resetTotalTyped();
        resetCountdown();
        updateWords();
    }, [resetTotalTyped, resetCountdown, updateWords, clearTyped])

    const totalWords = useMemo(() => {
        return countWords(typed);
    }, [typed]);

    const accuracy = useMemo(() => {
        return calculateAccuracyPercentage(errors, totalWords);
    }, [errors, totalWords]);

    const wpm = useMemo(() => {
        const elapsedTime = COUNTDOWN_SECONDS - timeLeft;
        return calculateWPM(typed, elapsedTime);
    }, [typed, timeLeft]);

    return { state, words, timeLeft, typed, restart, errors, accuracy, wpm, totalWords }
};

export default useEngine;