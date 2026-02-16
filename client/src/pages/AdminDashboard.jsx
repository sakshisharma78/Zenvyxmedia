import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { leadService } from '../services';
import { useAuthStore } from '../context/authStore';
import { Navigate } from 'react-router-dom';
import { BarChart3, Users, TrendingUp, CheckCircle, LogOut, ExternalLink, MessageSquare, ChevronRight } from 'lucide-react';
import { staggerContainer, staggerItem, pageTransition } from '../animations/variants';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const [stats, setStats] = useState(null);
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState(null);

    useEffect(() => {
        if (isAuthenticated && user?.role === 'admin') {
            fetchData();
        }
    }, [isAuthenticated, user]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsData, leadsData] = await Promise.all([
                leadService.getStats(),
                leadService.getAll({ limit: 50 }),
            ]);
            setStats(statsData);
            setLeads(leadsData.leads || []);
        } catch (error) {
            console.error('Error fetching admin data:', error);
            toast.error('Failed to sync with intelligence grid.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await leadService.update(id, { status: newStatus });
            toast.success(`Mission status updated to ${newStatus}`);
            fetchData();
            if (selectedLead?._id === id) {
                setSelectedLead(prev => ({ ...prev, status: newStatus }));
            }
        } catch (error) {
            toast.error('Update failed. Connection unstable.');
        }
    };

    if (!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    if (loading && !stats) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-bg">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen pt-32 pb-24 bg-dark-bg"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-white">
                            COMMAND <span className="gradient-text">CENTER</span>
                        </h1>
                        <p className="text-text-secondary text-lg">
                            Monitoring the Zenvyx ecosystem and lead pipeline.
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-text-secondary hover:bg-white/10 hover:text-white transition-all shadow-xl"
                    >
                        <LogOut size={14} />
                        Terminate Session
                    </button>
                </div>

                {/* Stats Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {[
                        { label: 'Total Leads', value: stats?.totalLeads || 0, icon: Users, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
                        { label: 'New leads', value: stats?.newLeads || 0, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
                        { label: 'Closed Deals', value: stats?.closedLeads || 0, icon: CheckCircle, color: 'text-accent-violet', bg: 'bg-accent-violet/10' },
                        { label: 'Conversion', value: `${stats?.conversionRate || 0}%`, icon: BarChart3, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                            className="bg-dark-card border border-white/5 rounded-[32px] p-8 hover:border-white/10 transition-all group"
                        >
                            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <stat.icon className={stat.color} size={24} />
                            </div>
                            <p className="text-4xl font-black text-white mb-1 tracking-tighter">{stat.value}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-40">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Leads Table */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 bg-dark-card border border-white/5 rounded-[40px] overflow-hidden"
                    >
                        <div className="p-8 md:p-10 border-b border-white/5 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white tracking-tight">Intelligence Feed</h2>
                            <span className="text-[10px] font-black text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full uppercase tracking-widest">LIVE DATA</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Entity</th>
                                        <th>Mission</th>
                                        <th>Status</th>
                                        <th>Temporal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.length > 0 ? leads.map((lead) => (
                                        <tr
                                            key={lead._id}
                                            className={`cursor-pointer transition-colors ${selectedLead?._id === lead._id ? 'bg-white/5' : ''}`}
                                            onClick={() => setSelectedLead(lead)}
                                        >
                                            <td>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white">{lead.name}</span>
                                                    <span className="text-[9px] text-text-secondary opacity-60 uppercase tracking-widest font-black">{lead.role}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white">
                                                    {lead.serviceInterested || 'General'}
                                                </span>
                                            </td>
                                            <td>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${lead.status === 'New'
                                                        ? 'bg-green-500/10 text-green-500'
                                                        : lead.status === 'Contacted'
                                                            ? 'bg-yellow-500/10 text-yellow-500'
                                                            : 'bg-accent-blue/10 text-accent-blue'
                                                        }`}
                                                >
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="text-text-secondary text-xs opacity-60 font-medium">
                                                {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </td>
                                            <td>
                                                <ChevronRight size={16} className={`text-text-secondary transition-transform ${selectedLead?._id === lead._id ? 'rotate-90 text-white' : ''}`} />
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="py-20 text-center text-text-secondary">
                                                No active leads found in the matrix.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Lead Detail / Inspection */}
                    <div className="lg:col-span-1">
                        <AnimatePresence mode="wait">
                            {selectedLead ? (
                                <motion.div
                                    key={selectedLead._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-dark-card border border-accent-blue/20 rounded-[40px] p-8 sticky top-32"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-blue">Transmission Details</h3>
                                        <button onClick={() => setSelectedLead(null)} className="text-text-secondary hover:text-white transition-colors">
                                            <LogOut size={16} className="rotate-180" />
                                        </button>
                                    </div>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-2xl font-bold text-white mb-1">{selectedLead.name}</h4>
                                            <p className="text-text-secondary text-sm">{selectedLead.email}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 p-4 rounded-2xl">
                                                <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1">MISSION</p>
                                                <p className="text-xs font-bold text-white">{selectedLead.serviceInterested || 'General'}</p>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-2xl">
                                                <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest mb-1">BUDGET</p>
                                                <p className="text-xs font-bold text-white">{selectedLead.budget || 'N/A'}</p>
                                            </div>
                                        </div>

                                        {selectedLead.socialLink && (
                                            <a
                                                href={selectedLead.socialLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-4 bg-accent-blue/5 border border-accent-blue/10 rounded-2xl hover:bg-accent-blue/10 transition-colors group"
                                            >
                                                <span className="text-xs font-bold text-accent-blue">Target Channel</span>
                                                <ExternalLink size={14} className="text-accent-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </a>
                                        )}

                                        <div>
                                            <div className="flex items-center gap-2 mb-3 text-text-secondary">
                                                <MessageSquare size={14} />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Inquiry Briefing</span>
                                            </div>
                                            <div className="p-6 bg-dark-bg rounded-[24px] border border-white/5 text-sm text-text-secondary leading-relaxed">
                                                {selectedLead.message || "No briefing provided for this mission."}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4">Command Action</p>
                                            <div className="flex flex-wrap gap-2">
                                                {['New', 'Contacted', 'Closed'].map(status => (
                                                    <button
                                                        key={status}
                                                        onClick={() => handleStatusUpdate(selectedLead._id, status)}
                                                        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedLead.status === status
                                                                ? 'bg-white text-dark-bg'
                                                                : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white'
                                                            }`}
                                                    >
                                                        {status}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="bg-dark-card/50 border border-dashed border-white/10 rounded-[40px] p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                        <Users className="text-text-secondary opacity-20" size={32} />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-40">
                                        Select an entity from the grid to inspect details.
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
