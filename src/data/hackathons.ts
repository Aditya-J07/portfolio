export interface Hackathon {
    name: string;
    date: string;
    organizer: string;
    achievement?: string;
    isWin?: boolean;
    certificateLink?: string;
    type?: string;
    event?: string;
}

export const hackathons: Hackathon[] = [
    {
        name: 'HyperThon',
        date: '07 April 2026',
        organizer: 'CSE Department, Siddaganga Institute of Technology, Tumkur',
        achievement: '🏆 1st Place',
        isWin: true,
        type: '6-Hour Hackathon',
        event: 'Browse – Technical Fest',
        certificateLink: '/certificate.png',
    },
    {
        name: 'Sandbox v2.0',
        date: 'March 2026',
        organizer: 'Dayananda Sagar College of Engineering, Bengaluru',
    },
    {
        name: 'Vibe Hack 2.0',
        date: 'January 2026',
        organizer: 'Hack with India & Lovable (Online)',
    },
    {
        name: 'Brewathon',
        date: 'December 2025',
        organizer: 'AI Brewery',
    },
    {
        name: 'Hackademia',
        date: 'August 2025',
        organizer: 'HackWithIndia & Algo GenZ',
        achievement: '🏆 5th Place',
        isWin: true,
    },
    {
        name: 'HackwithHyderabad',
        date: 'September 2025',
        organizer: 'HackWithIndia, Microsoft Office Hyderabad',
    },
    {
        name: 'Buildverse',
        date: 'June 2025',
        organizer: 'HackWithIndia & Scalar School of Technology',
    },
];

export interface Experience {
    role: string;
    company: string;
    period: string;
    description: string[];
}

export const experiences: Experience[] = [
    {
        role: 'Web Developer',
        company: 'Pathfinder Club',
        period: '2025 - Present',
        description: [
            'Built complete club website from scratch using React and Node.js',
            'Integrated MongoDB database for event registrations',
            'Manage live deployment, updates, and technical maintenance',
        ],
    },
    {
        role: 'Website Manager',
        company: 'DeCoders Club',
        period: '2025 - Present',
        description: [
            'Manage existing club website operations',
            'Integrate MongoDB database for event registrations',
            'Implement new features based on club requirements',
        ],
    },
];
