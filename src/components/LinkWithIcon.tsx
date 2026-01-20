import type { LucideIcon } from 'lucide-react';

interface LinkWithIconProps {
    href: string;
    text: string;
    icon?: LucideIcon;
    external?: boolean;
    className?: string;
}

export default function LinkWithIcon({ href, text, icon: Icon, external = false, className = '' }: LinkWithIconProps) {
    return (
        <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={`text-subtext1 hover:text-accent inline-flex items-center gap-1.5 transition-colors duration-200 ${className}`}
        >
            {Icon && <Icon size={18} strokeWidth={1.5} className="shrink-0" />}
            <span>{text}</span>
        </a>
    );
}
