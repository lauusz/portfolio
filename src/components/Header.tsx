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
      {/* Floating navbar: wide and touch-friendly on mobile, compact on desktop. */}
      <header className="fixed top-4 left-4 right-4 z-[70] md:top-6 md:left-1/2 md:right-auto md:-translate-x-1/2">
        <div
          className={`flex min-h-14 w-full items-center justify-between gap-2 rounded-full border px-2 py-1.5 transition-all duration-300 md:min-h-0 md:w-auto md:justify-start md:gap-1 md:px-1.5 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl border-border/60 shadow-lg shadow-black/10'
              : 'bg-white/85 backdrop-blur-lg border-border/40 shadow-md shadow-black/5'
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={handleNavClick('#home')}
            className="shrink-0 whitespace-nowrap px-3 py-2 font-sans text-base font-bold tracking-tight text-primary md:text-sm"
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

          <button
            className="grid min-h-12 min-w-12 place-items-center rounded-full bg-surface-elevated p-0 text-primary transition-colors duration-200 outline-none hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-accent/50 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu — backdrop + floating panel */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 motion-reduce:transition-none md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-primary/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
        <div
          id="mobile-navigation"
          className={`absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl shadow-black/10 p-5 transition-all duration-300 motion-reduce:transition-none ${
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
