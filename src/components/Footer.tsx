import React from 'react';
import { ArrowUp, BrainCircuit } from 'lucide-react';
import { socialLinks } from '../constants/data';
import * as LucideIcons from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Dynamic icon component from Lucide
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="text-primary" size={18} /> : null;
  };

  return (
    <footer className="bg-background border-t border-primary/10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-accent font-bold text-xl mb-6 md:mb-0">
            <BrainCircuit className="w-6 h-6" />
            <span>Nikolaus Satria</span>
          </div>
          
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-primary hover:text-accent transition-colors duration-300"
                aria-label={link.name}
              >
                {getIcon(link.icon)}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-primary/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary text-sm mb-4 md:mb-0">
            &copy; {currentYear} Nikolaus Satria All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-primary hover:text-accent text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-primary hover:text-accent text-sm transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
      
      <a 
        href="#home" 
        className="fixed bottom-6 right-6 bg-accent p-3 rounded-full text-text shadow-lg hover:bg-opacity-90 transition-all duration-300 z-50"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};

export default Footer;