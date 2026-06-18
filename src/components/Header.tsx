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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 md:h-20 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
      <div className="section-container h-full flex items-center justify-between">
        {/* Logo — clean, elegant */}
        <a href="#home" className="font-sans text-lg font-semibold text-primary tracking-tight">
          Nikolaus<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav — clean, minimal links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const sectionId = link.path.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.path}
                className={`font-sans text-sm transition-all duration-300 ${isActive ? 'text-primary font-medium' : 'text-muted hover:text-primary'}`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-primary" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-16 md:hidden bg-white/98 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="font-sans text-xl text-muted hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
