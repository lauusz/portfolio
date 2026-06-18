import { useRef } from 'react';
import { skills } from '../constants/data';

const StaticSkillSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const phi = Math.PI * (3 - Math.sqrt(5));
  const nodes = skills.map((skill, i) => {
    const y = 1 - (i / (skills.length - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r * 0.85 + 0.5;
    const z = Math.sin(theta) * r * 0.85 + 0.5;
    const scale = 0.7 + (z - 0.5) * 0.3;
    const opacity = 0.5 + (z - 0.5) * 0.5;
    return { skill, x, y, z, scale, opacity };
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

        <div className="card overflow-hidden">
          <div
            ref={containerRef}
            className="relative w-full h-[400px] md:h-[500px] overflow-hidden"
          >
            {/* Constellation lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {nodes.map((n1, i) =>
                nodes.map((n2, j) => {
                  if (i >= j) return null;
                  const dx = n1.x - n2.x;
                  const dy = n1.y - n2.y;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  if (dist > 0.4) return null;
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={`${n1.x * 100}%`}
                      y1={`${(n1.y * 0.5 + 0.25) * 100}%`}
                      x2={`${n2.x * 100}%`}
                      y2={`${(n2.y * 0.5 + 0.25) * 100}%`}
                      stroke="rgba(176, 137, 104, 0.15)"
                      strokeWidth="1"
                    />
                  );
                })
              )}
            </svg>

            {/* Skill nodes */}
            {nodes.map((node) => (
              <div
                key={node.skill.name}
                className="absolute font-sans text-xs px-4 py-2 rounded-full transition-all duration-300 cursor-default group bg-white border border-border shadow-sm"
                style={{
                  left: `${node.x * 100}%`,
                  top: `${(node.y * 0.5 + 0.25) * 100}%`,
                  transform: `translate(-50%, -50%) scale(${node.scale})`,
                  opacity: node.opacity,
                  color: '#1A1A1A',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = '1';
                  el.style.borderColor = '#B08968';
                  el.style.backgroundColor = '#B08968';
                  el.style.color = '#FFFFFF';
                  el.style.transform = `translate(-50%, -50%) scale(${node.scale * 1.15})`;
                  el.style.boxShadow = '0 4px 20px rgba(176, 137, 104, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = String(node.opacity);
                  el.style.borderColor = '#E5E5E5';
                  el.style.backgroundColor = '#FFFFFF';
                  el.style.color = '#1A1A1A';
                  el.style.transform = `translate(-50%, -50%) scale(${node.scale})`;
                  el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                }}
              >
                {node.skill.name}
              </div>
            ))}

            {/* Center glow */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(176,137,104,0.12) 0%, transparent 70%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticSkillSphere;
