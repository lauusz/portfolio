import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react';
import { socialLinks } from '../constants/data';
import * as LucideIcons from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="text-primary" size={18} /> : null;
  };

  const contactInfo = [
    { icon: <Mail className="text-primary" size={18} />, label: 'email', value: 'nikolaussatria@gmail.com' },
    { icon: <MapPin className="text-secondary" size={18} />, label: 'location', value: 'Surabaya, Indonesia' },
    { icon: <Phone className="text-accent" size={18} />, label: 'phone', value: '+62 819-3435-2011' },
  ];

  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-muted mb-2">
            <span className="text-primary">$</span> ping contact
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-text">
            GET <span className="text-primary">IN TOUCH</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="terminal-window flex items-center gap-4 p-4">
                  <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted">{item.label}</p>
                    <p className="font-mono text-sm text-text">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="font-mono text-xs text-muted mb-4">
                <span className="text-primary">$</span> social --list
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-border flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-all duration-300"
                    aria-label={link.name}
                  >
                    {getIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <div className="terminal-window">
              <div className="terminal-window-header">
                <div className="terminal-window-dot red" />
                <div className="terminal-window-dot yellow" />
                <div className="terminal-window-dot green" />
                <span className="font-mono text-xs text-muted ml-2">message.sh</span>
              </div>
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-muted block mb-1">
                      <span className="text-primary">$</span> name=
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-void border border-border px-4 py-3 font-mono text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300"
                      placeholder="your_name"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted block mb-1">
                      <span className="text-primary">$</span> email=
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-void border border-border px-4 py-3 font-mono text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-muted block mb-1">
                    <span className="text-primary">$</span> subject=
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-void border border-border px-4 py-3 font-mono text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300"
                    placeholder="project_inquiry"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-muted block mb-1">
                    <span className="text-primary">$</span> message=
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-void border border-border px-4 py-3 font-mono text-sm text-text placeholder:text-muted focus:border-primary focus:outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 resize-none"
                    placeholder="tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-terminal-primary w-full flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="font-mono text-sm">sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} className="text-primary" />
                      <span className="font-mono text-sm">send_message</span>
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="font-mono text-xs text-accent bg-accent/10 border border-accent p-3 text-center">
                    {'>'} Message sent successfully!
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="font-mono text-xs text-secondary bg-secondary/10 border border-secondary p-3 text-center">
                    {'>'} Error sending message. Try again.
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
