import { useState, useCallback, useEffect, useMemo } from "react";
import useWords from "./useWords";
import useTimer from "./useTimer";
import useTypings from "./useTypings";
import { countErrors, calculateAccuracyPercentage, calculateWPM, countWords } from "../utils/helpers";

export type State = "start" | "run" | "finish";

const WORDS_COUNT = 500; // Generate many words for infinite scrolling

const useEngine = () => {
    const [state, setState] = useState<State>("start");
    const [selectedTime, setSelectedTime] = useState(30);
    
    const { words, updateWords } = useWords(WORDS_COUNT);
    const { timeLeft, startCountdown, resetCountdown } = useTimer(selectedTime);
    const { typed, cursor, clearTyped, resetTotalTyped } = useTypings(state !== "finish");
    
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
    }, [isStarting, startCountdown]);

    // when the countdown reaches 0, finish the test
    useEffect(() => {
        if(timeLeft === 0 && state === "run") {
            setState("finish");
            sumErrors();
        }
    }, [timeLeft, state, sumErrors]);

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
        const elapsedTime = selectedTime - timeLeft;
        return calculateWPM(typed, elapsedTime);
    }, [typed, timeLeft, selectedTime]);

    const handleTimeChange = useCallback((time: number) => {
        setSelectedTime(time);
        setState("start");
        setErrors(0);
        clearTyped();
        resetTotalTyped();
        resetCountdown();
        updateWords();
    }, [clearTyped, resetTotalTyped, resetCountdown, updateWords]);

    // Update timer when selectedTime changes
    useEffect(() => {
        if (state === "start") {
            resetCountdown();
        }
    }, [selectedTime, state, resetCountdown]);

    return { 
        state, 
        words, 
        timeLeft, 
        typed, 
        cursor,
        restart, 
        errors, 
        accuracy, 
        wpm, 
        totalWords,
        selectedTime,
        handleTimeChange
    }
};

export default useEngine;