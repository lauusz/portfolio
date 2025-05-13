import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects, categories } from '../constants/data';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-60 left-10 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-cta/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="section-container relative z-10">
        <h2 className="section-title">My Projects</h2>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === 'All'
                ? 'bg-accent text-text'
                : 'bg-background text-primary border border-primary/30 hover:border-accent hover:text-accent'
            }`}
            onClick={() => setActiveCategory('All')}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-accent text-text'
                  : 'bg-background text-primary border border-primary/30 hover:border-accent hover:text-accent'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="card overflow-hidden group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-accent/90 text-text text-xs rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-primary mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-background border border-primary/30 text-primary text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:text-accent transition-colors duration-300"
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
                      className="flex items-center gap-1 text-sm text-primary hover:text-accent transition-colors duration-300"
                    >
                      <Github size={16} />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/lauusz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;