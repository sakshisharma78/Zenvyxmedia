import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';

const Hero = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let time = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const gradient1 = ctx.createRadialGradient(
                canvas.width * 0.3 + Math.sin(time) * 100,
                canvas.height * 0.4 + Math.cos(time) * 100,
                0,
                canvas.width * 0.3 + Math.sin(time) * 100,
                canvas.height * 0.4 + Math.cos(time) * 100,
                canvas.width * 0.6
            );
            gradient1.addColorStop(0, 'rgba(0, 198, 255, 0.1)');
            gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');

            const gradient2 = ctx.createRadialGradient(
                canvas.width * 0.7 + Math.cos(time * 0.8) * 100,
                canvas.height * 0.6 + Math.sin(time * 0.8) * 100,
                0,
                canvas.width * 0.7 + Math.cos(time * 0.8) * 100,
                canvas.height * 0.6 + Math.sin(time * 0.8) * 100,
                canvas.width * 0.6
            );
            gradient2.addColorStop(0, 'rgba(124, 58, 237, 0.1)');
            gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = gradient2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.005;
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark-bg">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full pt-20">
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    className="text-left md:text-center max-w-5xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 mb-8 glass-card rounded-full border border-white/5"
                    >
                        <Sparkles className="text-accent-blue" size={16} />
                        <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-text-secondary">
                            Elite Creative Studio
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-[0.9] tracking-tighter text-white"
                    >
                        SCALE <span className="gradient-text">INFLUENCE.</span><br />
                        BUILD AUTHORITY.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-2xl text-text-secondary mb-12 max-w-2xl md:mx-auto leading-relaxed"
                    >
                        High-end editing, design, and strategic growth for the world's most ambitious creators and brands.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-start md:justify-center items-stretch sm:items-center"
                    >
                        <Link to="/collaborate">
                            <button className="px-10 py-5 bg-white text-dark-bg rounded-full text-xs font-black tracking-widest hover:bg-accent-blue hover:text-white transition-all duration-300 shadow-2xl shadow-white/10">
                                START YOUR PROJECT
                            </button>
                        </Link>
                        <Link to="/portfolio">
                            <button className="px-10 py-5 glass-card border border-white/10 rounded-full text-xs font-black tracking-widest hover:bg-white/5 transition-all duration-300">
                                VIEW OUR WORK
                            </button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-24 max-w-4xl mx-auto border-t border-white/5 pt-12"
                    >
                        {[
                            { value: '500+', label: 'Projects' },
                            { value: '50M+', label: 'Views' },
                            { value: '98%', label: 'Satisfaction' },
                        ].map((stat, index) => (
                            <motion.div key={index} variants={staggerItem} className={`${index === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
                                <div className="text-4xl md:text-6xl font-black gradient-text mb-1 tracking-tighter">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-secondary opacity-40">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
