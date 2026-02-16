import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Services from '../components/Services';
import { pageTransition } from '../animations/variants';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import { useEffect, useState } from 'react';
import { portfolioService, testimonialService } from '../services';
import { Star } from 'lucide-react';

const DEFAULT_PREVIEW = [
    {
        _id: 'p1',
        title: 'Cyberpunk Brand Identity',
        category: 'Graphic Design',
        thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: 'p2',
        title: 'Modern Creator OS',
        category: 'Web Development',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    },
    {
        _id: 'p3',
        title: 'Cinematic Travel Vlog',
        category: 'Video Editing',
        thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    }
];

const Home = () => {
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        portfolioService.getAll({ limit: 3 }).then(({ portfolios }) => {
            setPortfolioItems(portfolios && portfolios.length > 0 ? portfolios : DEFAULT_PREVIEW);
        }).catch(() => setPortfolioItems(DEFAULT_PREVIEW));

        testimonialService.getFeatured().then((data) => {
            setTestimonials(data || []);
        }).catch(console.error);
    }, []);

    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-dark-bg"
        >
            <Hero />
            <Services />

            {/* Portfolio Preview Section */}
            <section className="py-32 bg-dark-card border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                    >
                        <div className="max-w-xl">
                            <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white">
                                SELECTED <span className="gradient-text">WORKS</span>
                            </h2>
                            <p className="text-xl text-text-secondary leading-relaxed">
                                A curated preview of high-performance content and digital experiences designed for the modern era.
                            </p>
                        </div>
                        <Link to="/portfolio" className="hidden md:block">
                            <button className="px-8 py-4 glass-card border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
                                VIEW ALL PROJECTS
                            </button>
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {portfolioItems.slice(0, 3).map((item, index) => (
                            <motion.div
                                key={item._id || index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="relative overflow-hidden rounded-[32px] aspect-[4/5] bg-dark-bg border border-white/5">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="text-accent-blue text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">{item.category}</span>
                                            <h3 className="text-2xl font-bold text-white leading-tight">{item.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center md:hidden">
                        <Link to="/portfolio">
                            <button className="w-full px-8 py-5 glass-card border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-white">
                                VIEW ALL PROJECTS
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Collaboration CTA Section */}
            <section className="py-32 relative overflow-hidden bg-dark-bg">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-violet/5 animate-pulse" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-dark-card border border-white/5 rounded-[40px] p-8 md:p-12 lg:p-16 hover:border-accent-blue/50 transition-all duration-500 group"
                        >
                            <div className="w-20 h-20 bg-accent-blue/10 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:rotate-12 transition-transform">🎨</div>
                            <h3 className="text-4xl lg:text-5xl font-black mb-6 tracking-tighter text-white">FOR CREATORS</h3>
                            <p className="text-xl text-text-secondary mb-10 leading-relaxed">
                                Professional editing and design stack to turn your influence into an absolute powerhouse business.
                            </p>
                            <Link to="/collaborate?tab=creator">
                                <button className="w-full sm:w-auto px-10 py-5 bg-white text-dark-bg rounded-full text-[10px] font-black tracking-[0.2em] hover:bg-accent-blue hover:text-white transition-all duration-300">
                                    START CREATING
                                </button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-dark-card border border-white/5 rounded-[40px] p-8 md:p-12 lg:p-16 hover:border-accent-violet/50 transition-all duration-500 group"
                        >
                            <div className="w-20 h-20 bg-accent-violet/10 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:rotate-12 transition-transform">🚀</div>
                            <h3 className="text-4xl lg:text-5xl font-black mb-6 tracking-tighter text-white">FOR BRANDS</h3>
                            <p className="text-xl text-text-secondary mb-10 leading-relaxed">
                                Connect with top-tier creators through data-driven partnerships that deliver exceptional results.
                            </p>
                            <Link to="/collaborate?tab=brand">
                                <button className="w-full sm:w-auto px-10 py-5 bg-accent-violet text-white rounded-full text-[10px] font-black tracking-[0.2em] hover:bg-accent-blue transition-all duration-300">
                                    PARTNER WITH US
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            {testimonials.length > 0 && (
                <section className="py-24 bg-dark-card border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-left md:text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white">
                                ECHOES OF <span className="gradient-text">SUCCESS</span>
                            </h2>
                            <p className="text-xl text-text-secondary max-w-2xl md:mx-auto">
                                The results of our collaborations speak louder than words.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.slice(0, 3).map((testimonial, index) => (
                                <motion.div
                                    key={testimonial._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-dark-bg border border-white/5 p-10 rounded-[40px] relative overflow-hidden group"
                                >
                                    <div className="flex mb-6 text-accent-blue">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="fill-current" size={16} />
                                        ))}
                                    </div>
                                    <p className="text-text-secondary mb-8 text-lg leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                                        "{testimonial.feedback}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center font-black text-white text-xs">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-sm">{testimonial.name}</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-40">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Final CTA Section */}
            <section className="py-40 relative overflow-hidden bg-dark-bg">
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left md:text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter text-white leading-[0.9]">
                            READY TO <span className="gradient-text">SCALE?</span>
                        </h2>
                        <p className="text-xl md:text-3xl text-text-secondary mb-16 max-w-3xl md:mx-auto leading-relaxed">
                            Join elite creators who refuse to settle for average. Let's build your dominance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-start md:justify-center">
                            <Link to="/collaborate">
                                <button className="px-12 py-6 bg-white text-dark-bg rounded-full text-xs font-black tracking-[0.2em] hover:bg-accent-blue hover:text-white transition-all shadow-2xl">
                                    START YOUR PROJECT
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
