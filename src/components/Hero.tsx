import { useEffect, useState, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const texts = ['UI/UX Designer', 'Full-Stack Developer', 'AI Engineer'];
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
        <div className="max-w-3xl">
          {/* Label */}
          <p className="font-sans text-sm text-accent font-medium uppercase tracking-widest mb-6">
            UI/UX Designer & Developer
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
          <p className="font-sans text-base md:text-lg text-muted max-w-xl leading-relaxed mb-10">
            I design thoughtful digital experiences and build them with clean code. 
            Currently exploring the intersection of AI, design, and human interaction.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn-outline">
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors"
      >
        <span className="font-sans text-xs tracking-wider uppercase">Scroll</span>
        <ArrowDown className="animate-bounce" size={16} />
      </a>
    </section>
  );
};

export default Hero;
