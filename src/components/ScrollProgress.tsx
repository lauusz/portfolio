import { useScrollProgress } from '../hooks/useScrollVelocity';

const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-transparent">
      <div
        className="h-full bg-accent origin-left"
        style={{
          width: `${progress * 100}%`,
          transition: 'width 0.1s linear',
          boxShadow: '0 0 10px rgba(255, 107, 53, 0.5)',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
