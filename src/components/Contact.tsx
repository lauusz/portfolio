import { useState } from 'react';
import { contactInfo, mailtoLink } from '../constants/data';
import { Mail, MapPin, CheckCircle, Send, Copy, Check } from 'lucide-react';

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
                    <button
                      onClick={handleCopyEmail}
                      className="font-sans text-sm text-primary hover:text-accent transition-colors flex items-center gap-2"
                    >
                      {contactInfo.email}
                      {copied ? <Check size={14} className="text-accent-secondary" /> : <Copy size={14} className="text-muted" />}
                    </button>
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
                    <p className="font-sans text-xs text-muted uppercase tracking-wider">Status</p>
                    <p className="font-sans text-sm text-accent-secondary whitespace-pre-line">{contactInfo.status}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="font-sans text-base text-muted leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's build something amazing together.
            </p>
          </div>

          {/* Contact form */}
          <div className="card p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="label">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-accent w-full flex items-center justify-center gap-2"
              >
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
