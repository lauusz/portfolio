import { useEffect, useState, useRef } from 'react';
import { Terminal, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
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

  return (
    <section id="home" className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden pt-16 md:pt-20">
      <div className="section-container relative z-10">
        <div className="max-w-4xl">
          {/* Terminal prompt */}
          <p className="font-mono text-sm text-muted mb-6">
            <span className="text-primary">$</span> whoami
          </p>

          {/* Name — static, no per-character animation */}
          <h1 className="font-sans text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            <span className="text-text">NIKOLUS</span>{' '}
            <span className="text-primary">SATRIA</span>
          </h1>

          {/* Typing */}
          <div className="flex items-center gap-3 font-mono text-lg md:text-xl text-muted mb-8 h-8">
            <Terminal className="text-primary" size={20} />
            <span className="text-primary">&gt;</span>
            <span className="text-text">{displayText}</span>
            <span
              className="inline-block w-2 h-5 bg-primary"
              style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}
            />
          </div>

          {/* Tagline */}
          <p className="font-mono text-sm md:text-base text-muted max-w-xl leading-relaxed mb-10">
            <span className="text-secondary">//</span> I build exceptional digital experiences that combine elegant design with efficient functionality. Currently exploring AI, LLMs, and Web3.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-terminal-primary">
              <span className="text-primary/50">&gt;</span> view_projects
            </a>
            <a href="#contact" className="btn-terminal">
              <span className="text-muted">$</span> contact_me
            </a>
          </div>
        </div>

        {/* Static decorative code block */}
        <div className="absolute top-20 right-10 md:right-20 opacity-15 pointer-events-none hidden md:block">
          <pre className="font-mono text-primary text-xs leading-relaxed">
{`const dev = {
  name: 'Nikolaus',
  role: 'Full-Stack',
  stack: ['React', 'Node', 'AI'],
  status: 'available'
};`}
          </pre>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors"
      >
        <span className="font-mono text-xs">scroll_down</span>
        <ChevronDown className="animate-bounce" size={16} />
      </a>
    </section>
  );
};

export default Hero;
