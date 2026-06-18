import { useRef } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../constants/data';
import { iconMap } from '../constants/iconMap';

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
  'Git', 'Figma', 'AWS', 'Pandas', 'Scikit-learn', 'TensorFlow', 'PyTorch',
  'Tableau', 'Solidity', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Firebase',
  'Docker', 'Next.js', 'Express', 'PHP', 'Laravel', 'MySQL',
];

const Skills = () => {
  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -8;
    const ry = ((x - cx) / cx) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    el.style.transition = 'transform 0.1s ease-out';
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    e.currentTarget.style.transition = 'transform 0.5s ease-out';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="skills" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-muted mb-2">
            <span className="text-primary">$</span> ls -la skills/
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-text">
            MY <span className="text-primary">SKILLS</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltLeave}
              className="terminal-window p-6 group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {getIcon(skill.icon)}
              </div>
              <h3 className="font-mono text-sm font-semibold text-text mb-1">{skill.name}</h3>
              <p className="font-mono text-xs text-muted">{skillDescriptions[skill.name]}</p>
              <div className="mt-4 h-[2px] bg-border relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${Math.random() * 30 + 70}%` }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other tech */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 terminal-window p-6 sm:p-8"
        >
          <p className="font-mono text-xs text-muted mb-6">
            <span className="text-primary">$</span> grep -i "other" tech.txt
          </p>
          <div className="flex flex-wrap gap-3">
            {otherTech.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="font-mono text-xs px-3 py-1.5 border border-border text-muted hover:border-primary hover:text-primary transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
