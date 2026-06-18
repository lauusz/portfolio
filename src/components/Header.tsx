import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../constants/data';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
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
    <>
      {/* Floating Pill Navbar — wide, substantial */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <div
          className={`flex items-center justify-between w-full max-w-7xl rounded-full border transition-all duration-500 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl border-border/60 shadow-lg shadow-black/5 py-3 px-4 sm:px-6'
              : 'bg-white/80 backdrop-blur-lg border-border/30 shadow-md shadow-black/5 py-3 px-4 sm:px-6'
          }`}
        >
          {/* Logo — bold, left */}
          <a
            href="#home"
            className="font-sans text-base sm:text-lg font-bold text-primary tracking-tight shrink-0"
          >
            Nikolaus<span className="text-accent">.</span>
          </a>

          {/* Desktop Nav — centered, generous spacing */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.path.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.path}
                  className={`relative font-sans text-sm px-4 py-2 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                    isActive
                      ? 'text-primary font-medium bg-surface-elevated'
                      : 'text-muted hover:text-primary hover:bg-surface-elevated/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right side: CTA pill + mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop CTA — dark pill inside the white pill */}
            <a
              href="#contact"
              className="hidden md:inline-flex font-sans text-sm font-medium px-5 py-2.5 rounded-full bg-primary text-white hover:bg-accent transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 shrink-0"
            >
              Contact
            </a>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2.5 rounded-full bg-surface-elevated text-primary hover:bg-primary hover:text-white transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-primary/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />

        {/* Floating menu panel */}
        <div
          className={`absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl border border-border rounded-3xl shadow-2xl shadow-black/10 p-6 transition-all duration-300 ${
            isOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <nav className="flex flex-col items-center gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const sectionId = link.path.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-sans text-base px-6 py-3 rounded-full transition-colors w-full text-center outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                    isActive
                      ? 'text-primary font-medium bg-surface-elevated'
                      : 'text-muted hover:text-primary hover:bg-surface-elevated'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="font-sans text-sm font-medium px-6 py-3 rounded-full bg-primary text-white hover:bg-accent transition-colors mt-2 w-full text-center outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
