import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const texts = ['Full-Stack Developer', 'AI Engineer', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeText = () => {
      const currentText = texts[textIndex];
      if (isDeleting) {
        setDisplayText((c) => c.substring(0, c.length - 1));
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

    timeoutRef.current = setTimeout(typeText, 800);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const nameChars = 'NIKOLUS SATRIA'.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section id="home" className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden pt-16 md:pt-20">
      <div className="section-container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Terminal prompt */}
          <motion.p variants={itemVariants} className="font-mono text-sm text-muted mb-6">
            <span className="text-primary">$</span> whoami
          </motion.p>

          {/* Name */}
          <motion.h1 variants={itemVariants} className="font-sans text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className={`inline-block ${char === ' ' ? 'w-4' : ''} ${i >= 7 ? 'text-primary' : 'text-text'}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Typing */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 font-mono text-lg md:text-xl text-muted mb-8 h-8">
            <Terminal className="text-primary" size={20} />
            <span className="text-primary">&gt;</span>
            <span className="text-text">{displayText}</span>
            <span
              className="inline-block w-2 h-5 bg-primary"
              style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p variants={itemVariants} className="font-mono text-sm md:text-base text-muted max-w-xl leading-relaxed mb-10">
            <span className="text-secondary">//</span> I build exceptional digital experiences that combine elegant design with efficient functionality. Currently exploring AI, LLMs, and Web3.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-terminal-primary">
              <span className="text-primary/50">&gt;</span> view_projects
            </a>
            <a href="#contact" className="btn-terminal">
              <span className="text-muted">$</span> contact_me
            </a>
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-10 md:right-20 opacity-20 pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="font-mono text-primary text-xs leading-relaxed"
          >
            {`const dev = {
  name: 'Nikolaus',
  role: 'Full-Stack',
  stack: ['React', 'Node', 'AI'],
  status: 'available'
};`}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors"
      >
        <span className="font-mono text-xs">scroll_down</span>
        <ChevronDown className="animate-bounce" size={16} />
      </motion.a>
    </section>
  );
};

export default Hero;
