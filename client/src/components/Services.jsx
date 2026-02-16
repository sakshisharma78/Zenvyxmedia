import { motion } from 'framer-motion';
import { Scissors, Image, Code, Handshake, Users, ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '../animations/variants';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            icon: Scissors,
            title: 'Video Editing',
            description: 'Cinematic edits that captivate audiences and drive engagement. From YouTube to TikTok, we craft visual stories.',
            features: ['Color Grading', 'Motion Graphics', 'Sound Design'],
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Image,
            title: 'Thumbnail & Design',
            description: 'Eye-catching designs that stop the scroll. Data-driven thumbnails with proven CTR improvements.',
            features: ['Custom Thumbnails', 'Brand Assets', 'Social Graphics'],
            color: 'from-violet-500 to-purple-500',
        },
        {
            icon: Code,
            title: 'Web Development',
            description: 'Modern, high-performance websites that establish your digital presence and drive conversions.',
            features: ['Custom Websites', 'E-commerce', 'Landing Pages'],
            color: 'from-cyan-500 to-blue-500',
        },
        {
            icon: Handshake,
            title: 'Brand Deals',
            description: 'Strategic partnerships that align with your values. We connect you with brands that match your audience.',
            features: ['Deal Negotiation', 'Contract Review', 'Strategy'],
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Users,
            title: 'Creator Network',
            description: 'Join an elite community of creators. Collaborate, learn, and grow with like-minded professionals.',
            features: ['Exclusive Network', 'Collaboration', 'Resource Sharing'],
            color: 'from-pink-500 to-rose-500',
        },
    ];

    return (
        <section className="py-24 bg-dark-bg relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-left md:text-center mb-20"
                >
                    <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none text-white">
                        OUR <span className="gradient-text">SERVICES</span>
                    </h2>
                    <p className="text-xl text-text-secondary max-w-2xl md:mx-auto leading-relaxed">
                        Precision-engineered solutions to scale influence and build absolute authority in the creator economy.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                            className="bg-dark-card border border-white/5 rounded-[32px] p-8 hover:border-accent-blue/50 transition-all duration-500 group flex flex-col h-full"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                                <service.icon className="text-white" size={28} />
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white">
                                {service.title}
                            </h3>

                            <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-grow">
                                {service.description}
                            </p>

                            <div className="pt-8 border-t border-white/5">
                                <ul className="grid grid-cols-1 gap-3 mb-8">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">
                                            <div className="w-1 h-1 rounded-full bg-accent-blue mr-3" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to="/collaborate"
                                    className="inline-flex items-center text-xs font-black tracking-widest text-accent-blue hover:text-white transition-colors group-hover:translate-x-1 transition-transform"
                                >
                                    LEARN MORE
                                    <ArrowRight className="ml-2" size={14} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
