import { useState } from 'react';
import SEOHead from '../components/seo/SEOHead';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const body = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0A%0A${message}`;
    window.location.href = `mailto:hello@klick.stream?subject=${encodeURIComponent(subject || 'Contact from Klick.stream')}&body=${body}`;
    setStatus('opened');
  }

  return (
    <>
      <SEOHead
        title="Contact Klick.stream — Get in Touch"
        description="Contact the Klick.stream team for editorial enquiries, corrections, press requests, or general questions about the site."
        url="/contact"
      />

      <div className="static-page">
        <h1>Contact Us</h1>
        <p>
          We&rsquo;d love to hear from you. Whether you&rsquo;ve spotted an error, have a
          story idea, or want to discuss a partnership, use the form below or email us
          directly.
        </p>

        <div className="contact-grid">
          <div className="contact-form-col">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="Editorial enquiry">Editorial enquiry</option>
                  <option value="Correction or error">Correction or error</option>
                  <option value="Press or partnership">Press or partnership</option>
                  <option value="Technical issue">Technical issue</option>
                  <option value="Privacy or data request">Privacy or data request</option>
                  <option value="General question">General question</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us what&apos;s on your mind..."
                />
              </div>
              <button type="submit" className="btn-primary contact-submit">
                Send Message
              </button>
              {status === 'opened' && (
                <p className="contact-success">
                  Your email client should have opened. If not, email us directly at{' '}
                  <a href="mailto:hello@klick.stream">hello@klick.stream</a>.
                </p>
              )}
            </form>
          </div>

          <div className="contact-info-col">
            <div className="contact-info-card">
              <h2>Direct Contact</h2>
              <div className="contact-info-item">
                <strong>General enquiries</strong>
                <a href="mailto:hello@klick.stream">hello@klick.stream</a>
              </div>
              <div className="contact-info-item">
                <strong>Privacy &amp; data requests</strong>
                <a href="mailto:privacy@klick.stream">privacy@klick.stream</a>
              </div>
              <div className="contact-info-item">
                <strong>Response time</strong>
                <span>We aim to reply within 2 business days.</span>
              </div>
            </div>

            <div className="contact-info-card">
              <h2>Useful Links</h2>
              <ul className="contact-links-list">
                <li><Link href="/about">About Klick.stream</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/blog">Editorial Blog</Link></li>
                <li>
                  <a
                    href="https://x.com/Klick_stream"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Follow us on X
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
