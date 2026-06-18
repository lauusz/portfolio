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
  'Express', 'PHP', 'Laravel', 'MySQL', 'Supabase', 'Vercel',
];

const Skills = () => {
  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="w-7 h-7" /> : null;
  };

  return (
    <section id="skills" className="section-padding relative">
      <div className="section-container">
        <div className="mb-16">
          <p className="font-sans text-sm text-accent font-medium uppercase tracking-widest mb-3">
            My Toolkit
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
            Skills &
            <br />
            <span className="text-muted">Technologies</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="card card-hover p-6"
            >
              <div className="text-accent mb-4">
                {getIcon(skill.icon)}
              </div>
              <h3 className="font-sans text-base font-semibold text-primary mb-1">{skill.name}</h3>
              <p className="font-sans text-sm text-muted">{skillDescriptions[skill.name]}</p>
              <div className="mt-4 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full transition-all duration-1000" 
                  style={{ width: `${skillWidths[skill.name] ?? 80}%` }} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Other tech */}
        <div className="mt-16 card p-6 sm:p-8">
          <p className="font-sans text-sm text-accent font-medium uppercase tracking-widest mb-6">
            Also Familiar With
          </p>
          <div className="flex flex-wrap gap-3">
            {otherTech.map((tech) => (
              <span
                key={tech}
                className="tag tag-hover transition-all duration-300"
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
