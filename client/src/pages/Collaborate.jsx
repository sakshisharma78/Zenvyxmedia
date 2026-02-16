import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { leadService } from '../services';
import { pageTransition } from '../animations/variants';
import { Users, Building2, Send } from 'lucide-react';

const Collaborate = () => {
    const [activeTab, setActiveTab] = useState('creator');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        socialLink: '',
        budget: '',
        serviceInterested: '',
        message: '',
    });

    const services = [
        'Video Editing',
        'Thumbnail Design',
        'Web Development',
        'Brand Deals',
        'Creator Network',
        'Full Package',
    ];

    const budgetRanges = [
        'Under $1,000',
        '$1,000 - $5,000',
        '$5,000 - $10,000',
        '$10,000+',
        'Custom',
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await leadService.create({
                ...formData,
                role: activeTab === 'creator' ? 'Creator' : 'Brand',
            });

            toast.success('🎉 Application received! We will be in touch shortly.');
            setFormData({
                name: '',
                email: '',
                socialLink: '',
                budget: '',
                serviceInterested: '',
                message: '',
            });
        } catch (error) {
            toast.error('Submission failed. Please try again.');
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
                    className="text-left mb-16 max-w-2xl"
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white">
                        LET'S <span className="gradient-text">SCALE.</span>
                    </h1>
                    <p className="text-xl text-text-secondary leading-relaxed">
                        Join an elite roster of creators and brands. Select your track and apply below.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab('creator')}
                        className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${activeTab === 'creator'
                            ? 'bg-white text-dark-bg border-white shadow-xl shadow-white/10'
                            : 'bg-dark-card text-text-secondary border-white/5 hover:border-white/20'
                            }`}
                    >
                        <Users size={16} />
                        I'm a Creator
                    </button>
                    <button
                        onClick={() => setActiveTab('brand')}
                        className={`flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${activeTab === 'brand'
                            ? 'bg-white text-dark-bg border-white shadow-xl shadow-white/10'
                            : 'bg-dark-card text-text-secondary border-white/5 hover:border-white/20'
                            }`}
                    >
                        <Building2 size={16} />
                        I'm a Brand
                    </button>
                </div>

                {/* Form */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-card border border-white/5 p-8 md:p-16 rounded-[48px] max-w-4xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary pl-2">Display Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-dark-bg border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-accent-blue outline-none transition-all"
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary pl-2">Communication</label>
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
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary pl-2">
                                {activeTab === 'creator' ? 'PRIMARY CHANNEL / SOCIAL LINK' : 'OFFICIAL WEBSITE / BRAND LINK'}
                            </label>
                            <input
                                type="url"
                                name="socialLink"
                                value={formData.socialLink}
                                onChange={handleChange}
                                className="w-full bg-dark-bg border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-accent-blue outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary pl-2">Mission Requirement</label>
                                <select
                                    name="serviceInterested"
                                    value={formData.serviceInterested}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-dark-bg border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-accent-blue outline-none transition-all appearance-none"
                                >
                                    <option value="">Select a service</option>
                                    {services.map((service) => (
                                        <option key={service} value={service}>
                                            {service}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary pl-2">Investment Range</label>
                                <select
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full bg-dark-bg border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-accent-blue outline-none transition-all appearance-none"
                                >
                                    <option value="">Select budget</option>
                                    {budgetRanges.map((range) => (
                                        <option key={range} value={range}>
                                            {range}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary pl-2">Briefing</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="6"
                                className="w-full bg-dark-bg border border-white/5 rounded-2xl px-6 py-5 text-white focus:border-accent-blue outline-none transition-all resize-none"
                                placeholder="Tell us about your objectives..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-6 bg-white text-dark-bg rounded-full text-[10px] font-black tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-accent-blue hover:text-white transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? 'PROCESSING...' : 'SUBMIT APPLICATION'}
                            {!isSubmitting && <Send size={16} />}
                        </button>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Collaborate;
