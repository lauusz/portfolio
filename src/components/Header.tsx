import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../constants/data';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPos = window.scrollY + 120;
      let current = 'home';
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.querySelector(navLinks[i].path);
        if (section) {
          const offsetTop = (section as HTMLElement).offsetTop;
          if (scrollPos >= offsetTop) {
            current = navLinks[i].path.replace('#', '');
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 md:h-20 ${isScrolled ? 'bg-void/90 border-b border-border' : 'bg-transparent'}`}>
      <div className="section-container h-full flex items-center justify-between">
        {/* Logo — static, no per-character animation */}
        <a href="#home" className="font-mono text-sm md:text-base text-primary flex items-center gap-1">
          <span className="text-secondary">[</span>
          <span className="text-accent">@</span>
          <span>nikolaus</span>
          <span className="text-muted">:</span>
          <span>satria</span>
          <span className="text-muted">:</span>
          <span>~$</span>
          <span className="text-secondary">]</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const sectionId = link.path.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.path}
                className={`font-mono text-xs px-4 py-2 transition-all duration-300 relative ${isActive ? 'text-primary' : 'text-muted hover:text-text'}`}
              >
                <span className="text-primary/50">./</span>
                {link.name.toLowerCase()}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-primary" style={{ boxShadow: '0 0 8px rgba(0, 240, 255, 0.6)' }} />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-primary" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu — simple CSS transition, no framer-motion */}
      <div
        className={`fixed inset-0 top-16 md:hidden bg-void/98 z-40 flex flex-col items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="font-mono text-xl text-muted hover:text-primary transition-colors"
            >
              <span className="text-primary/50">$</span> cd {link.name.toLowerCase()}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
