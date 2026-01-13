import React, { useEffect } from 'react';

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
      {/* Hero Content */}
      <main className="flex flex-col z-10 pt-40 pr-6 pl-6 relative gap-x-3 gap-y-x-3 items-center justify-center">
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

        {/* Phone Mockup Placeholder - This section would be quite large, I'll add a simplified version */}
        <div className="flex w-full max-w-5xl mt-32 mb-24 relative items-center justify-center scroll-item scroll-blur-in delay-500" style={{ animationPlayState: 'running' }}>
          <div className="text-center p-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl border border-white/20 backdrop-blur-sm">
            <p className="text-3xl text-white font-oswald font-semibold">Phone Mockup Section</p>
            <p className="text-gray-100 mt-4 text-lg">Interactive Ketoy UI preview</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050505] relative z-10 pt-20 pb-10">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
            <div className="max-w-sm scroll-item scroll-fade-up" style={{ animationPlayState: 'running' }}>
              <a href="#" className="inline-flex items-center justify-center bg-center w-[130px] h-[50px] bg-[url(https://cdn.midjourney.com/405c2b1c-c585-45e3-be19-65cdcd2d9e46/0_0.png?w=800&q=80)] bg-cover rounded-full"></a>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans mt-4">
                Finex is the next-gen financial platform designed for modern businesses. We help you track, analyze, and optimize your growth.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full font-sans">
              <div className="scroll-item scroll-fade-up delay-100" style={{ animationPlayState: 'running' }}>
                <h4 className="text-white font-medium mb-4 font-sans">Product</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Features</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Integrations</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Pricing</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Changelog</a></li>
                </ul>
              </div>
              <div className="scroll-item scroll-fade-up delay-200" style={{ animationPlayState: 'running' }}>
                <h4 className="text-white font-medium mb-4 font-sans">Resources</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Documentation</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">API Reference</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Community</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Help Center</a></li>
                </ul>
              </div>
              <div className="scroll-item scroll-fade-up delay-300" style={{ animationPlayState: 'running' }}>
                <h4 className="text-white font-medium mb-4 font-sans">Company</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">About</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Careers</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Legal</a></li>
                </ul>
              </div>
              <div className="scroll-item scroll-fade-up delay-500" style={{ animationPlayState: 'running' }}>
                <h4 className="text-white font-medium mb-4 font-sans">Legal</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors font-sans">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 font-sans">© 2024 Finex Inc. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-gray-400 font-sans">All systems normal</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
