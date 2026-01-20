import { motion } from 'framer-motion';
import {
    MapPin,
    GraduationCap,
    Briefcase,
    Code,
    Gamepad2,
    Globe,
    Wrench,
    BookOpen
} from 'lucide-react';
import SkillBadge from '../components/SkillBadge';
import { skillCategories, achievements } from '../data/skills';
import { experiences } from '../data/hackathons';

const iconMap: Record<string, typeof Code> = {
    'code': Code,
    'gamepad-2': Gamepad2,
    'globe': Globe,
    'wrench': Wrench,
    'book-open': BookOpen,
};

export default function About() {
    return (
        <div className="min-h-screen pt-24 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-mono text-text mb-4">
                        About Me
                    </h1>
                </motion.div>

                {/* Bio Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Avatar */}
                        <div className="shrink-0 mx-auto md:mx-0">
                            <img
                                src="/profile.png"
                                alt="Aditya Jha"
                                className="w-32 h-32 rounded-2xl object-cover shadow-lg border-2 border-surface2"
                            />
                        </div>

                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-text mb-2">Aditya Jha</h2>
                            <p className="text-blue font-mono mb-4">Game Developer & Full-Stack Developer</p>
                            <p className="text-subtext0 leading-relaxed mb-4">
                                I'm a second-year Computer Science student passionate about game development,
                                web development, and competitive programming. I love building interactive
                                experiences—from 2D games to full-stack web applications.
                            </p>
                            <p className="text-subtext0 leading-relaxed">
                                I'm actively participating in hackathons, managing club websites, and constantly
                                learning new technologies. My goal is to work in the gaming industry while keeping
                                my skills versatile across software development.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Education */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card mb-8"
                >
                    <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-green" />
                        Education
                    </h2>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-text">Siddaganga Institute of Technology</h3>
                            <p className="text-subtext0">B.E. in Computer Science & Engineering (AI & ML)</p>
                            <p className="text-subtext1 text-sm">2nd Year • 2024 - 2028</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2 md:justify-end">
                                <MapPin className="w-4 h-4 text-peach" />
                                <span className="text-subtext0">Tumkur, Karnataka, India</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Experience */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card mb-8"
                >
                    <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-blue" />
                        Experience
                    </h2>
                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className={`relative pl-6 ${index !== experiences.length - 1 ? 'pb-6 border-l-2 border-surface1' : ''}`}
                            >
                                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue" />
                                <h3 className="font-bold text-text">{exp.role}</h3>
                                <p className="text-blue font-mono text-sm mb-2">{exp.company} • {exp.period}</p>
                                <ul className="space-y-1">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="text-subtext0 text-sm flex items-start gap-2">
                                            <span className="text-blue mt-1">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Skills */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                >
                    <h2 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                        <Code className="w-6 h-6 text-mauve" />
                        Skills & Technologies
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {skillCategories.map((category) => {
                            const IconComponent = iconMap[category.icon] || Code;
                            return (
                                <div key={category.name} className="card">
                                    <h3 className="font-bold text-text mb-3 flex items-center gap-2">
                                        <IconComponent className="w-5 h-5 text-blue" />
                                        {category.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill, index) => (
                                            <SkillBadge key={skill} skill={skill} index={index} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Achievements */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="card"
                >
                    <h2 className="text-xl font-bold text-text mb-6">🏆 Achievements</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.05 }}
                                className="flex items-center gap-3 p-3 bg-surface0 rounded-lg"
                            >
                                <span className="text-2xl">{achievement.icon}</span>
                                <div>
                                    <p className="font-bold text-text text-sm">{achievement.title}</p>
                                    <p className="text-subtext0 text-xs">{achievement.subtitle}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </div >
        </div >
    );
}
