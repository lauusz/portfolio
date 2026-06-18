import { useState } from 'react';
import { contactInfo, mailtoLink } from '../constants/data';
import { Mail, MapPin, CheckCircle, Send, Copy, Check, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `${mailtoLink}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container">
        <div className="mb-16">
          <p className="font-sans text-sm text-accent font-medium uppercase tracking-widest mb-3">
            Let's Connect
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
            Get in
            <br />
            <span className="text-muted">Touch</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="card p-6 sm:p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-elevated rounded-full flex items-center justify-center text-accent">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-muted uppercase tracking-wider">Email</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <a
                        href={mailtoLink}
                        className="font-sans text-sm text-primary hover:text-accent transition-colors inline-flex items-center gap-2"
                      >
                        {contactInfo.email}
                        <ExternalLink size={14} className="text-muted" />
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="font-sans text-sm text-muted hover:text-accent transition-colors inline-flex items-center gap-2"
                      >
                        {copied ? 'Copied' : 'Copy'}
                        {copied ? <Check size={14} className="text-accent-secondary" /> : <Copy size={14} className="text-muted" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-elevated rounded-full flex items-center justify-center text-accent-secondary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-muted uppercase tracking-wider">Location</p>
                    <p className="font-sans text-sm text-primary">{contactInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-elevated rounded-full flex items-center justify-center text-accent">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-muted uppercase tracking-wider">OPEN TO</p>
                    <p className="font-sans text-sm text-accent-secondary">{contactInfo.status}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="font-sans text-base text-muted leading-relaxed">
              I&apos;m most interested in collaborating on product ideas, digital businesses, and AI experiments where I can help turn direction into working software.
            </p>
          </div>

          {/* Contact form */}
          <div className="card p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="label">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="label">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="label">Message</label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <div className="space-y-3">
                <button
                  type="submit"
                  className="btn-accent w-full flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Open Email Draft
                </button>
                <p className="font-sans text-xs text-muted leading-relaxed">
                  This opens your email app with the message pre-filled. If nothing happens, use the email link or copy button above.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
