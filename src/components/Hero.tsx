import { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const texts = ['Full-Stack Developer', 'AI Engineer', 'Web Apps + Intelligent Systems'];
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
        timeoutRef.current = setTimeout(typeText, 1800);
      } else if (isDeleting && charIndex <= 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        charIndex = 0;
        timeoutRef.current = setTimeout(typeText, 500);
      } else {
        timeoutRef.current = setTimeout(typeText, isDeleting ? 50 : 100);
      }
    };

    timeoutRef.current = setTimeout(typeText, 800);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <section id="home" className="min-h-[100dvh] flex flex-col justify-center relative pt-16 md:pt-20">
      <div className="section-container">
        <div className="max-w-3xl relative">
          {/* Label */}
          <p className="font-sans text-sm text-accent font-medium uppercase tracking-widest mb-6">
            Full-Stack Developer / AI Engineer
          </p>

          {/* Name */}
          <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary mb-6 leading-[1.1]">
            Nikolaus
            <br />
            <span className="text-muted">Satria</span>
          </h1>

          {/* Typing tagline */}
          <div className="flex items-center gap-3 font-mono text-lg md:text-xl text-muted mb-10 h-8">
            <span className="text-accent">&gt;</span>
            <span className="text-primary">{displayText}</span>
            <span className="inline-block w-2 h-5 bg-accent" style={{ opacity: 1, animation: 'blink 1s step-end infinite' }} />
          </div>

          {/* Description */}
          <div className="max-w-2xl mb-10 space-y-4">
            <p className="font-sans text-base md:text-lg text-muted leading-relaxed">
              I build production-ready web apps, backend workflows, and AI-powered tools that turn messy ideas into useful products.
            </p>
            <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
              My focus is shipping practical software with React, TypeScript, Node.js, Python, and modern AI tooling, from frontend experience to API logic and automation.
            </p>
            <p className="font-sans text-xs md:text-sm text-accent-secondary uppercase tracking-[0.18em]">
              Open to collaboration on products, MVPs, and AI-powered ideas
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-outline">
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator — positioned at bottom-right, away from chatbot button */}
      <a
        href="#about"
        className="absolute bottom-8 right-6 sm:bottom-12 sm:right-12 flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors group"
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">Scroll</span>
        <div className="w-px h-10 bg-border group-hover:bg-accent transition-colors relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-muted group-hover:bg-accent transition-colors" />
        </div>
      </a>
    </section>
  );
};

export default Hero;
