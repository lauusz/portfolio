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
      {/* Floating Pill Navbar */}
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled
            ? 'top-4 shadow-lg shadow-black/5'
            : 'top-6 shadow-sm shadow-black/5'
        }`}
      >
        <div
          className={`flex items-center gap-2 px-2 py-2 rounded-full border transition-all duration-500 ${
            isScrolled
              ? 'bg-white/90 backdrop-blur-xl border-border/80'
              : 'bg-white/70 backdrop-blur-lg border-border/40'
          }`}
        >
          {/* Logo — inside the pill */}
          <a
            href="#home"
            className="font-sans text-sm font-semibold text-primary tracking-tight px-4 py-2 hidden sm:block"
          >
            Nikolaus<span className="text-accent">.</span>
          </a>

          {/* Desktop Nav — compact pill items */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.path.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.path}
                  className={`relative font-sans text-sm px-4 py-2 rounded-full transition-all duration-300 ${
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

          {/* Mobile: Logo (small) */}
          <a href="#home" className="md:hidden font-sans text-sm font-semibold text-primary px-3">
            N<span className="text-accent">.</span>
          </a>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2.5 rounded-full bg-surface-elevated text-primary hover:bg-accent hover:text-white transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu — floating panel below pill */}
      <div
        className={`fixed top-24 left-1/2 -translate-x-1/2 z-40 md:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border border-border rounded-2xl shadow-xl shadow-black/10 p-6 min-w-[280px]">
          <nav className="flex flex-col items-center gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="font-sans text-base text-muted hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-surface-elevated w-full text-center"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
