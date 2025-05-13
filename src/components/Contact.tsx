import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { socialLinks } from '../constants/data';
import * as LucideIcons from 'lucide-react';
import emailjs from 'emailjs-com';

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

  return (
    <section id="contact" className="bg-background relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="section-container relative z-10">
        <h2 className="section-title">Get In Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-background border border-primary/30 p-3 rounded-lg mr-4">
                  <Mail className="text-accent" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-primary">nikolaussatria@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-background border border-primary/30 p-3 rounded-lg mr-4">
                  <MapPin className="text-accent" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-primary">Surabaya, Indonesia</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-background border border-primary/30 p-3 rounded-lg mr-4">
                  <Phone className="text-accent" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-primary">+62 819-3435-2011</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background border border-primary/30 p-3 rounded-lg hover:border-accent hover:text-accent transition-all duration-300"
                    aria-label={link.name}
                  >
                    {getIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Send A Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-primary mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-primary/30 rounded-lg px-4 py-3 text-text focus:border-accent focus:outline-none transition-colors duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-primary mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-primary/30 rounded-lg px-4 py-3 text-text focus:border-accent focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-primary mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border border-primary/30 rounded-lg px-4 py-3 text-text focus:border-accent focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-primary mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-background border border-primary/30 rounded-lg px-4 py-3 text-text focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary w-full flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
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

              {submitStatus === 'success' && (
                <div className="bg-cta/20 border border-cta text-text p-3 rounded-lg text-center">
                  Your message has been sent successfully!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500 text-text p-3 rounded-lg text-center">
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;