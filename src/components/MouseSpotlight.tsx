import { useSmoothMousePosition } from '../hooks/useMousePosition';

const MouseSpotlight = () => {
  const { x, y } = useSmoothMousePosition(0.08);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  if (isTouchDevice) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 107, 53, 0.07), transparent 60%)`,
      }}
    />
  );
};

export default MouseSpotlight;
