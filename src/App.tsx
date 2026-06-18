import { useEffect } from 'react';
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
    document.title = 'nikolaus@satria:~$ portfolio';
  }, []);

  return (
    <div className="min-h-screen bg-void text-text overflow-x-hidden relative">
      {/* Terminal Chatbot only */}
      <TerminalChatbot />

      {/* Header */}
      <Header />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <StaticSkillSphere />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
