import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText('Full-Stack Developer');
      return;
    }

    const texts = ['Full-Stack Developer', 'AI Engineer', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeText = () => {
      const currentText = texts[textIndex];

      if (isDeleting) {
        setDisplayText((current) => current.substring(0, current.length - 1));
        charIndex--;
      } else {
        setDisplayText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex >= currentText.length) {
        isDeleting = true;
        timeoutRef.current = setTimeout(typeText, 1500);
      } else if (isDeleting && charIndex <= 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        charIndex = 0;
        timeoutRef.current = setTimeout(typeText, 500);
      } else {
        timeoutRef.current = setTimeout(typeText, isDeleting ? 60 : 100);
      }
    };

    timeoutRef.current = setTimeout(typeText, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [prefersReducedMotion]);

  // Magnetic effect for buttons (strength 0.3)
  const handleMagneticMoveBtn = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      const f = 1 - dist / 100;
      el.style.transform = `translate(${dx * 0.3 * f}px, ${dy * 0.3 * f}px)`;
      el.style.transition = 'transform 0.15s ease-out';
    } else {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.3s ease-out';
    }
  }, []);

  const handleMagneticLeaveBtn = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.3s ease-out';
  }, []);

  // Ripple effect on click
  const handleRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple-expand 0.6s ease-out forwards';
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }, []);

  // Name split into characters
  const firstName = 'NIKOLAUS';
  const lastName = 'SATRIA';

  const leftColumnVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const nameContainerVariants = {
    hidden: {},
    visible: {
      transition: { duration: 0, staggerChildren: 0.03 },
    },
  };

  const charContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.03 },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const visualVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.6 },
    },
  };

  return (
    <section
      id="home"
      className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden z-10"
    >
      {/* Ripple keyframes */}
      <style>{`
        @keyframes ripple-expand {
          0% { width: 0; height: 0; opacity: 0.5; }
          100% { width: 300px; height: 300px; opacity: 0; }
        }
      `}</style>

      {/* Floating shapes - background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-20 h-20 border border-accent/20 rounded-lg animate-float opacity-10" />
        <div className="absolute top-1/3 left-10 w-16 h-16 border border-cta/20 rounded-full animate-float opacity-10" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-primary/10 rounded-xl rotate-12 animate-float opacity-10" style={{ animationDelay: '4s', animationDuration: '10s' }} />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 pt-16 md:pt-20 pb-16 md:pb-0">
        {/* Left column — text */}
        <motion.div
          className="w-full md:w-[60%] space-y-6 text-center md:text-left"
          variants={prefersReducedMotion ? {} : leftColumnVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.p
            variants={prefersReducedMotion ? {} : itemVariants}
            className="text-muted uppercase tracking-wider text-sm font-medium"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.div
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            style={{ perspective: '1000px' }}
            variants={prefersReducedMotion ? {} : nameContainerVariants}
          >
            <motion.span
              variants={prefersReducedMotion ? {} : charContainerVariants}
              className="block text-text"
            >
              {firstName.split('').map((char, i) => (
                <motion.span
                  key={`first-${i}`}
                  variants={prefersReducedMotion ? {} : charVariants}
                  className="inline-block"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              variants={prefersReducedMotion ? {} : { hidden: {}, visible: { transition: { staggerChildren: 0.03, delayChildren: 0.21 } } }}
              className="block text-accent"
            >
              {lastName.split('').map((char, i) => (
                <motion.span
                  key={`last-${i}`}
                  variants={prefersReducedMotion ? {} : charVariants}
                  className="inline-block"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </motion.div>

          {/* Typing subtitle */}
          <motion.div
            variants={prefersReducedMotion ? {} : itemVariants}
            className="flex items-center justify-center md:justify-start gap-3 text-primary font-mono text-xl md:text-2xl h-10"
          >
            <Terminal className="text-accent shrink-0" size={24} />
            <div className="flex items-center overflow-hidden">
              <span>{displayText}</span>
              <motion.span
                className="inline-block w-0.5 h-6 md:h-7 bg-accent ml-0.5"
                animate={{ opacity: cursorVisible ? 1 : 0 }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={prefersReducedMotion ? {} : itemVariants}
            className="text-primary text-lg md:text-xl max-w-lg mx-auto md:mx-0"
          >
            I build exceptional digital experiences that combine elegant design with efficient functionality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={prefersReducedMotion ? {} : itemVariants}
            className="flex flex-wrap gap-4 justify-center md:justify-start pt-4"
          >
            <a
              href="#projects"
              className="btn btn-primary"
              onMouseMove={handleMagneticMoveBtn}
              onMouseLeave={handleMagneticLeaveBtn}
              onClick={handleRipple}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="btn btn-outline"
              onMouseMove={handleMagneticMoveBtn}
              onMouseLeave={handleMagneticLeaveBtn}
              onClick={handleRipple}
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — decorative visual (hidden on mobile) */}
        <motion.div
          className="hidden md:flex w-full md:w-[40%] justify-center items-center"
          variants={prefersReducedMotion ? {} : visualVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />

            {/* Floating shapes */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border border-accent/20 rounded-lg bg-accent/5 animate-float opacity-20" />
            <div className="absolute top-1/2 -left-8 w-16 h-16 border border-cta/20 rounded-full bg-accent/5 animate-float opacity-20" style={{ animationDelay: '2s', animationDuration: '8s' }} />
            <div
              className="absolute -bottom-4 -right-4 w-16 h-16 border border-accent/20 bg-accent/5 animate-float opacity-20"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                animationDelay: '4s',
                animationDuration: '10s',
              }}
            />

            {/* Glass card */}
            <div className="relative h-full bg-surface/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden p-8 animate-float hover:border-accent/30 hover:shadow-[0_0_30px_rgba(255,107,53,0.1)] transition-all duration-300 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center w-full space-y-6">
                <div className="text-accent">
                  <Terminal size={64} strokeWidth={1.5} />
                </div>
                <div className="w-full space-y-3">
                  <div className="h-3 bg-primary/20 rounded-full w-full" />
                  <div className="h-3 bg-primary/20 rounded-full w-5/6" />
                  <div className="h-3 bg-primary/20 rounded-full w-4/6" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
