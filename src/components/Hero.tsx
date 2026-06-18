import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
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
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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
      className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden bg-background"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-20 w-64 h-64 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-cta/5 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-64 h-64 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 pt-16 md:pt-20 pb-16 md:pb-0">
        {/* Left column — text */}
        <motion.div
          className="w-full md:w-1/2 space-y-6 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="text-muted uppercase tracking-wider text-sm font-medium"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text leading-tight tracking-tight"
          >
            <span className="block">Nikolaus</span>
            <span className="text-accent">Satria</span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center md:justify-start gap-3 text-primary font-mono text-xl md:text-2xl h-10"
          >
            <Terminal className="text-accent shrink-0" size={24} />
            <div className="flex items-center overflow-hidden">
              <span>{displayText}</span>
              <span
                className="inline-block w-0.5 h-6 md:h-7 bg-accent ml-0.5"
                style={{
                  opacity: cursorVisible ? 1 : 0,
                  transition: 'opacity 0.1s ease',
                }}
              />
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-primary text-lg md:text-xl max-w-lg mx-auto md:mx-0"
          >
            I build exceptional digital experiences that combine elegant design
            with efficient functionality.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center md:justify-start pt-4"
          >
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — decorative visual (hidden on mobile) */}
        <motion.div
          className="hidden md:flex w-full md:w-1/2 justify-center items-center"
          variants={visualVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
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

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary hover:text-accent transition-colors duration-300 flex flex-col items-center z-10"
      >
        <span className="mb-2 text-sm">Scroll Down</span>
        <ChevronDown className="animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;
