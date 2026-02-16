import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Youtube, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Services: [
            { name: 'Video Editing', path: '/portfolio' },
            { name: 'Thumbnail Design', path: '/portfolio' },
            { name: 'Web Development', path: '/portfolio' },
            { name: 'Brand Deals', path: '/collaborate' },
        ],
        Company: [
            { name: 'About', path: '/' },
            { name: 'Portfolio', path: '/portfolio' },
            { name: 'Collaborate', path: '/collaborate' },
            { name: 'Contact', path: '/contact' },
        ],
    };

    const socialLinks = [
        { Icon: Instagram, href: 'https://www.instagram.com/zenvyxmedia', label: 'Instagram' },
        { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    ];

    return (
        <footer className="bg-dark-bg border-t border-white/5 py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
                    {/* Brand */}
                    <div className="space-y-8">
                        <Link to="/" className="text-3xl font-black gradient-text tracking-tighter">
                            ZENVYX
                        </Link>
                        <p className="text-text-secondary leading-relaxed max-w-xs">
                            Elevating the world's most ambitious creators through precision-engineered production and strategic authority.
                        </p>
                        <div className="flex space-x-6">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary hover:text-white transition-colors group"
                                    aria-label={label}
                                >
                                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">{category}</h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="text-text-secondary hover:text-accent-blue transition-colors text-sm font-medium"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-8">Intelligence</h4>
                        <p className="text-text-secondary text-sm mb-8 leading-relaxed">
                            Join our elite list for the latest in creator economy strategy.
                        </p>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="transmission@email.com"
                                className="w-full bg-dark-card border border-white/5 rounded-2xl px-6 py-5 pr-14 text-sm text-white focus:border-accent-blue outline-none transition-all"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-dark-bg rounded-xl flex items-center justify-center hover:bg-accent-blue hover:text-white transition-all">
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.2em]">
                        © {currentYear} Zenvyx Studio. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link to="#" className="text-text-secondary hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Privacy</Link>
                        <Link to="#" className="text-text-secondary hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
