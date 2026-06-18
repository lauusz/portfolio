import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHover = !!target.closest('a, button, [role="button"], input, textarea, label');
      isHoveringRef.current = isHover;
      if (isHover) {
        ring.style.width = '40px';
        ring.style.height = '40px';
        ring.style.borderColor = 'rgba(0, 240, 255, 0.6)';
        ring.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
        dot.style.opacity = '0';
      } else {
        ring.style.width = '24px';
        ring.style.height = '24px';
        ring.style.borderColor = 'rgba(0, 240, 255, 0.4)';
        ring.style.backgroundColor = 'transparent';
        dot.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.18;

      const x = posRef.current.x;
      const y = posRef.current.y;

      dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      ring.style.transform = `translate(${x - 12}px, ${y - 12}px)`;

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
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary pointer-events-none z-[9999]"
        style={{
          opacity: 0,
          transition: 'opacity 0.15s',
          boxShadow: '0 0 6px rgba(0, 240, 255, 0.6)',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-6 h-6 border border-primary/40 rounded-full pointer-events-none z-[9998]"
        style={{
          opacity: 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.15s, border-color 0.2s, background-color 0.2s',
        }}
      />
    </>
  );
};

export default CustomCursor;
