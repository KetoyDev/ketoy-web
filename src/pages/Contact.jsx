import React from 'react';
import Layout from '../components/Layout';
import useSEO from '../hooks/useSEO';
import './ContactPage.css';

export default function Contact() {
  useSEO({
    title: 'Contact Us — Ketoy',
    description: 'Get in touch with the Ketoy team. We offer support through our official email and respond within 24 hours.',
    path: '/contact',
  });

  return (
    <Layout>
      <div className="contact-page">
        <div className="contact-hero">
          <h1 className="contact-hero__title">Contact Us</h1>
          <p className="contact-hero__desc">
            Have questions, feedback, or need support? We'd love to hear from you.
          </p>
          <p className="contact-hero__book-call">
            Book a call with Ketoy.dev Team:{' '}
            <a href="https://calendar.app.google/U8oLuX3kXpps55vYA" target="_blank" rel="noreferrer">
              https://calendar.app.google/U8oLuX3kXpps55vYA
            </a>
          </p>
        </div>

        <div className="contact-card">
          <div className="contact-card__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>

          <h2 className="contact-card__title">Email Support</h2>

          <a href="mailto:support@ketoy.dev" className="contact-card__email">
            support@ketoy.dev
          </a>

          <p className="contact-card__text">
            We currently offer support through our official email. Once you mail us, our team will connect with you within <strong>24 business/non-business hours</strong>.
          </p>

          <a href="mailto:support@ketoy.dev" className="contact-card__btn">
            Send us an Email
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="contact-info-row">
          <div className="contact-info-item">
            <h3>Community</h3>
            <p>Join our <a href="https://discord.gg/jAbcPPyksf" target="_blank" rel="noreferrer">Discord server</a> for real-time discussions and community support.</p>
          </div>
          <div className="contact-info-item">
            <h3>Bug Reports</h3>
            <p>Found an issue? File it on <a href="https://github.com/KetoyDev/ketoy/issues" target="_blank" rel="noreferrer">GitHub Issues</a> and we'll investigate.</p>
          </div>
          <div className="contact-info-item">
            <h3>Social</h3>
            <p>Follow us on <a href="https://x.com/KetoyDev" target="_blank" rel="noreferrer">X (Twitter)</a> and <a href="https://www.linkedin.com/company/ketoy" target="_blank" rel="noreferrer">LinkedIn</a> for updates.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
