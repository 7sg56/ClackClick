import {motion} from "framer-motion";

const Cursor = () => {
    return (
        <motion.div
            aria-hidden="true"
            className="inline-block w-0.75 h-7 bg-yellow-400 ml-1"
            initial={{opacity: 1}}
            animate={{opacity: 0}}
            exit={{opacity: 1}}
            transition={{duration: 1, repeat: Infinity, ease: "easeInOut"}}
        />
    )
}

export default Cursor;