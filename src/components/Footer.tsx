import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { socialLinks } from '../constants/data';
import * as LucideIcons from 'lucide-react';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="text-muted" size={18} /> : null;
  };

  return (
    <footer className="bg-surface border-t border-border">
      <div className="section-container py-12 sm:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-sans text-lg font-semibold text-primary tracking-tight">
              Nikolaus<span className="text-accent">.</span>
            </span>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-surface-elevated rounded-full flex items-center justify-center text-muted hover:bg-accent hover:text-white transition-all duration-300"
                aria-label={link.name}
              >
                {getIcon(link.icon)}
              </a>
            ))}
          </div>
        </div>

        <div className="divider mt-10 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-muted">
            &copy; {new Date().getFullYear()} Nikolaus Satria. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-xs text-muted hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-sans text-xs text-muted hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent transition-all duration-300 z-50 shadow-lg shadow-black/10 ${
          showBackToTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  );
};

export default Footer;
