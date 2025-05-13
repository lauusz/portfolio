import React, { useEffect, useState } from 'react';
import { ChevronDown, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  // const terminalRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    const texts = ["Full-Stack Developer", "AI Engineer", "Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeText = () => {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        // Delete mode
        setDisplayText(current => current.substring(0, current.length - 1));
        charIndex--;
      } else {
        // Type mode
        setDisplayText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }
      
      // Determine next state
      if (!isDeleting && charIndex === currentText.length) {
        // Finished typing, pause then delete
        isDeleting = true;
        setTimeout(typeText, 750); // Longer pause at the end of typing
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next text
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 500); // Pause before typing next phrase
      } else {
        // Continue current operation with slower typing
        setTimeout(typeText, isDeleting ? 100 : 100); // Increased delays for both typing and deleting
      }
    };
    
    // Start the typing effect with initial delay
    setTimeout(typeText, 500);
    
    return () => {
      // Cleanup would go here if needed
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-10 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cta/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="section-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-text leading-tight">
            <span className="block">Hi, I'm</span>
            <span className="text-accent">Nikolaus Satria</span>
          </h1>
          
          <div className="flex items-center space-x-2 text-primary font-mono text-xl md:text-2xl py-4">
            <Terminal className="text-accent" size={24} />
            <div className="overflow-hidden h-8">
              <div className="inline-block border-r-2 border-accent pr-1 h-8 animate-blink">
                {displayText}
              </div>
            </div>
          </div>
          
          <p className="text-primary text-lg md:text-xl max-w-lg">
            I build exceptional digital experiences that combine elegant design with efficient functionality.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>
        </div>
        
        <div className="md:w-1/2 p-8 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-accent/20 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="relative bg-background border-2 border-accent/30 rounded-2xl overflow-hidden p-8 animate-float">
              <div className="relative z-10 flex flex-col h-full justify-center">
                <div className="text-accent mb-4 flex justify-center">
                  <Terminal size={64} />

                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-primary/20 rounded-full w-full"></div>
                  <div className="h-3 bg-primary/20 rounded-full w-5/6"></div>
                  <div className="h-3 bg-primary/20 rounded-full w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary hover:text-accent transition-colors duration-300 flex flex-col items-center"
      >
        <span className="mb-2 text-sm">Scroll Down</span>
        <ChevronDown className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;