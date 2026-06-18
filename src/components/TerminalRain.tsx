import { useEffect, useRef } from 'react';

const TerminalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);
  const isTabActiveRef = useRef(true);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const CHARS = '01<>{}[]//\\|~`!@#$%^&*()-_=+;';
    const FONT_SIZE = 14;
    const MAX_COLUMNS = 50; // Reduced from window.innerWidth / 14
    const COLUMNS = Math.min(Math.floor(window.innerWidth / FONT_SIZE), MAX_COLUMNS);
    const drops: number[] = Array(COLUMNS).fill(0).map(() => Math.random() * -100);
    const speeds: number[] = Array(COLUMNS).fill(0).map(() => Math.random() * 0.5 + 0.2);

    // IntersectionObserver — pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Visibility API — pause when tab hidden
    const handleVisibility = () => { isTabActiveRef.current = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', handleVisibility);

    let frameCount = 0;

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);

      // Skip frames when not visible or tab hidden
      if (!isVisibleRef.current || !isTabActiveRef.current) return;

      // Skip every 2nd frame for performance (30fps instead of 60)
      frameCount++;
      if (frameCount % 2 !== 0) return;

      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * (window.innerWidth / COLUMNS);
        const y = drops[i] * FONT_SIZE;

        const rand = Math.random();
        if (rand > 0.95) {
          ctx.fillStyle = 'rgba(255, 42, 109, 0.12)';
        } else if (rand > 0.92) {
          ctx.fillStyle = 'rgba(57, 255, 20, 0.12)';
        } else {
          ctx.fillStyle = 'rgba(0, 240, 255, 0.1)';
        }

        ctx.fillText(text, x, y);
        drops[i] += speeds[i];

        if (y > window.innerHeight && Math.random() > 0.98) {
          drops[i] = 0;
        }
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.35 }}
    />
  );
};

export default TerminalRain;
