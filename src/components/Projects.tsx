import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects, categories } from '../constants/data';
import GlassCard from './GlassCard';
import AnimatedSection from './AnimatedSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const rotateX = ((y - cy) / cy) * -8;
  const rotateY = ((x - cx) / cx) * 8;
  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  e.currentTarget.style.transition = 'transform 0.1s ease-out';
};

const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  e.currentTarget.style.transition = 'transform 0.5s ease-out';
};

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const allCategories = ['All', ...categories];

  return (
    <section id="projects" className="bg-background relative section-padding">
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cta/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <AnimatedSection>
            <p className="section-subtitle">PORTFOLIO</p>
            <h2 className="section-title">My Projects</h2>
          </AnimatedSection>
        </div>

        {/* Filter Bar */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allCategories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-accent text-white shadow-[0_0_15px_rgba(255,107,53,0.3)]'
                    : 'bg-surface text-primary border border-white/[0.08] hover:border-accent/40 hover:text-accent'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <div
                  onMouseMove={handleTiltMove}
                  onMouseLeave={handleTiltLeave}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <GlassCard className="group overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,107,53,0.15)]">
                    {/* Image Area */}
                    <div className="relative aspect-video overflow-hidden rounded-t-xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-accent/90 text-white text-xs rounded-full font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-xl font-bold text-text group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-primary mt-2 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-background/80 border border-white/[0.08] rounded-md text-xs text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4 mt-5 pt-4 border-t border-white/[0.08]">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-primary hover:text-accent transition-colors duration-300"
                          >
                            <ExternalLink size={16} />
                            <span>Live Demo</span>
                          </a>
                        )}

                        {project.codeUrl && (
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-sm text-primary hover:text-accent transition-colors duration-300"
                          >
                            <Github size={16} />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <AnimatedSection delay={0.2}>
            <a
              href="https://github.com/lauusz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              View More on GitHub
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Projects;
