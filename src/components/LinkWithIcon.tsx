import type { LucideIcon } from 'lucide-react';

interface LinkWithIconProps {
  href: string;
  text: string;
  icon?: LucideIcon;
  external?: boolean;
  className?: string;
}

export default function LinkWithIcon({
  href,
  text,
  icon: Icon,
  external = false,
  className = '',
}: LinkWithIconProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`text-ink hover:text-focus inline-flex items-center gap-1.5 font-bold transition-all hover:translate-x-0.5 ${className}`}
    >
      {Icon && <Icon size={16} strokeWidth={2.2} className="shrink-0 text-accent-yellow" />}
      <span>{text}</span>
    </a>
  );
}
