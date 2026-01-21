import { motion } from 'framer-motion';
import {
    Mail,
    Github,
    Linkedin,
    Gamepad2,
    MapPin,
    ArrowRight
} from 'lucide-react';

const contactLinks = [
    {
        icon: Mail,
        label: 'Email',
        value: 'adityajha.vats02@gmail.com',
        href: 'mailto:adityajha.vats02@gmail.com',
        color: 'text-red',
        bg: 'bg-red/10',
        border: 'border-red/20'
    },
    {
        icon: Github,
        label: 'GitHub',
        value: 'Aditya-J07',
        href: 'https://github.com/Aditya-J07',
        color: 'text-text',
        bg: 'bg-surface2/10',
        border: 'border-surface2/20'
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'aditya-jha-sit',
        href: 'https://www.linkedin.com/in/aditya-jha-sit',
        color: 'text-blue',
        bg: 'bg-blue/10',
        border: 'border-blue/20'
    },
    {
        icon: Gamepad2,
        label: 'itch.io',
        value: 'prolly-adi',
        href: 'https://prolly-adi.itch.io/',
        color: 'text-pink',
        bg: 'bg-pink/10',
        border: 'border-pink/20'
    },
];

export default function Contact() {
    return (
        <div className="min-h-screen pt-24 px-4 pb-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-mono text-text mb-6">
                        Let's Connect
                    </h1>
                    <p className="text-subtext0 max-w-xl mx-auto text-lg leading-relaxed">
                        I'm always open to discussing new projects, creative ideas,
                        or opportunities to be part of your visions.
                    </p>
                </motion.div>

                {/* Contact Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {contactLinks.map((link, index) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`group p-6 rounded-2xl border ${link.border} ${link.bg} hover:scale-[1.02] transition-all duration-300 relative overflow-hidden`}
                        >
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl bg-base/50 ${link.color}`}>
                                        <link.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text text-lg">{link.label}</h3>
                                        <p className="text-subtext0 font-mono text-sm">{link.value}</p>
                                    </div>
                                </div>
                                <ArrowRight className={`w-5 h-5 ${link.color} opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all`} />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col md:flex-row gap-6 justify-center"
                >
                    <div className="card text-center flex-1 backdrop-blur-sm">
                        <MapPin className="w-8 h-8 text-peach mx-auto mb-3" />
                        <h3 className="font-bold text-text mb-1">Located in</h3>
                        <p className="text-subtext0">Tumkur, Karnataka, India</p>
                    </div>

                    <div className="card bg-green/5 border-green/20 text-center flex-1 backdrop-blur-sm">
                        <div className="w-3 h-3 bg-green rounded-full mx-auto mb-3 animate-pulse shadow-[0_0_10px_rgba(166,227,161,0.5)]" />
                        <h3 className="font-bold text-green mb-1">Status</h3>
                        <p className="text-subtext0">Available for opportunities</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
