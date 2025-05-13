import React from 'react';
import { skills } from '../constants/data';
import { iconMap } from '../constants/iconMap';

const Skills: React.FC = () => {
  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="text-accent w-6 h-6" /> : null;
  };


  return (
    <section id="skills" className="bg-background relative py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-cta/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="section-container relative z-10">
        <h2 className="section-title">My Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-background border border-primary/20 rounded-lg p-6 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,137,6,0.1)]"
            >
              <div className="flex items-center m-3">
                <div className="mr-4">
                  {getIcon(skill.icon)}
                </div>
                <h3 className="text-xl font-semibold">{skill.name}</h3>
              </div>


            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-background border border-primary/20 rounded-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Other Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Git', 'Figma', 'AWS', 'Pandas', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Tableau', 'Solidity', 'GraphQL', 'MongoDB', 'PostgreSQL',
              'Firebase', 'Docker', 'Next.js', 'Express', 'PHP', 'Laravel', 'MySQL'
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-background border border-primary/30 rounded-full text-primary hover:border-accent hover:text-accent transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;