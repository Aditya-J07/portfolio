import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Github,
    Linkedin,
    Gamepad2,
    MapPin,
    Send,
    CheckCircle
} from 'lucide-react';

const contactLinks = [
    {
        icon: Mail,
        label: 'Email',
        value: 'adityajha.vats02@gmail.com',
        href: 'mailto:adityajha.vats02@gmail.com',
        color: 'text-red'
    },
    {
        icon: Github,
        label: 'GitHub',
        value: 'Aditya-J07',
        href: 'https://github.com/Aditya-J07',
        color: 'text-text'
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'aditya-jha-sit',
        href: 'https://www.linkedin.com/in/aditya-jha-sit',
        color: 'text-blue'
    },
    {
        icon: Gamepad2,
        label: 'itch.io',
        value: 'prolly-adi',
        href: 'https://prolly-adi.itch.io/',
        color: 'text-pink'
    },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // For now, just show success message
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <div className="min-h-screen pt-24 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-mono text-text mb-4">
                        Let's Connect
                    </h1>
                    <p className="text-subtext0 max-w-xl mx-auto">
                        I'm always open to discussing new projects, creative ideas,
                        or opportunities to be part of your visions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card"
                    >
                        <h2 className="text-xl font-bold text-text mb-6">Send a Message</h2>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <CheckCircle className="w-16 h-16 text-green mb-4" />
                                <h3 className="text-xl font-bold text-text mb-2">Message Sent!</h3>
                                <p className="text-subtext0">Thanks for reaching out. I'll get back to you soon!</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-subtext1 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-surface0 border border-surface1 rounded-lg text-text placeholder:text-subtext0 focus:outline-none focus:border-blue transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-subtext1 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-surface0 border border-surface1 rounded-lg text-text placeholder:text-subtext0 focus:outline-none focus:border-blue transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-subtext1 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-surface0 border border-surface1 rounded-lg text-text placeholder:text-subtext0 focus:outline-none focus:border-blue transition-colors resize-none"
                                        placeholder="What's on your mind?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full btn-primary flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Location Card */}
                        <div className="card">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="w-5 h-5 text-peach" />
                                <h3 className="font-bold text-text">Location</h3>
                            </div>
                            <p className="text-subtext0">Tumkur, Karnataka, India</p>
                            <p className="text-subtext1 text-sm mt-1">
                                Siddaganga Institute of Technology
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="card">
                            <h3 className="font-bold text-text mb-4">Connect with me</h3>
                            <div className="space-y-3">
                                {contactLinks.map((link, index) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="flex items-center gap-3 p-3 bg-surface0 rounded-lg hover:bg-surface1 transition-colors group"
                                    >
                                        <link.icon className={`w-5 h-5 ${link.color}`} />
                                        <div className="flex-1">
                                            <p className="text-sm text-subtext0">{link.label}</p>
                                            <p className="text-text group-hover:text-blue transition-colors">
                                                {link.value}
                                            </p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="card bg-green/10 border-green/20">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green rounded-full animate-pulse" />
                                <span className="text-green font-medium">Available for opportunities</span>
                            </div>
                            <p className="text-subtext0 text-sm mt-2">
                                Open to internships, collaborations, and freelance projects.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
