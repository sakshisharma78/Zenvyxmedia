import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-dark-bg z-50 flex items-center justify-center">
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                    className="text-6xl font-bold gradient-text mb-4"
                >
                    ZENVYX
                </motion.div>
                <div className="spinner mx-auto"></div>
            </div>
        </div>
    );
};

export default Loader;
