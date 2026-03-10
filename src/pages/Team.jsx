import React, { useState } from 'react';
import Layout from '../components/Layout';
import useSEO from '../hooks/useSEO';
import './TeamPage.css';

const teamMembers = [
  {
    name: 'Aditya Shinde',
    role: 'Founder & Creator',
    tagline: 'Building Ketoy.dev',
    email: 'aditya@ketoy.dev',
    photo: '/aditya.png',
    links: {
      linkedin: 'https://www.linkedin.com/in/adityashinde1095/',
      youtube: 'https://www.youtube.com/@DeveloperChunk',
      medium: 'https://medium.com/@developerchunk',
      github: 'https://github.com/developerchunk',
    },
    bio: [
      '4 years of experience specializing in Android & Kotlin Multiplatform. He brings a builder\'s perspective to everything he does — as the ex-founder of FinSpare and a freelancer who has worked with startups and enterprises to build and maintain scalable mobile apps.',
      'Creator of Ketoy, an open-source Server-Driven UI framework for Android built natively on Jetpack Compose.',
      'Also the creator of JetCo Library — a Compose library for Android and KMP with 350+ GitHub stars, adopted by 50+ companies, and downloaded 6,000+ times in the last three months alone.',
      'Runs the Android-focused YouTube channel @DeveloperChunk (1,000+ subscribers) and publishes technical deep-dives on Medium under the same handle.',
      'Contributor on BitChat Android by Jack Dorsey (ex-founder of X.com / Twitter).',
    ],
  },
];

function MemberCard({ member }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="team-card">
      <div className="team-card__header">
        <div className="team-card__avatar">
          {member.photo
            ? <img src={member.photo} alt={member.name} />
            : member.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="team-card__info">
          <h2 className="team-card__name">{member.name}</h2>
          <span className="team-card__role">{member.role}</span>
          <span className="team-card__tagline">{member.tagline}</span>
        </div>
      </div>

      <div className="team-card__links">
        {member.links.linkedin && (
          <a href={member.links.linkedin} target="_blank" rel="noreferrer" className="team-card__link" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        )}
        {member.links.github && (
          <a href={member.links.github} target="_blank" rel="noreferrer" className="team-card__link" title="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        )}
        {member.links.youtube && (
          <a href={member.links.youtube} target="_blank" rel="noreferrer" className="team-card__link" title="YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        )}
        {member.links.medium && (
          <a href={member.links.medium} target="_blank" rel="noreferrer" className="team-card__link" title="Medium">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`} className="team-card__link" title="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        )}
      </div>

      <button
        className="team-card__expand-btn"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? 'Show Less' : 'Read More'}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {expanded && (
        <div className="team-card__bio">
          {member.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Team() {
  useSEO({
    title: 'Team — Ketoy',
    description: 'Meet the team behind Ketoy — the open-source Server-Driven UI framework for Android Jetpack Compose.',
    path: '/team',
  });

  return (
    <Layout>
      <div className="team-page">
        <div className="team-hero">
          <h1 className="team-hero__title">Our Team</h1>
          <p className="team-hero__desc">
            The people behind Ketoy — building the future of Server-Driven UI for Android.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
