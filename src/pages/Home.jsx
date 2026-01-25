import React, { useEffect, useState } from 'react';
import GradientBlinds from '../components/GradientBlinds';

export default function Home() {
  useEffect(() => {
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Scroll animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.scroll-item').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Animated Background - GradientBlinds */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <GradientBlinds
          gradientColors={['#0ea5e9', '#3b82f6', '#8b5cf6']}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      {/* Hero Content */}
      <section id="home" style={{ minHeight: '100vh', paddingBottom: '20vh', background: 'transparent', position: 'relative', zIndex: 10 }}>
      <main className="flex flex-col pt-40 pr-6 pl-6 relative gap-x-3 gap-y-x-3 items-center justify-center">
        {/* Version Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 hover:bg-white/10 transition-colors cursor-pointer group scroll-item scroll-fade-up" style={{ animationPlayState: 'running' }}>
          <span className="bg-blue-500/20 text-blue-400 rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide font-sans">NEW</span>
          <span className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors pr-1 font-sans">Version 3.0 is live</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-3 h-3 text-gray-500 group-hover:text-white transition-colors">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-center text-5xl md:text-7xl leading-[1.1] max-w-4xl mx-auto font-oswald font-light tracking-tight scroll-item scroll-blur-in delay-100 text-white" style={{ animationPlayState: 'running' }}>
          Build once.
          <span className="text-blue-400 font-oswald font-light tracking-tight"> Update forever.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-center text-xl text-gray-200 mt-8 max-w-2xl mx-auto leading-relaxed font-light font-sans scroll-item scroll-fade-up delay-200" style={{ animationPlayState: 'running' }}>
          A powerful server-driven UI engine for Android. Turn JSON into native Jetpack Compose interfaces without app updates.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 scroll-item scroll-fade-up delay-300" style={{ animationPlayState: 'running' }}>
          <button className="group inline-flex overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] focus:outline-none sm:w-auto text-sm font-medium text-white w-full h-[54px] rounded-full pt-4 pr-8 pb-4 pl-8 relative items-center justify-center" style={{ position: 'relative' }}>
            <style>{`
              @keyframes beam-spin { to { transform: rotate(360deg); } }
              @keyframes lines-slide { 0% { background-position: 0 0; } 100% { background-position: 24px 0; } }
            `}</style>
            <div className="absolute inset-0 -z-20 rounded-full overflow-hidden p-[1px]">
              <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#3b82f6_360deg)]" style={{ animation: 'beam-spin 3s linear infinite' }}></div>
              <div className="absolute inset-[1px] rounded-full bg-[#050505]"></div>
            </div>
            <div className="overflow-hidden bg-[#0A0A0A] rounded-full absolute top-[2px] right-[2px] bottom-[2px] left-[2px]">
              <div className="bg-gradient-to-b from-blue-900/20 to-transparent absolute top-0 right-0 bottom-0 left-0"></div>
              <div className="opacity-[0.07] mix-blend-plus-lighter absolute top-0 right-0 bottom-0 left-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 8px)', backgroundSize: '24px 100%', animation: 'lines-slide 1.5s linear infinite' }}></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-blue-500/20 blur-2xl rounded-full pointer-events-none transition-colors duration-500 group-hover:bg-blue-500/40"></div>
            </div>
            <span className="transition-colors group-hover:text-white uppercase font-semibold text-white tracking-tight z-10 relative font-sans">Start free</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right relative z-10 ml-2 transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
          <button className="sm:w-auto hover:bg-blue-500/10 hover:border-blue-400 hover:shadow-[0_0_35px_rgba(59,130,246,0.6),inset_0_0_20px_rgba(59,130,246,0.4)] hover:scale-[1.02] transition-all duration-300 flex group text-base font-medium text-white bg-black/60 w-full border-blue-500 border rounded-full pt-3.5 pr-8 pb-3.5 pl-8 shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_0_10px_rgba(59,130,246,0.2)] gap-x-2 gap-y-2 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-circle w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors">
              <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            Watch Demo
          </button>
        </div>

      </main>
      </section>

      {/* Footer removed - will be in Layout component */}
    </>
  );
}
