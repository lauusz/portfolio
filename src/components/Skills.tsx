import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../constants/data';
import { iconMap } from '../constants/iconMap';
import GlassCard from '../components/GlassCard';

const skillDescriptions: Record<string, string> = {
  JavaScript: 'Dynamic web interactivity',
  TypeScript: 'Type-safe development',
  React: 'Component-based UI',
  'Node.js': 'Server-side runtime',
  'CSS/SCSS': 'Styling & animations',
  'Next.js': 'Full-stack React framework',
  Python: 'Data science & automation',
  Docker: 'Containerization',
};

const otherTech = [
  'Git', 'Figma', 'AWS', 'Pandas', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Tableau', 'Solidity', 'GraphQL', 'MongoDB', 'PostgreSQL',
  'Firebase', 'Docker', 'Next.js', 'Express', 'PHP', 'Laravel', 'MySQL',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const tagContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const rotateX = ((y - cy) / cy) * -10;
  const rotateY = ((x - cx) / cx) * 10;
  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
};

const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  e.currentTarget.style.transition = 'transform 0.5s ease-out';
};

const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  e.currentTarget.style.transition = 'transform 0.1s ease-out';
};

const Skills: React.FC = () => {
  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="w-10 h-10 text-accent" /> : null;
  };

  return (
    <section id="skills" className="bg-background relative overflow-hidden section-padding">
      {/* Background orb */}
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-cta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-muted uppercase tracking-wider text-sm font-medium">EXPERTISE</p>
          <h2 className="text-text text-2xl sm:text-3xl md:text-4xl font-bold relative inline-block mb-8 sm:mb-12">
            My Skills
            <span className="absolute -bottom-2 left-0 w-2/3 h-1 bg-accent rounded-full" />
          </h2>
        </motion.div>

        {/* Main Skills Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="h-full"
            >
              <div
                className="h-full group"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onMouseEnter={handleCardMouseEnter}
              >
                <GlassCard className="p-6 h-full flex flex-col items-center text-center gap-3">
                  <div className="mb-1 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(skill.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-text">{skill.name}</h3>
                  <p className="text-sm text-primary">{skillDescriptions[skill.name]}</p>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Technologies */}
        <motion.div
          className="mt-12 sm:mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <GlassCard className="p-6 sm:p-8" hover={false}>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-text">Other Technologies</h3>
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              variants={tagContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {otherTech.map((tech) => (
                <motion.span
                  key={tech}
                  variants={tagVariants}
                  className="px-4 py-2 bg-surface border border-white/[0.08] rounded-full text-sm text-primary hover:border-accent/40 hover:text-accent transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
