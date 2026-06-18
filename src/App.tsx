import { useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.title = "Nikolaus Satria | Portfolio";
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background text-text antialiased">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;