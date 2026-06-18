import { useRef, useEffect } from 'react';

export function useTiltEffect(ref: React.RefObject<HTMLElement | null>, maxTilt: number = 10) {
  const rafRef = useRef<number>(0);
  const currentTilt = useRef({ rotateX: 0, rotateY: 0 });
  const targetTilt = useRef({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      targetTilt.current = {
        rotateX: ((y - centerY) / centerY) * -maxTilt,
        rotateY: ((x - centerX) / centerX) * maxTilt,
      };
    };

    const handleMouseLeave = () => {
      targetTilt.current = { rotateX: 0, rotateY: 0 };
    };

    const animate = () => {
      const lerp = 0.1;
      currentTilt.current = {
        rotateX: currentTilt.current.rotateX + (targetTilt.current.rotateX - currentTilt.current.rotateX) * lerp,
        rotateY: currentTilt.current.rotateY + (targetTilt.current.rotateY - currentTilt.current.rotateY) * lerp,
      };
      
      el.style.transform = `perspective(1000px) rotateX(${currentTilt.current.rotateX}deg) rotateY(${currentTilt.current.rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ref, maxTilt]);
}

// Simpler inline version for one-off use
export function getTiltStyle(e: React.MouseEvent, el: HTMLElement, maxTilt: number = 10): React.CSSProperties {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -maxTilt;
  const rotateY = ((x - centerX) / centerX) * maxTilt;

  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    transition: 'transform 0.1s ease-out',
  };
}
