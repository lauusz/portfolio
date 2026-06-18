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
        <div className="mb-16">
          <p className="font-sans text-sm text-accent font-medium uppercase tracking-widest mb-3">
            Selected Work
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
            Featured
            <br />
            <span className="text-muted">Projects</span>
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-sm px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-border text-muted hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="card card-hover overflow-hidden group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6">
                <p className="font-sans text-xs text-accent font-medium uppercase tracking-wider mb-2">
                  {project.category}
                </p>
                <h3 className="font-sans text-xl font-bold text-primary mb-2">{project.title}</h3>
                <p className="font-sans text-sm text-muted leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-sans text-xs px-3 py-1 bg-surface-elevated text-muted rounded-full"
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
