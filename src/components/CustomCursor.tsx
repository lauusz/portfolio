import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, label')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.2,
        y: prev.y + (targetRef.current.y - prev.y) * 0.2,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor block */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{
          border: isHovering ? '1px solid rgba(0, 240, 255, 0.6)' : 'none',
          backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 240, 255, 0.8)',
          boxShadow: isHovering
            ? '0 0 15px rgba(0, 240, 255, 0.3)'
            : '0 0 8px rgba(0, 240, 255, 0.6)',
        }}
      />
      {/* Crosshair lines */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: position.x,
          top: 0,
          width: '1px',
          height: '100vh',
          background: 'linear-gradient(to bottom, transparent, rgba(0, 240, 255, 0.03), transparent)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      />
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: 0,
          top: position.y,
          width: '100vw',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(0, 240, 255, 0.03), transparent)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      />
    </>
  );
};

export default CustomCursor;
