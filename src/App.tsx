import { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import TerminalChatbot from './components/TerminalChatbot';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import StaticSkillSphere from './components/StaticSkillSphere';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.title = 'Nikolaus Satria — UI/UX Designer & Developer';
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 1.5,
      }}
    >
      <div className="min-h-screen bg-bg text-primary overflow-x-hidden relative selection:bg-accent/20">
        <TerminalChatbot />
        <Header />
        <main className="relative">
          <Hero />
          <About />
          <Skills />
          <StaticSkillSphere />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
