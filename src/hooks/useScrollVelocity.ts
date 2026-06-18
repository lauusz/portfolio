import { useState, useEffect, useRef } from 'react';

interface ScrollVelocity {
  velocity: number;
  direction: 'up' | 'down' | 'none';
}

export function useScrollVelocity(): ScrollVelocity {
  const [velocity, setVelocity] = useState<ScrollVelocity>({ velocity: 0, direction: 'none' });
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = currentTime - lastTime.current;

      if (deltaTime > 0) {
        const rawVelocity = deltaY / deltaTime;
        const smoothedVelocity = rawVelocity * 10; // Scale for usable range
        const clampedVelocity = Math.max(-2, Math.min(2, smoothedVelocity));

        setVelocity({
          velocity: clampedVelocity,
          direction: deltaY > 0.5 ? 'down' : deltaY < -0.5 ? 'up' : 'none',
        });
      }

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    const tick = () => {
      handleScroll();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return velocity;
}

// Scroll progress (0 to 1)
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
