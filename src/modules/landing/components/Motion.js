'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

// All scroll and load choreography for the landing page. The page renders
// complete without this file; hidden states are applied here, never in CSS,
// so no-JS and reduced-motion visitors always see the finished page.
export default function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
    const raf = (t) => lenis.raf(t * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links scroll through Lenis so the easing stays consistent.
    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -24, duration: 1.2 });
    };
    document.addEventListener('click', onAnchor);

    const splits = [];
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      heroIntro();
      heroScroll();
      blurHeadings(splits);
      reveals();
      pipeline();
      verifySequence();
      typeTerminal();
      mm.add('(min-width: 960px) and (min-height: 640px)', () => deckPinned());
      mm.add('(max-width: 959px), (max-height: 639px)', () => deckStacked());
    });

    // Fonts can change line breaks after the first split, and the document
    // height changes as fonts and the deck settle. Keep trigger positions
    // honest without listening to scroll.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    let refreshT = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(refreshT);
      refreshT = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      window.clearTimeout(refreshT);
      document.removeEventListener('click', onAnchor);
      splits.forEach((s) => s.revert());
      mm.revert();
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

const q = (s) => document.querySelector(s);
const qa = (s) => gsap.utils.toArray(s);

/* Hero: nav, headline lines, lead, then the phone rises out of the bloom and
   the terminal pushes a bundle that updates the screen. */
function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  const oldT = q('[data-stage="old"]');
  const newT = q('[data-stage="new"]');
  const toast = q('[data-stage="toast"]');
  const termLines = ['[data-stage="t1"]', '[data-stage="t2"]', '[data-stage="t3"]'].map(q);

  gsap.set(newT, { display: 'none', opacity: 0, y: 10 });
  gsap.set(oldT, { display: 'inline-block' });
  gsap.set(toast, { opacity: 0, y: -14 });
  gsap.set(termLines, { opacity: 0, y: 8 });

  tl.from('[data-hero="nav"]', { opacity: 0, y: -10, duration: 0.8 }, 0)
    .from('[data-hero="line"]', { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'power4.out' }, 0.1)
    .from('[data-hero="fade"]', { opacity: 0, y: 18, duration: 0.8, stagger: 0.08 }, 0.5)
    .from('[data-hero="bloom"]', { opacity: 0, duration: 1.8, ease: 'power2.out' }, 0)
    .from('[data-hero="float"]', { y: 220, opacity: 0, duration: 1.4, ease: 'power3.out' }, 0.45)
    .from('[data-hero="term"]', { x: -40, opacity: 0, duration: 0.9 }, 1.0)
    .from('[data-hero="bundle"]', { x: 40, opacity: 0, duration: 0.9 }, 1.15)
    .to(termLines[0], { opacity: 1, y: 0, duration: 0.4 }, 1.5)
    .to(termLines[1], { opacity: 1, y: 0, duration: 0.4 }, 2.1)
    .to(termLines[2], { opacity: 1, y: 0, duration: 0.4 }, 2.6)
    .to(oldT, { opacity: 0, y: -10, duration: 0.3 }, 2.75)
    .set(oldT, { display: 'none' })
    .set(newT, { display: 'inline-block' })
    .to(newT, { opacity: 1, y: 0, duration: 0.45 }, 3.05)
    .to(toast, { opacity: 1, y: 0, duration: 0.5 }, 3.0)
    .to(toast, { opacity: 0, y: -10, duration: 0.5, delay: 2.2 });

  // Idle drift on the inner phone. The outer wrapper belongs to the scroll
  // tween, so the two never write the same transform.
  gsap.to('[data-hero="float"]', { y: -10, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
}

/* Hero scrub: as the panel leaves, the copy lifts and fades while the stage
   rises faster than the page, like it is being pulled out of the panel.
   Lenis already smooths the scroll, so the scrub is direct (no second lag),
   and every element here is driven by exactly one tween per property. */
function heroScroll() {
  const hero = q('[data-hero="root"]');
  if (!hero) return;
  const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('[data-hero="copy"]', { y: -90, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '60% top' } });
  gsap.to('[data-hero="phone"]', { y: -180, ease: 'none', scrollTrigger: st });
  gsap.to('[data-hero="term"]', { y: -120, ease: 'none', scrollTrigger: st });
  gsap.to('[data-hero="bundle"]', { y: -140, ease: 'none', scrollTrigger: st });
}

/* Section headings: words come into focus from a blur, one after another. */
function blurHeadings(splits) {
  qa('[data-blur]').forEach((el) => {
    const split = new SplitText(el, { type: 'words', wordsClass: 'kt-w' });
    splits.push(split);
    gsap.set(split.words, { opacity: 0, filter: 'blur(8px)', y: 14 });
    gsap.to(split.words, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.055,
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    });
  });
}

/* Generic reveals: a heavy, soft rise. */
function reveals() {
  const els = qa('[data-rv]');
  if (!els.length) return;
  gsap.set(els, { opacity: 0, y: 28 });
  ScrollTrigger.batch(els, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });
}

/* Layer deck on large screens: the deck is CSS sticky; the scroll distance of
   the track drives one timeline that swaps cards and lights the tabs. */
function deckPinned() {
  const track = q('[data-deck="track"]');
  const cards = qa('[data-deck="card"]');
  const tabs = qa('[data-deck="tab"]');
  if (!track || cards.length < 2) return undefined;

  gsap.set(cards.slice(1), { yPercent: 70, opacity: 0 });
  gsap.set(cards[0], { yPercent: 0, opacity: 1 });

  // One unit of timeline per card change. The outgoing card clears before
  // the next one arrives, so two cards never read on top of each other.
  const tl = gsap.timeline({ paused: true });
  cards.forEach((card, i) => {
    if (i === 0) return;
    const prev = cards[i - 1];
    tl.to(prev, { yPercent: -8, scale: 0.95, opacity: 0, duration: 0.3, ease: 'power2.in' }, i - 1 + 0.1)
      .to(card, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, i - 1 + 0.45);
  });
  tl.to({}, { duration: 0.6 });

  ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.6,
    animation: tl,
    onUpdate: () => {
      const i = Math.min(cards.length - 1, Math.max(0, Math.floor(tl.time() + 0.5)));
      tabs.forEach((t, k) => t.classList.toggle('is-on', k === i));
    },
  });
  return () => {};
}

/* Layer deck on small screens: plain vertical stack with reveals. */
function deckStacked() {
  const cards = qa('[data-deck="card"]');
  gsap.set(cards, { clearProps: 'all' });
  gsap.set(cards, { opacity: 0, y: 32 });
  ScrollTrigger.batch(cards, {
    start: 'top 85%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }),
  });
  return () => {};
}

/* How it works: the rail fills as you scroll and each step lights up as
   the fill reaches it. */
function pipeline() {
  const fill = q('[data-pipe="fill"]');
  const steps = qa('[data-pipe="step"]');
  const root = q('[data-pipe="root"]');
  if (!fill || !root) return;
  gsap.fromTo(fill, { scaleX: 0 }, {
    scaleX: 1,
    ease: 'none',
    transformOrigin: '0 50%',
    scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 55%', scrub: 0.5 },
  });
  steps.forEach((s, i) => {
    ScrollTrigger.create({
      trigger: root,
      start: `${(i / steps.length) * 100 + 4}% 62%`,
      onEnter: () => s.classList.add('is-on'),
      onLeaveBack: () => s.classList.remove('is-on'),
    });
  });
}

/* Security: the verification steps complete one by one. */
function verifySequence() {
  const steps = qa('[data-verify]');
  if (!steps.length) return;
  gsap.set(steps, { opacity: 0.3 });
  gsap.to(steps, {
    opacity: 1,
    duration: 0.5,
    stagger: 0.45,
    ease: 'power2.out',
    scrollTrigger: { trigger: steps[0], start: 'top 78%', once: true },
    onStart: () => steps.forEach((s) => s.classList.remove('is-done')),
    onUpdate() {
      const n = Math.floor(this.progress() * steps.length);
      steps.forEach((s, i) => s.classList.toggle('is-done', i < n));
    },
    onComplete: () => steps.forEach((s) => s.classList.add('is-done')),
  });
}

/* Tooling terminal: rows appear as if typed. */
function typeTerminal() {
  const rows = qa('[data-type]');
  if (!rows.length) return;
  gsap.set(rows, { opacity: 0, y: 6 });
  gsap.to(rows, {
    opacity: 1,
    y: 0,
    duration: 0.35,
    stagger: 0.42,
    ease: 'power2.out',
    scrollTrigger: { trigger: rows[0], start: 'top 80%', once: true },
  });
}
