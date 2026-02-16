import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '../../context/authStore';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated, logout } = useAuthStore();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Collaborate', path: '/collaborate' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-black gradient-text tracking-tighter">
                        ZENVYX
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-white ${location.pathname === link.path ? 'text-white' : 'text-text-secondary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-8 pl-8 border-l border-white/10">
                                <Link
                                    to="/admin"
                                    className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-blue hover:text-white transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all"
                                >
                                    LOGOUT
                                </button>
                            </div>
                        ) : (
                            <Link to="/collaborate">
                                <button className="px-8 py-3 bg-white text-dark-bg rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-accent-blue hover:text-white transition-all shadow-xl shadow-white/5">
                                    GET STARTED
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden absolute top-full left-6 right-6 mt-4 glass-card rounded-[32px] border border-white/10 overflow-hidden"
                        >
                            <div className="p-8 space-y-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`block text-xs font-black uppercase tracking-[0.2em] py-2 transition-colors ${location.pathname === link.path ? 'text-accent-blue' : 'text-text-secondary'
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="pt-6 border-t border-white/10 space-y-6">
                                    {isAuthenticated ? (
                                        <>
                                            <Link
                                                to="/admin"
                                                className="block text-accent-blue text-xs font-black uppercase tracking-[0.2em]"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                ADMIN DASHBOARD
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsOpen(false);
                                                }}
                                                className="w-full px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em]"
                                            >
                                                LOGOUT
                                            </button>
                                        </>
                                    ) : (
                                        <Link to="/collaborate" onClick={() => setIsOpen(false)}>
                                            <button className="w-full px-8 py-4 bg-white text-dark-bg rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-white/5">
                                                GET STARTED
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
