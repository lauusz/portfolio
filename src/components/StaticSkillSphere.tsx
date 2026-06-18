import { useState } from 'react';
import { skills } from '../constants/data';
import { iconMap } from '../constants/iconMap';

const StaticSkillSphere = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="w-5 h-5 sm:w-6 sm:h-6" /> : null;
  };

  // 8 items evenly spaced on a circle, using a square aspect-ratio container
  const radius = 35;
  const center = 50;
  const count = skills.length;

  const nodes = skills.map((skill, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { skill, x, y, angle };
  });

  return (
    <section className="section-padding relative">
      <div className="section-container">
        <div className="mb-16">
          <p className="font-sans text-sm text-accent font-medium uppercase tracking-widest mb-3">
            Skill Map
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
            My
            <br />
            <span className="text-muted">Constellation</span>
          </h2>
        </div>

        {/* Square container for perfect circular orbit */}
        <div className="card overflow-hidden bg-surface">
          <div className="relative w-full" style={{ aspectRatio: '1 / 1', maxHeight: '520px' }}>
            {/* Background: subtle concentric rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[70%] h-[70%] rounded-full border border-border/30" />
              <div className="absolute w-[50%] h-[50%] rounded-full border border-border/20" />
              <div className="absolute w-[30%] h-[30%] rounded-full border border-border/10" />
            </div>

            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center shadow-xl shadow-accent/20">
                <span className="font-sans text-xs sm:text-sm font-bold text-white text-center">
                  Core
                </span>
              </div>
            </div>

            {/* SVG: connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {/* Lines from center to each node */}
              {nodes.map((node, i) => (
                <line
                  key={`line-${i}`}
                  x1={`${center}%`}
                  y1={`${center}%`}
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke={hoveredIndex === i ? '#B08968' : 'rgba(176, 137, 104, 0.25)'}
                  strokeWidth={hoveredIndex === i ? 2.5 : 1.5}
                  strokeDasharray={hoveredIndex === i ? 'none' : '6 4'}
                  className="transition-all duration-300"
                />
              ))}
              {/* Outer ring connecting all nodes */}
              <polygon
                points={nodes.map(n => `${n.x},${n.y}`).join(' ')}
                fill="none"
                stroke="rgba(176, 137, 104, 0.08)"
                strokeWidth="1"
              />
            </svg>

            {/* Skill nodes */}
            {nodes.map((node, i) => {
              const isHovered = hoveredIndex === i;
              return (
                <div
                  key={node.skill.name}
                  className="absolute z-10"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex flex-col items-center gap-2 transition-transform duration-300 cursor-pointer">
                    {/* Icon circle */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isHovered
                          ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-110'
                          : 'bg-white text-accent border-2 border-border'
                      }`}
                    >
                      {getIcon(node.skill.icon)}
                    </div>
                    {/* Label pill */}
                    <span
                      className={`font-sans text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap px-3 py-1 rounded-full ${
                        isHovered
                          ? 'bg-accent text-white shadow-md'
                          : 'bg-white text-primary border border-border'
                      }`}
                    >
                      {node.skill.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticSkillSphere;
