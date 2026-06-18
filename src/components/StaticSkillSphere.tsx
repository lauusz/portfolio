import { useRef } from 'react';
import { skills } from '../constants/data';

const StaticSkillSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fibonacci sphere distribution for even placement on 2D
  const phi = Math.PI * (3 - Math.sqrt(5));
  const nodes = skills.map((skill, i) => {
    const y = 1 - (i / (skills.length - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r * 0.85 + 0.5; // Center at 50%
    const z = Math.sin(theta) * r * 0.85 + 0.5;
    const scale = 0.7 + (z - 0.5) * 0.3; // Front items larger
    const opacity = 0.5 + (z - 0.5) * 0.5; // Front items brighter
    return { skill, x, y, z, scale, opacity };
  });

  return (
    <section className="section-padding relative">
      <div className="section-container">
        <div className="mb-12">
          <p className="font-mono text-sm text-muted mb-2">
            <span className="text-primary">$</span> ls -la skills/
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-text">
            SKILL <span className="text-primary">SPHERE</span>
          </h2>
          <p className="font-mono text-xs text-muted mt-2">
            <span className="text-secondary">{'>'}</span> Hover nodes to explore
          </p>
        </div>

        <div className="terminal-window">
          <div className="terminal-window-header">
            <div className="terminal-window-dot red" />
            <div className="terminal-window-dot yellow" />
            <div className="terminal-window-dot green" />
            <span className="font-mono text-xs text-muted ml-2">skill-matrix.json</span>
          </div>
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
                      stroke="rgba(0, 240, 255, 0.08)"
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
                className="absolute font-mono text-xs px-3 py-1.5 border transition-all duration-300 cursor-default group"
                style={{
                  left: `${node.x * 100}%`,
                  top: `${(node.y * 0.5 + 0.25) * 100}%`,
                  transform: `translate(-50%, -50%) scale(${node.scale})`,
                  opacity: node.opacity,
                  borderColor: `rgba(0, 240, 255, ${node.opacity * 0.3})`,
                  color: `rgba(0, 240, 255, ${node.opacity})`,
                  backgroundColor: `rgba(0, 240, 255, ${node.opacity * 0.05})`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = '1';
                  el.style.borderColor = 'rgba(0, 240, 255, 0.8)';
                  el.style.backgroundColor = 'rgba(0, 240, 255, 0.15)';
                  el.style.transform = `translate(-50%, -50%) scale(${node.scale * 1.2})`;
                  el.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.opacity = String(node.opacity);
                  el.style.borderColor = `rgba(0, 240, 255, ${node.opacity * 0.3})`;
                  el.style.backgroundColor = `rgba(0, 240, 255, ${node.opacity * 0.05})`;
                  el.style.transform = `translate(-50%, -50%) scale(${node.scale})`;
                  el.style.boxShadow = 'none';
                }}
              >
                {node.skill.name}
              </div>
            ))}

            {/* Center glow */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticSkillSphere;
