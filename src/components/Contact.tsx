import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { socialLinks } from '../constants/data';
import * as LucideIcons from 'lucide-react';
import emailjs from 'emailjs-com';
import GlassCard from './GlassCard';
import AnimatedSection from './AnimatedSection';

const leftColumnVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const rightColumnVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const formFieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Email send error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  // Dynamic icon component from Lucide
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="text-accent" size={20} /> : null;
  };

  const contactInfo = [
    {
      icon: <Mail className="text-accent" size={20} />,
      label: 'Email',
      value: 'nikolaussatria@gmail.com',
    },
    {
      icon: <MapPin className="text-accent" size={20} />,
      label: 'Location',
      value: 'Surabaya, Indonesia',
    },
    {
      icon: <Phone className="text-accent" size={20} />,
      label: 'Phone',
      value: '+62 819-3435-2011',
    },
  ];

  // Magnetic hover handlers
  const handleMagneticMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const radius = 80;
    const strength = 0.4;

    if (distance < radius) {
      const factor = 1 - distance / radius;
      el.style.transform = `translate(${distanceX * strength * factor}px, ${distanceY * strength * factor}px)`;
      el.style.transition = 'transform 0.15s ease-out';
    } else {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.3s ease-out';
    }
  }, []);

  const handleMagneticLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
    e.currentTarget.style.transition = 'transform 0.3s ease-out';
  }, []);

  // Ripple effect on button click
  const createRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.opacity = '1';
    ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(2.5)';
      ripple.style.opacity = '0';
    });

    setTimeout(() => ripple.remove(), 600);
  }, []);

  return (
    <section id="contact" className="bg-background relative section-padding">
      {/* Gradient Orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <AnimatedSection>
            <p className="section-subtitle">LET&apos;S CONNECT</p>
            <h2 className="section-title">Get In Touch</h2>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Column — Contact Info */}
          <motion.div
            className="md:col-span-2"
            variants={leftColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 bg-surface/80 border border-white/[0.08] rounded-xl backdrop-blur-sm"
                >
                  <div
                    className="w-12 h-12 bg-surface border border-white/[0.08] rounded-lg flex items-center justify-center shrink-0"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">{item.label}</p>
                    <p className="text-sm text-primary">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-text mb-4">Connect With Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-surface border border-white/[0.08] rounded-lg flex items-center justify-center text-primary hover:border-accent/40 hover:text-accent transition-all duration-300"
                    aria-label={link.name}
                    onMouseMove={(e) => {
                      if (window.matchMedia('(hover: none)').matches) return;
                      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                      const el = e.currentTarget;
                      const rect = el.getBoundingClientRect();
                      const centerX = rect.left + rect.width / 2;
                      const centerY = rect.top + rect.height / 2;
                      const distanceX = e.clientX - centerX;
                      const distanceY = e.clientY - centerY;
                      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                      const radius = 80;
                      const strength = 0.4;
                      if (distance < radius) {
                        const factor = 1 - distance / radius;
                        el.style.transform = `translate(${distanceX * strength * factor}px, ${distanceY * strength * factor}px)`;
                        el.style.transition = 'transform 0.15s ease-out';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translate(0, 0)';
                      e.currentTarget.style.transition = 'transform 0.3s ease-out';
                    }}
                  >
                    {getIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column — Contact Form */}
          <motion.div
            className="md:col-span-3"
            variants={rightColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <GlassCard className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-text mb-6">Send A Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div custom={0} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder=" "
                        className="peer w-full bg-background/50 border border-white/[0.08] rounded-lg px-4 py-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 focus:shadow-[0_0_20px_rgba(255,107,53,0.1)] transition-all duration-300 pt-5"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-4 top-3 text-sm text-muted transition-all duration-300 peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
                      >
                        Your Name
                      </label>
                    </div>
                  </motion.div>

                  <motion.div custom={1} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder=" "
                        className="peer w-full bg-background/50 border border-white/[0.08] rounded-lg px-4 py-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 focus:shadow-[0_0_20px_rgba(255,107,53,0.1)] transition-all duration-300 pt-5"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 top-3 text-sm text-muted transition-all duration-300 peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
                      >
                        Your Email
                      </label>
                    </div>
                  </motion.div>
                </div>

                <motion.div custom={2} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="peer w-full bg-background/50 border border-white/[0.08] rounded-lg px-4 py-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 focus:shadow-[0_0_20px_rgba(255,107,53,0.1)] transition-all duration-300 pt-5"
                    />
                    <label
                      htmlFor="subject"
                      className="absolute left-4 top-3 text-sm text-muted transition-all duration-300 peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      Subject
                    </label>
                  </div>
                </motion.div>

                <motion.div custom={3} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder=" "
                      className="peer w-full bg-background/50 border border-white/[0.08] rounded-lg px-4 py-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 focus:shadow-[0_0_20px_rgba(255,107,53,0.1)] transition-all duration-300 pt-5 resize-none"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-4 top-3 text-sm text-muted transition-all duration-300 peer-focus:top-1 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      Message
                    </label>
                  </div>
                </motion.div>

                <motion.div custom={4} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={createRipple}
                    className={`btn btn-primary w-full mt-2 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.div>

                {submitStatus === 'success' && (
                  <div className="bg-cta/20 border border-cta text-text p-3 rounded-lg text-center text-sm animate-pulse">
                    Your message has been sent successfully!
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-500 text-text p-3 rounded-lg text-center text-sm">
                    There was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
