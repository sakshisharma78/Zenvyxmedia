import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { leadService } from '../services';
import { pageTransition } from '../animations/variants';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await leadService.create({
                ...formData,
                role: 'Other',
                serviceInterested: 'General Inquiry',
            });

            toast.success('Transmission received. We will respond shortly.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast.error('Transmission failed. Recalibrate and try again.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
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
                    className="text-left mb-20 max-w-2xl"
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">
                        CONNECT <span className="gradient-text">NOW</span>
                    </h1>
                    <p className="text-xl text-text-secondary leading-relaxed">
                        Direct line to the Zenvyx elite team. For serious inquiries only.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4"
                    >
                        <div className="bg-dark-card border border-white/5 p-8 rounded-[32px] hover:border-accent-blue/50 transition-all group">
                            <div className="w-12 h-12 bg-accent-blue/10 rounded-2xl flex items-center justify-center text-accent-blue mb-6 group-hover:scale-110 transition-transform">
                                <Mail size={24} />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2">Email</h3>
                            <a href="mailto:zenvyxmedia@gmail.com" className="text-2xl font-bold text-white hover:text-accent-blue transition-colors break-all">
                                zenvyxmedia@gmail.com
                            </a>
                        </div>

                        <div className="bg-dark-card border border-white/5 p-8 rounded-[32px] hover:border-accent-violet/50 transition-all group">
                            <div className="w-12 h-12 bg-accent-violet/10 rounded-2xl flex items-center justify-center text-accent-violet mb-6 group-hover:scale-110 transition-transform">
                                <Phone size={24} />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2">Phone</h3>
                            <a href="tel:+918272038310" className="text-2xl font-bold text-white hover:text-accent-violet transition-colors">
                                +91 82720 38310
                            </a>
                        </div>

                        <div className="bg-dark-card border border-white/5 p-8 rounded-[32px] hover:border-accent-blue/50 transition-all group md:col-span-2 lg:col-span-1">
                            <div className="w-12 h-12 bg-accent-blue/10 rounded-2xl flex items-center justify-center text-accent-blue mb-6 group-hover:scale-110 transition-transform">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2">HQ</h3>
                            <p className="text-2xl font-bold text-white">
                                Mathura, Uttar Pradesh, India
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-dark-card border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl shadow-accent-blue/5"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary pl-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-dark-bg border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-accent-blue outline-none transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary pl-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-dark-bg border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-accent-blue outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary pl-2">Inquiry</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full bg-dark-bg border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-accent-blue outline-none transition-all resize-none"
                                    placeholder="Tell us about your project"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-6 bg-white text-dark-bg rounded-full text-xs font-black tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-accent-blue hover:text-white transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? 'SENDING...' : 'TRANSMIT MESSAGE'}
                                {!isSubmitting && <ArrowRight size={16} />}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
