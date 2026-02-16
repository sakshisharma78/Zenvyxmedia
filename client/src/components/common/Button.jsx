import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    ...props
}) => {
    const baseClasses = 'px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-center flex items-center justify-center';

    const variants = {
        primary: 'bg-white text-dark-bg hover:bg-accent-blue hover:text-white shadow-xl shadow-white/5',
        secondary: 'bg-accent-violet text-white hover:bg-accent-blue shadow-xl shadow-accent-violet/10',
        outline: 'border border-white/10 text-white hover:bg-white/5 backdrop-blur-sm',
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
