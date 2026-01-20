import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MousePointer, MousePointerClick } from 'lucide-react';

const STORAGE_KEY = 'portfolio-global-clicks';

export default function ClickCounter() {
    const [clicks, setClicks] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setClicks(parseInt(stored, 10));
        }
    }, []);

    const handleClick = () => {
        const newClicks = clicks + 1;
        setClicks(newClicks);
        localStorage.setItem(STORAGE_KEY, newClicks.toString());
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 200);
    };

    return (
        <div className="card text-center">
            <div className="flex items-center gap-2 mb-2">
                <MousePointerClick className="text-accent w-4 h-4" />
                <span className="text-sm font-mono text-subtext0">Counter</span>
            </div>

            <motion.button
                onClick={handleClick}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${isAnimating
                    ? 'bg-green text-base'
                    : 'bg-blue/20 text-blue hover:bg-blue hover:text-base'
                    }`}
            >
                <MousePointer className="w-5 h-5 inline-block mr-2" />
                CLICK ME
            </motion.button>

            <motion.div
                key={clicks}
                initial={{ scale: 1.2, color: '#a6e3a1' }}
                animate={{ scale: 1, color: '#cdd6f4' }}
                className="mt-4 font-mono"
            >
                <span className="text-subtext0 text-sm">you've clicked </span>
                <span className="text-2xl font-bold text-text">{clicks.toLocaleString()}</span>
                <span className="text-subtext0 text-sm"> times</span>
            </motion.div>
        </div>
    );
}
