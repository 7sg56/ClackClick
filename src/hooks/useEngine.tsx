import { useState, useEffect } from "react";
import useWords from "./useWords";

export type State = "start" | "run" | "finish";

const WORDS_COUNT = 20;

const useEngine = () => {
    const [state, setState] = useState<State>("start");
    const { words, updateWords } = useWords(WORDS_COUNT);


    return { state, words }
};

export default useEngine;