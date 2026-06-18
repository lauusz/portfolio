import { useEffect, useState, useRef } from 'react';
import { useSmoothMousePosition } from '../hooks/useMousePosition';

const CustomCursor = () => {
  const { x, y } = useSmoothMousePosition(0.15);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const dotPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, label')) {
        setCursorState('hover');
      } else if (target.closest('p, h1, h2, h3, h4, h5, h6, span, .text-selectable')) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    // Animate dot position with faster lerp
    const animateDot = () => {
      dotPos.current.x += (x - dotPos.current.x) * 0.3;
      dotPos.current.y += (y - dotPos.current.y) * 0.3;
      rafRef.current = requestAnimationFrame(animateDot);
    };
    rafRef.current = requestAnimationFrame(animateDot);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [x, y]);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  if (isTouchDevice) return null;

  const dotSize = cursorState === 'hover' ? 0 : 8;
  const ringSize = cursorState === 'hover' ? 60 : cursorState === 'text' ? 24 : 40;
  const ringOpacity = cursorState === 'hover' ? 0.2 : cursorState === 'text' ? 0.15 : 0.5;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ opacity: isVisible ? 1 : 0 }}>
      {/* Inner dot */}
      <div
        className="fixed rounded-full bg-accent pointer-events-none"
        style={{
          width: dotSize,
          height: dotSize,
          left: dotPos.current.x - dotSize / 2,
          top: dotPos.current.y - dotSize / 2,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          opacity: dotSize > 0 ? 1 : 0,
        }}
      />
      {/* Outer ring */}
      <div
        className="fixed border border-accent/50 rounded-full pointer-events-none"
        style={{
          width: ringSize,
          height: ringSize,
          left: x - ringSize / 2,
          top: y - ringSize / 2,
          opacity: ringOpacity,
          backgroundColor: cursorState === 'hover' ? 'rgba(255, 107, 53, 0.15)' : 'transparent',
          transition: 'width 0.3s, height 0.3s, opacity 0.3s, background-color 0.3s',
          transform: cursorState === 'text' ? 'scaleX(0.3)' : 'scale(1)',
        }}
      />
    </div>
  );
};

export default CustomCursor;
