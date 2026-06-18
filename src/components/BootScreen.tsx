import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  const bootLines = [
    { text: 'BOOT SYSTEM v3.0.1', delay: 100 },
    { text: '[OK] Initializing kernel...', delay: 200 },
    { text: '[OK] Loading neural network modules...', delay: 300 },
    { text: '[OK] React v18.3.1 loaded', delay: 100 },
    { text: '[OK] TypeScript compiler initialized', delay: 150 },
    { text: '[OK] Node.js runtime detected', delay: 100 },
    { text: '[OK] Loading skills: React, Next.js, Python, Docker...', delay: 300 },
    { text: '[OK] GSAP animation engine mounted', delay: 150 },
    { text: '[OK] Three.js 3D renderer initialized', delay: 200 },
    { text: '[OK] Portfolio modules mounted', delay: 200 },
    { text: '[OK] Establishing secure connection...', delay: 250 },
    { text: 'System ready.', delay: 300 },
    { text: '', delay: 100 },
    { text: '> Welcome, user.', delay: 500 },
    { text: '> Press [ENTER] to initialize portfolio...', delay: 0 },
  ];

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const showNextLine = () => {
      if (currentIndex < bootLines.length) {
        setLines((prev) => [...prev, bootLines[currentIndex].text]);
        timeoutId = setTimeout(showNextLine, bootLines[currentIndex].delay);
        currentIndex++;
      } else {
        // Auto-complete after 2 seconds if user doesn't press Enter
        timeoutId = setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 800);
        }, 2000);
      }
    };

    timeoutId = setTimeout(showNextLine, 300);

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(blink);
  }, []);

  const handleClick = () => {
    if (!done && lines.length >= bootLines.length - 1) {
      setDone(true);
      setTimeout(onComplete, 800);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !done && lines.length >= bootLines.length - 1) {
      setDone(true);
      setTimeout(onComplete, 800);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [done, lines.length]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-void flex items-center justify-center"
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        onClick={handleClick}
      >
        <div className="w-full max-w-2xl px-6 font-mono text-sm md:text-base">
          <div className="mb-4 text-primary">
            {'╔══════════════════════════════════════╗'}
          </div>

          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="mb-1 leading-relaxed"
            >
              {line.startsWith('[OK]') ? (
                <span>
                  <span className="text-accent">[OK]</span>
                  <span className="text-muted"> {line.replace('[OK] ', '')}</span>
                </span>
              ) : line.startsWith('>') ? (
                <span className="text-primary">{line}</span>
              ) : line === 'System ready.' ? (
                <span className="text-accent">{line}</span>
              ) : (
                <span className="text-muted">{line}</span>
              )}
            </motion.div>
          ))}

          {lines.length >= bootLines.length - 1 && !done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-primary"
            >
              <span
                className="inline-block w-2 h-4 bg-primary"
                style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
              />
            </motion.div>
          )}

          <div className="mt-4 text-primary">
            {'╚══════════════════════════════════════╝'}
          </div>

          {lines.length >= bootLines.length - 1 && !done && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center text-xs text-muted"
            >
              Press [ENTER] or click anywhere to continue
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BootScreen;
