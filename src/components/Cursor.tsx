import {motion} from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const Cursor = () => {
    const { theme } = useTheme();
    
    return (
        <motion.span
            aria-hidden="true"
            className={`inline-block w-1 h-6 ml-0.5 align-middle ${
                theme === 'light' ? 'bg-yellow-500' : 'bg-yellow-400'
            }`}
            initial={{opacity: 1}}
            animate={{opacity: 0}}
            exit={{opacity: 1}}
            transition={{duration: 1, repeat: Infinity, ease: "easeInOut"}}
        />
    )
}

export default Cursor;