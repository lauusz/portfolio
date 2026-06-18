import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className = '', hover = true }: GlassCardProps) => {
  return (
    <div
      className={`
        bg-surface/80 backdrop-blur-xl border border-white/[0.08] rounded-xl
        transition-all duration-300
        ${hover ? 'hover:border-accent/30 hover:shadow-[0_0_30px_rgba(255,107,53,0.1)] hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
