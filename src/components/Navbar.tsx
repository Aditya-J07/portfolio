import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Pics', path: '/pics' }, // Placeholder based on request
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-40 bg-base/80 backdrop-blur-md"
                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent)' }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <motion.div
                                animate={{ rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Terminal className="w-5 h-5 text-accent" />
                            </motion.div>
                            <span className="font-mono font-bold text-lg text-text group-hover:text-accent transition-colors">
                                ~/aditya
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`font-mono text-sm transition-colors relative ${location.pathname === link.path
                                        ? 'text-accent font-bold'
                                        : 'text-subtext0 hover:text-text'
                                        }`}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="font-mono text-sm text-subtext0 hover:text-accent transition-colors flex items-center gap-1"
                            >
                                More...
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 text-text hover:text-accent transition-colors"
                            >
                                <MoreHorizontal className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-text hover:text-accent transition-colors"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-base border-t border-surface0"
                        >
                            <div className="px-4 py-4 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-3 rounded-lg font-mono text-sm transition-colors ${location.pathname === link.path
                                            ? 'bg-surface0 text-accent'
                                            : 'text-subtext0 hover:bg-surface0 hover:text-text'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </>
    );
}
