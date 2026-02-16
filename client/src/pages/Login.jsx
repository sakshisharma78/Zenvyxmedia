import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStore } from '../context/authStore';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { pageTransition } from '../animations/variants';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login({
                email: credentials.email.trim(),
                password: credentials.password
            });
            toast.success('Authentication successful. Welcome Commander.');
            navigate('/admin');
        } catch (error) {
            const message = error.response?.data?.details || error.response?.data?.message || 'Authentication failed. Check your connection.';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen flex items-center justify-center p-6 bg-dark-bg relative overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-violet/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-dark-card border border-white/5 rounded-[48px] p-8 md:p-12 shadow-2xl">
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <ShieldCheck className="text-accent-blue" size={32} />
                        </div>
                        <h1 className="text-4xl font-black gradient-text mb-4 tracking-tighter">GATEWAY</h1>
                        <p className="text-text-secondary text-sm font-medium opacity-60 uppercase tracking-widest">Authorized Access Only</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary pl-2">Intelligence ID</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full bg-dark-bg border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white focus:border-accent-blue outline-none transition-all placeholder:text-text-secondary/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary pl-2">Authorization Secret</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-blue transition-colors" size={18} />
                                <input
                                    type="password"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-dark-bg border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white focus:border-accent-blue outline-none transition-all placeholder:text-text-secondary/20"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-6 bg-white text-dark-bg rounded-full text-[10px] font-black tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-accent-blue hover:text-white transition-all disabled:opacity-50 mt-4 shadow-xl shadow-white/5"
                        >
                            {isLoading ? 'VERIFYING...' : 'INITIATE LOGIN'}
                            {!isLoading && <ArrowRight size={16} />}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-[10px] font-black text-text-secondary/40 uppercase tracking-widest">
                            Zenvyx Orbital Defense Systems © 2026
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Login;
