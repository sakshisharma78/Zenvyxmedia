import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioService } from '../services';
import { pageTransition, staggerContainer, staggerItem } from '../animations/variants';

const DUMMY_PROJECTS = [
    {
        _id: 'd1',
        title: 'Cyberpunk Brand Identity',
        category: 'Graphic Design',
        thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80'
    },
    {
        _id: 'd2',
        title: 'Modern Creator OS',
        category: 'Web Development',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
    },
    {
        _id: 'd3',
        title: 'Cinematic Travel Vlog',
        category: 'Video Editing',
        thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80'
    },
    {
        _id: 'd4',
        title: 'SaaS Dashboard UI',
        category: 'Web Development',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&w=800&q=80'
    },
    {
        _id: 'd5',
        title: 'Esports Tournament Thumbnail',
        category: 'Thumbnails',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
    },
    {
        _id: 'd6',
        title: 'Minimalist Studio Branding',
        category: 'Brand Deals',
        thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
    }
];

const Portfolio = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    const filters = ['All', 'Video Editing', 'Thumbnails', 'Graphic Design', 'Web Development', 'Brand Deals'];

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async (category = '') => {
        setLoading(true);
        try {
            const { portfolios: apiPortfolios } = await portfolioService.getAll({
                ...(category && category !== 'All' ? { category } : {}),
                limit: 50,
            });

            const filteredDummy = DUMMY_PROJECTS.filter(p => category === 'All' || p.category === category);
            const combined = apiPortfolios && apiPortfolios.length > 0 ? [...apiPortfolios, ...filteredDummy] : filteredDummy;

            setPortfolios(combined);
        } catch (error) {
            console.error('Error fetching portfolios:', error);
            setPortfolios(DUMMY_PROJECTS.filter(p => category === 'All' || p.category === category));
        } finally {
            setLoading(false);
        }
    };

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        fetchPortfolios(filter);
    };

    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen pt-32 pb-24 bg-dark-bg"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-left mb-16 max-w-2xl"
                >
                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white">
                        SELECTED <span className="gradient-text">WORKS</span>
                    </h1>
                    <p className="text-xl text-text-secondary leading-relaxed">
                        A curation of elite projects across video editing, design, and digital experiences.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap justify-start gap-3 mb-16">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => handleFilterClick(filter)}
                            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${activeFilter === filter
                                ? 'bg-white text-dark-bg border-white shadow-xl shadow-white/5'
                                : 'bg-dark-card text-text-secondary border-white/5 hover:border-white/20'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Portfolio Grid */}
                <AnimatePresence mode='wait'>
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center items-center min-h-[400px]"
                        >
                            <div className="spinner" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {portfolios.length > 0 ? (
                                portfolios.map((item) => (
                                    <motion.div
                                        key={item._id}
                                        variants={staggerItem}
                                        className="group relative"
                                    >
                                        <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] bg-dark-card border border-white/5">
                                            <motion.img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                loading="lazy"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-dark-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    <span className="text-accent-blue text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">{item.category}</span>
                                                    <h3 className="text-2xl font-bold text-white mb-6 leading-tight">{item.title}</h3>
                                                    <button className="px-8 py-3 bg-white text-dark-bg rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-accent-blue hover:text-white transition-all shadow-xl">
                                                        VIEW PROJECT
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 bg-dark-card rounded-[40px] border border-white/5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-40">
                                        No intelligence data found in this sector.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Portfolio;
