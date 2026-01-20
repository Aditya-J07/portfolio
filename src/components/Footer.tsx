import { Github, Linkedin, Mail, Gamepad2, Heart, CheckCircle } from 'lucide-react';

const socialLinks = [
    { icon: Github, href: 'https://github.com/Aditya-J07', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/aditya-jha-sit', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:adityajha.vats02@gmail.com', label: 'Email' },
    { icon: Gamepad2, href: 'https://prolly-adi.itch.io/', label: 'itch.io' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-20 border-t border-surface0 bg-base/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Copyright */}
                    <div className="flex items-center gap-2 text-subtext0 font-mono text-sm">
                        <span>© {currentYear} Aditya Jha</span>
                        <span className="text-surface2">|</span>
                        <span className="flex items-center gap-1 text-green">
                            <CheckCircle className="w-3 h-3" />
                            All Systems Nominal
                        </span>
                        <span className="text-surface2 hidden sm:inline">|</span>
                        <span className="text-subtext0 hidden sm:inline">Last updated: Jan 20, 2026</span>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-subtext0 hover:text-accent transition-colors duration-300"
                                aria-label={link.label}
                            >
                                <link.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Built With */}
                <div className="mt-6 pt-6 border-t border-surface0 text-center">
                    <p className="text-subtext0 text-sm font-mono flex items-center justify-center gap-2">
                        Built with <Heart className="w-4 h-4 text-red fill-current" /> using React, TypeScript & TailwindCSS
                    </p>
                </div>
            </div>
        </footer>
    );
}
