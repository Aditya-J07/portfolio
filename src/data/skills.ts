export interface SkillCategory {
    name: string;
    icon: string;
    skills: string[];
}

export const skillCategories: SkillCategory[] = [
    {
        name: 'Programming Languages',
        icon: 'code',
        skills: ['Python', 'C++', 'JavaScript', 'GDScript', 'HTML/CSS'],
    },
    {
        name: 'Game Development',
        icon: 'gamepad-2',
        skills: ['Godot Engine', '2D Game Design', 'Level Design', 'Game Mechanics', 'Physics Systems', 'Enemy AI'],
    },
    {
        name: 'Web Development',
        icon: 'globe',
        skills: ['React', 'Node.js', 'FastAPI', 'MySQL', 'HTML5', 'CSS3', 'Responsive Design'],
    },
    {
        name: 'Tools & Others',
        icon: 'wrench',
        skills: ['Git/GitHub', 'VS Code', 'Cybersecurity', 'Adobe Photoshop', 'Blender (Basic)'],
    },
    {
        name: 'Data Structures',
        icon: 'book-open',
        skills: ['Data Structures & Algorithms', 'Competitive Programming'],
    },
];

export const achievements = [
    { icon: '🏆', title: '1st Place - Hyperthon', subtitle: 'Siddaganga Institute of Technology, April 2026' },
    { icon: '🛡️', title: 'Sandbox v2.0 – Secure the Day', subtitle: 'DSCE Bengaluru, March 2026' },
    { icon: '🏆', title: '5th Place - Hackademia', subtitle: 'HackWithIndia & Algo GenZ, August 2025' },
    { icon: '🥇', title: 'Code Conqueror Winner', subtitle: 'DeCoders SIT, December 2024' },
    { icon: '🥇', title: 'Reverse Coding Winner', subtitle: 'DeCoders SIT, December 2024' },
    { icon: '🚀', title: 'Buildverse', subtitle: 'HackWithIndia & Scalar School of Technology, June 2025' },
    { icon: '🤖', title: 'CORSIT ROBOCOR', subtitle: 'SIT, May 2025' },
    { icon: '💻', title: 'IEEE Summer of Code', subtitle: 'United Latino Students Association, April 2025' },
    { icon: '🎮', title: '4 Published Games', subtitle: 'Available on itch.io' },
    { icon: '💼', title: '2 Live Club Websites', subtitle: 'Built & Managing' },
];
