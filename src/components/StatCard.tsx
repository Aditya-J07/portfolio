import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    value: number | string;
    label: string;
    suffix?: string;
    color?: string;
}

export default function StatCard({ icon: Icon, value, label, suffix = '', color = 'blue' }: StatCardProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = numericValue / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                setDisplayValue(numericValue);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(current * 10) / 10);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [numericValue]);

    const colorClasses: Record<string, string> = {
        blue: 'text-blue bg-blue/10',
        green: 'text-green bg-green/10',
        yellow: 'text-yellow bg-yellow/10',
        mauve: 'text-mauve bg-mauve/10',
        peach: 'text-peach bg-peach/10',
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="card text-center"
        >
            <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className={`text-3xl font-bold font-mono ${colorClasses[color].split(' ')[0]}`}>
                {typeof value === 'number' ? displayValue : value}
                {suffix}
            </div>
            <div className="text-subtext0 text-sm mt-1">{label}</div>
        </motion.div>
    );
}
