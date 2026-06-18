import { useState } from 'react';
import { projects, categories } from '../constants/data';
import { ExternalLink, Github } from 'lucide-react';

const allCategories = ['All', ...categories];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-container">
        <div className="mb-12">
          <p className="font-mono text-sm text-muted mb-2">
            <span className="text-primary">$</span> ls -la projects/
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-text">
            FEATURED <span className="text-primary">PROJECTS</span>
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-sm px-4 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-border text-muted hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="terminal-window group hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden border-b border-border">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-void/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-void transition-colors flex items-center gap-2"
                    >
                      <Github size={12} /> CODE
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs border border-accent text-accent px-4 py-2 hover:bg-accent hover:text-void transition-colors flex items-center gap-2"
                    >
                      <ExternalLink size={12} /> DEMO
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6">
                <p className="font-mono text-xs text-muted mb-2">
                  <span className="text-primary">{project.id}</span> // {project.category}
                </p>
                <h3 className="font-sans text-xl font-bold text-text mb-2">{project.title}</h3>
                <p className="font-mono text-sm text-muted leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 py-1 border border-border text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
