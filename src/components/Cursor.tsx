import {motion} from "framer-motion";

const Cursor = () => {
    return (
        <motion.span
            aria-hidden="true"
            className="inline-block w-0.5 h-6 bg-yellow-400 ml-0.5 align-middle"
            initial={{opacity: 1}}
            animate={{opacity: 0}}
            exit={{opacity: 1}}
            transition={{duration: 1, repeat: Infinity, ease: "easeInOut"}}
        />
    )
}

export default Cursor;