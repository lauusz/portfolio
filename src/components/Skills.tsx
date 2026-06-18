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

const skillWidths: Record<string, number> = {
  JavaScript: 92,
  TypeScript: 88,
  React: 90,
  'Node.js': 85,
  'CSS/SCSS': 87,
  'Next.js': 82,
  Python: 80,
  Docker: 78,
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

  return (
    <section id="skills" className="section-padding relative">
      <div className="section-container">
        <div className="mb-12">
          <p className="font-mono text-sm text-muted mb-2">
            <span className="text-primary">$</span> ls -la skills/
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-text">
            MY <span className="text-primary">SKILLS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="terminal-window p-6 group hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {getIcon(skill.icon)}
              </div>
              <h3 className="font-mono text-sm font-semibold text-text mb-1">{skill.name}</h3>
              <p className="font-mono text-xs text-muted">{skillDescriptions[skill.name]}</p>
              <div className="mt-4 h-[2px] bg-border relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${skillWidths[skill.name] ?? 80}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Other tech */}
        <div className="mt-12 terminal-window p-6 sm:p-8">
          <p className="font-mono text-xs text-muted mb-6">
            <span className="text-primary">$</span> grep -i "other" tech.txt
          </p>
          <div className="flex flex-wrap gap-3">
            {otherTech.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-3 py-1.5 border border-border text-muted hover:border-primary hover:text-primary transition-all duration-300"
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
