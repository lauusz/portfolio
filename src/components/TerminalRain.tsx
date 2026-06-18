import { useEffect, useRef } from 'react';

const TerminalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const resize = () => {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(2, 2);
    };

    resize();

    const CHARS = '01<>{}[]//\\|~`!@#$%^&*()-_=+;:\'",.?';
    const FONT_SIZE = 14;
    const COLUMNS = Math.floor(window.innerWidth / FONT_SIZE);
    const drops: number[] = Array(COLUMNS).fill(1).map(() => Math.random() * -100);
    const speeds: number[] = Array(COLUMNS).fill(0).map(() => Math.random() * 0.5 + 0.2);

    let raf: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // Random color: mostly cyan, some pink, very few green
        const rand = Math.random();
        if (rand > 0.95) {
          ctx.fillStyle = 'rgba(255, 42, 109, 0.15)';
        } else if (rand > 0.92) {
          ctx.fillStyle = 'rgba(57, 255, 20, 0.15)';
        } else {
          ctx.fillStyle = 'rgba(0, 240, 255, 0.12)';
        }

        ctx.fillText(text, x, y);

        drops[i] += speeds[i];

        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};

export default TerminalRain;
