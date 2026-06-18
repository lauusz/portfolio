import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, BrainCircuit } from 'lucide-react';
import { socialLinks } from '../constants/data';
import * as LucideIcons from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Dynamic icon component from Lucide
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="text-primary" size={18} /> : null;
  };

  return (
    <footer className="bg-background border-t border-white/[0.08]">
      <div className="section-container py-10 sm:py-12">
        <AnimatedSection>
          {/* Top Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo + Name */}
            <div className="flex items-center gap-2 text-accent font-bold text-xl">
              <BrainCircuit className="w-6 h-6" />
              <span>Nikolaus Satria</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-surface border border-white/[0.08] rounded-lg flex items-center justify-center text-primary hover:border-accent/40 hover:text-accent transition-all duration-300"
                  aria-label={link.name}
                >
                  {getIcon(link.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="border-t border-white/[0.08] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted text-center md:text-left">
              © {currentYear} Nikolaus Satria. All rights reserved.
            </p>

            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-muted hover:text-accent transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted hover:text-accent transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,107,53,0.3)] hover:bg-opacity-90 hover:scale-110 transition-all duration-300 z-50"
        aria-label="Back to top"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.8,
          pointerEvents: showBackToTop ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;
