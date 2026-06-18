import { useState, useEffect } from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
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
    return Icon ? <Icon className="text-muted" size={16} /> : null;
  };

  return (
    <footer className="bg-void border-t border-border">
      <div className="section-container py-10 sm:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-mono text-sm">
            <Terminal className="text-primary" size={18} />
            <span className="text-primary">nikolaus@satria</span>
            <span className="text-muted">:~$</span>
          </div>

          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-border flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-all duration-300"
                aria-label={link.name}
              >
                {getIcon(link.icon)}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted">
            <span className="text-primary">{'>'}</span> &copy; {new Date().getFullYear()} Nikolaus Satria. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-xs text-muted hover:text-primary transition-colors">
              privacy_policy
            </a>
            <a href="#" className="font-mono text-xs text-muted hover:text-primary transition-colors">
              terms_of_service
            </a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-10 h-10 bg-void border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-void transition-all duration-300 z-50 ${
          showBackToTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' }}
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  );
};

export default Footer;
