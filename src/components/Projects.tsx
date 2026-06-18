import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects, categories } from '../constants/data';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const allCategories = ['All', ...categories];

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -6;
    const ry = ((x - cx) / cx) * 6;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    el.style.transition = 'transform 0.1s ease-out';
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    e.currentTarget.style.transition = 'transform 0.5s ease-out';
  };

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-muted mb-2">
            <span className="text-primary">$</span> ls -la projects/
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-text">
            MY <span className="text-primary">PROJECTS</span>
          </h2>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs px-4 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted hover:border-primary/50 hover:text-primary'
              }`}
            >
              <span className={activeCategory === cat ? 'text-primary' : 'text-muted/50'}>
                {activeCategory === cat ? '[*]' : '[ ]'}
              </span>{' '}
              {cat.toLowerCase()}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                onMouseMove={handleTilt}
                onMouseLeave={handleTiltLeave}
                className="terminal-window group overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="font-mono text-xs px-2 py-1 bg-primary/20 text-primary border border-primary/30">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="font-sans text-lg font-bold text-text group-hover:text-primary transition-colors duration-300 mb-2">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-muted line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="font-mono text-xs px-2 py-1 bg-void border border-border text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-3 border-t border-border">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-primary transition-colors"
                      >
                        <ExternalLink size={12} />
                        <span>demo</span>
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-primary transition-colors"
                      >
                        <Github size={12} />
                        <span>source</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-10">
          <a
            href="https://github.com/lauusz"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-terminal inline-flex items-center gap-2"
          >
            <span className="text-muted">$</span> git clone github.com/lauusz
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
