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
                      aria-label={`View code for ${project.title}`}
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
                      aria-label={`View live demo for ${project.title}`}
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
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div className="rounded-2xl bg-surface-elevated/70 border border-border px-4 py-3">
                    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted mb-1">Role</p>
                    <p className="font-sans text-sm text-primary">{project.role}</p>
                  </div>
                  <div className="rounded-2xl bg-surface-elevated/70 border border-border px-4 py-3">
                    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted mb-1">Outcome</p>
                    <p className="font-sans text-sm text-primary">{project.outcome}</p>
                  </div>
                </div>
                {(project.codeUrl || project.demoUrl) && (
                  <div className="flex flex-wrap gap-3 mb-4">
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View code for ${project.title}`}
                        className="inline-flex items-center gap-2 font-sans text-sm text-primary hover:text-accent transition-colors"
                      >
                        <Github size={16} />
                        View Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live demo for ${project.title}`}
                        className="inline-flex items-center gap-2 font-sans text-sm text-primary hover:text-accent transition-colors"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
                <div className="mb-4">
                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted mb-2">Key Focus</p>
                  <div className="flex flex-wrap gap-2">
                    {project.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="font-sans text-xs px-3 py-1 bg-white text-primary rounded-full border border-border"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
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
