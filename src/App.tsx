import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TerminalRain from './components/TerminalRain';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import BootScreen from './components/BootScreen';
import TerminalChatbot from './components/TerminalChatbot';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import SkillSphere from './components/SkillSphere';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VisitorTerminal from './components/VisitorTerminal';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [booted, setBooted] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    document.title = 'nikolaus@satria:~$ portfolio';
  }, []);

  useEffect(() => {
    if (!booted) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const el = document.querySelector(href);
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.5 });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleClick);
    };
  }, [booted]);

  const handleBootComplete = () => {
    setBooted(true);
  };

  return (
    <div className="min-h-screen bg-void text-text overflow-x-hidden relative">
      {/* Boot Sequence */}
      {!booted && <BootScreen onComplete={handleBootComplete} />}

      {/* Global effects */}
      {booted && (
        <>
          <TerminalRain />
          <CustomCursor />
          <ScrollProgress />
          <TerminalChatbot />
        </>
      )}

      {/* Grid overlay */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-[1] opacity-30" />

      {/* Header */}
      <Header />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />

        {/* 3D Skill Sphere Section */}
        <section className="section-padding relative">
          <div className="section-container">
            <div className="mb-12">
              <p className="font-mono text-sm text-muted mb-2">
                <span className="text-primary">$</span> three.js --render skill-sphere
              </p>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-text">
                SKILL <span className="text-primary">SPHERE</span>
              </h2>
              <p className="font-mono text-xs text-muted mt-2">
                <span className="text-secondary">{'>'}</span> Drag to rotate. Hover to explore.
              </p>
            </div>
            <div className="terminal-window">
              <div className="terminal-window-header">
                <div className="terminal-window-dot red" />
                <div className="terminal-window-dot yellow" />
                <div className="terminal-window-dot green" />
                <span className="font-mono text-xs text-muted ml-2">3d-renderer.js</span>
              </div>
              <SkillSphere />
            </div>
          </div>
        </section>

        <Projects />
        <Contact />
      </main>

      <Footer />
      <VisitorTerminal />
    </div>
  );
}

export default App;
