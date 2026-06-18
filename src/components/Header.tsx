import { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../constants/data';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lenis = useLenis();
  const pendingSectionRef = useRef<string | null>(null);

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

      if (pendingSectionRef.current) {
        if (current === pendingSectionRef.current) {
          pendingSectionRef.current = null;
          setActiveSection(current);
        } else {
          setActiveSection(pendingSectionRef.current);
        }
        return;
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

  const handleNavClick = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const sectionId = path.replace('#', '');
    pendingSectionRef.current = sectionId;
    setActiveSection(sectionId);
    setIsOpen(false);

    if (lenis) {
      lenis.scrollTo(path, {
        offset: 80,
        duration: 1,
        lock: true,
        onComplete: () => {
          pendingSectionRef.current = null;
          setActiveSection(sectionId);
        },
      });
      return;
    }

    const target = document.querySelector(path);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Compact floating capsule navbar */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div
          className={`flex items-center gap-1 rounded-full border transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl border-border/60 shadow-lg shadow-black/10 py-1.5 px-1.5'
              : 'bg-white/85 backdrop-blur-lg border-border/40 shadow-md shadow-black/5 py-1.5 px-1.5'
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={handleNavClick('#home')}
            className="font-sans text-sm font-bold text-primary tracking-tight px-3 py-2 shrink-0"
          >
            Nikolaus<span className="text-accent">.</span>
          </a>

          {/* Desktop Nav — compact, centered */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const sectionId = link.path.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={handleNavClick(link.path)}
                  className={`font-sans text-sm px-3 py-2 rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
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

          {/* Desktop CTA — dark pill inside the capsule */}
          <a
            href="#contact"
            onClick={handleNavClick('#contact')}
            className="hidden md:inline-flex font-sans text-sm font-medium px-4 py-2 rounded-full bg-primary text-white hover:bg-accent transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 shrink-0"
          >
            Contact
          </a>

          {/* Mobile: small logo + toggle */}
          <a href="#home" onClick={handleNavClick('#home')} className="md:hidden font-sans text-sm font-bold text-primary px-2">
            N<span className="text-accent">.</span>
          </a>

          <button
            className="md:hidden p-2 rounded-full bg-surface-elevated text-primary hover:bg-primary hover:text-white transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu — backdrop + floating panel */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-primary/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-black/10 p-5 transition-all duration-300 ${
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
                  onClick={handleNavClick(link.path)}
                  className={`font-sans text-base px-5 py-2.5 rounded-full transition-colors duration-200 w-full text-center outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
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
              onClick={handleNavClick('#contact')}
              className="font-sans text-sm font-medium px-5 py-2.5 rounded-full bg-primary text-white hover:bg-accent transition-colors duration-200 mt-1 w-full text-center outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
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
