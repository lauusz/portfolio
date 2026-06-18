import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { navLinks } from '../constants/data';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Scroll listener for background + active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 120;
      let current = 'home';
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.querySelector(navLinks[i].path);
        if (section) {
          const offsetTop = (section as HTMLElement).offsetTop;
          if (scrollPosition >= offsetTop) {
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Magnetic effect handlers
  const handleMagneticMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      const f = 1 - dist / 100;
      el.style.transform = `translate(${dx * 0.15 * f}px, ${dy * 0.15 * f}px)`;
      el.style.transition = 'transform 0.15s ease-out';
    } else {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.3s ease-out';
    }
  }, []);

  const handleMagneticLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.3s ease-out';
  }, []);

  const logoText = 'Nikolaus Satria';
  const logoChars = logoText.split('');

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const logoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
  };

  const logoCharVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 md:h-20 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="section-container h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 text-accent font-bold text-lg md:text-xl tracking-tight">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BrainCircuit className="w-6 h-6 md:w-7 md:h-7" />
          </motion.div>
          <motion.span
            className="flex"
            variants={prefersReducedMotion ? {} : logoContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {logoChars.map((char, i) => (
              <motion.span
                key={i}
                variants={prefersReducedMotion ? {} : logoCharVariants}
                className="inline-block"
                style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const sectionId = link.path.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.path}
                className="nav-link transition-transform duration-300"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
              >
                <span className={`relative z-10 ${isActive ? 'text-accent' : ''}`}>{link.name}</span>
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent rounded-full origin-center transition-transform duration-300 pointer-events-none"
                  style={{
                    width: '75%',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </a>
            );
          })}
        </nav>

        {/* Mobile Hamburger / Close Button */}
        <button
          className="md:hidden relative z-50 text-text p-2 rounded-lg hover:bg-white/5 transition-colors"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Full-screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 md:hidden bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center"
          >
            <motion.nav
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center space-y-8"
            >
              {navLinks.map((link) => {
                const sectionId = link.path.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={link.name}
                    href={link.path}
                    variants={linkVariants}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    onClick={closeMenu}
                    className={`nav-link text-2xl ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
