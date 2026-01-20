export interface Project {
    id: string;
    name: string;
    description: string;
    tech: string[];
    liveUrl?: string;
    githubUrl?: string;
    image?: string;
    badge?: string;
    category: 'web' | 'game' | 'tool' | 'club';
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: 'neura-beats',
        name: 'Neura-Beats',
        description: 'AI-powered music therapy app for neurological rehabilitation (Parkinson\'s & stroke patients). Won 5th place at Hackademia hackathon.',
        tech: ['Python', 'Flask', 'HTML/CSS', 'JavaScript', 'AI/ML'],
        liveUrl: 'https://neuro-beats.onrender.com/',
        githubUrl: 'https://github.com/Aditya-J07/Neura-Beats',
        badge: '🏆 5th Place - Hackademia 2025',
        category: 'tool',
        featured: true,
    },
    {
        id: 'phishprint',
        name: 'PhishPrint',
        description: 'Phishing detection tool using machine learning to identify and prevent phishing attacks.',
        tech: ['Python', 'Flask', 'Machine Learning'],
        liveUrl: 'https://phishprint.onrender.com',
        githubUrl: 'https://github.com/Aditya-J07/phishprint',
        category: 'tool',
        featured: true,
    },
    {
        id: 'youtube-clone',
        name: 'YouTube Clone',
        description: 'Responsive frontend clone of YouTube built to practice HTML/CSS skills and responsive design.',
        tech: ['HTML', 'CSS', 'Responsive Design'],
        liveUrl: 'https://youtubeclone-static.vercel.app/',
        githubUrl: 'https://github.com/Aditya-J07/Youtube-Clone',
        category: 'web',
        featured: true,
    },
    {
        id: 'pathfinder',
        name: 'Pathfinder Club Website',
        description: 'Complete website rebuild from scratch for Pathfinder, a 22-year-old management club. Features event management and user registration system.',
        tech: ['Node.js', 'React', 'MongoDB'],
        liveUrl: 'https://www.pathfindersit.in',
        category: 'club',
    },
    {
        id: 'decoders',
        name: 'DeCoders Club Website',
        description: 'Managing website operations for DeCoders technical club. Handle event registrations and database integration.',
        tech: ['Node.js', 'MongoDB', 'JavaScript'],
        liveUrl: 'https://www.decoderssit.com',
        category: 'club',
    },
];
