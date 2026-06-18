import { useState } from 'react';
import { mailtoLink, contactInfo } from '../constants/data';
import { getContactIcon } from '../constants/contactIcons';

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
        <div className="mb-12">
          <p className="font-mono text-sm text-muted mb-2">
            <span className="text-primary">$</span> ./contact --init
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-text">
            GET IN <span className="text-primary">TOUCH</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="terminal-window p-6 sm:p-8">
            <p className="font-mono text-xs text-muted mb-6">
              <span className="text-primary">$</span> cat contact_info.txt
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-primary">{getContactIcon('email')}</span>
                <div>
                  <p className="font-mono text-xs text-muted">Email</p>
                  <button
                    onClick={handleCopyEmail}
                    className="font-mono text-sm text-text hover:text-primary transition-colors"
                  >
                    {contactInfo.email}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-accent">{getContactIcon('location')}</span>
                <div>
                  <p className="font-mono text-xs text-muted">Location</p>
                  <p className="font-mono text-sm text-text">{contactInfo.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-secondary">{getContactIcon('status')}</span>
                <div>
                  <p className="font-mono text-xs text-muted">Status</p>
                  <p className="font-mono text-sm text-accent">{contactInfo.status}</p>
                </div>
              </div>
            </div>
            {copied && (
              <p className="font-mono text-xs text-primary mt-4">[copied to clipboard]</p>
            )}
          </div>

          {/* Contact form */}
          <div className="terminal-window p-6 sm:p-8">
            <p className="font-mono text-xs text-muted mb-6">
              <span className="text-primary">$</span> nano message.txt
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs text-muted block mb-2">Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface border border-border p-3 font-mono text-sm text-text focus:border-primary focus:outline-none transition-colors"
                  placeholder="your_name"
                  required
                />
              </div>
              <div>
                <label className="font-mono text-xs text-muted block mb-2">Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface border border-border p-3 font-mono text-sm text-text focus:border-primary focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="font-mono text-xs text-muted block mb-2">Message:</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-surface border border-border p-3 font-mono text-sm text-text focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Enter your message..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full border border-primary text-primary px-6 py-3 font-mono text-sm hover:bg-primary hover:text-void transition-colors"
              >
                [SEND_MESSAGE]
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;