import { useScrollProgress } from '../../hooks';

const ScrollProgress = () => {
    const scrollProgress = useScrollProgress();

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-dark-border">
            <div
                className="h-full bg-gradient-to-r from-accent-blue to-accent-violet transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
};

export default ScrollProgress;
