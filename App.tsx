
import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Timeline } from './components/Timeline';
import { Rules } from './components/Rules';
import { RegistrationForm } from './components/RegistrationForm';
import { AdminPanel } from './components/AdminPanel';
import { Terminal, Menu, X, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

const Navbar: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = isAdmin ? [
    { name: 'Back to Site', href: '#hero' }
  ] : [
    { name: 'Mission', href: '#mission' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Rules', href: '#rules' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 md:px-8 py-4 ${scrolled || mobileMenuOpen ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className={`w-8 h-8 rounded flex items-center justify-center text-black font-black font-orbitron text-xs shadow-[0_0_10px_rgba(204,255,0,0.5)] group-hover:scale-110 transition-transform ${isAdmin ? 'bg-cyan-500 shadow-cyan-500/50' : 'bg-lime-500 shadow-lime-500/50'}`}>A</div>
            <span className="font-orbitron font-black text-white text-sm tracking-tighter uppercase md:block hidden">
              Ambassadeur {isAdmin ? 'Admin' : 'AI'}
            </span>
          </a>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="font-orbitron font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:text-lime-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          {!isAdmin && (
            <a href="#register" className="px-5 py-2 bg-lime-500 text-black font-orbitron font-black text-[10px] uppercase tracking-widest rounded-lg shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:scale-105 active:scale-95 transition-all">
              Join Now
            </a>
          )}
          {isAdmin && (
            <div className="font-gaming text-[7px] text-cyan-400 uppercase tracking-widest px-4 py-2 border border-cyan-400/30 rounded flex items-center gap-2">
              <ShieldCheck size={12} /> Root Session
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-lime-500 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="font-orbitron font-black text-xl uppercase tracking-widest text-white border-l-4 border-transparent hover:border-lime-500 pl-4 transition-all"
            >
              {link.name}
            </a>
          ))}
          {!isAdmin && (
            <a 
              href="#register" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 bg-lime-500 text-black font-orbitron font-black text-center uppercase tracking-widest rounded-xl"
            >
              Register Now
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC<{ onAdminClick: () => void }> = ({ onAdminClick }) => (
  <footer className="py-20 px-6 border-t border-white/5 bg-slate-950 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-circuit opacity-5 pointer-events-none"></div>
    <div className="max-w-4xl mx-auto relative z-10">
      <h4 className="font-orbitron text-3xl font-black text-white mb-4 tracking-tighter uppercase glitch-text">
        AMBASSADEUR <span className="neon-text-lime">SCHOOL</span>
      </h4>
      <p className="text-slate-500 text-sm mb-10 max-w-sm mx-auto font-medium leading-relaxed">
        Building the infrastructure of tomorrow, one line of code at a time.
      </p>
      
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
        <a href="#" className="text-slate-500 hover:text-lime-500 transition-all font-orbitron font-black text-[10px] uppercase tracking-widest">TWITTER</a>
        <a href="#" className="text-slate-500 hover:text-lime-500 transition-all font-orbitron font-black text-[10px] uppercase tracking-widest">INSTAGRAM</a>
        <a href="#" className="text-slate-500 hover:text-lime-500 transition-all font-orbitron font-black text-[10px] uppercase tracking-widest">WEBSITE</a>
      </div>
      
      <div className="w-20 h-px bg-white/10 mx-auto mb-10"></div>
      
      {/* Enhanced Admin Panel Link */}
      <div className="mb-10 flex flex-col items-center gap-4">
        <a 
          href="#admin" 
          onClick={(e) => {
            // Smoothly transition if already on the page
            onAdminClick();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-all font-gaming text-[8px] uppercase tracking-widest group mobile-card-shadow"
        >
          <Lock size={12} className="group-hover:animate-pulse" />
          Access Admin Dashboard
          <ExternalLink size={10} className="ml-1 opacity-50" />
        </a>
        <p className="text-[7px] font-gaming text-slate-800 uppercase tracking-tighter">Authorized Personnel Only // Restricted Access</p>
      </div>

      <p className="text-[8px] md:text-[9px] text-slate-700 font-gaming tracking-[0.4em] uppercase leading-loose">
        &copy; 2026 // AMBASSADEUR AI CHALLENGE // ALL_SYSTEMS_GO
      </p>
    </div>
  </footer>
);

function App() {
  const [view, setView] = useState<'landing' | 'admin'>('landing');

  const handleHashChange = () => {
    if (window.location.hash === '#admin') {
      setView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('landing');
      // If we are navigating to a section like #mission, the browser will handle it after state change
    }
  };

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on initial load
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-lime-500/30 selection:text-lime-200">
      <Navbar isAdmin={view === 'admin'} />
      
      <main className="transition-all duration-500">
        {view === 'landing' ? (
          <>
            <Hero />
            <Mission />
            <Timeline />
            <Rules />
            <RegistrationForm />
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <AdminPanel />
          </div>
        )}
      </main>
      
      <Footer onAdminClick={handleHashChange} />
      
      {/* Floating CTA for Mobile - Only on Landing */}
      {view === 'landing' && (
        <div className="fixed bottom-6 right-6 z-50 md:hidden animate-bounce">
          <a 
            href="#register" 
            className="w-14 h-14 bg-lime-500 text-black rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(204,255,0,0.6)] hover:scale-110 active:scale-90 transition-all font-black font-orbitron text-xs flex-col leading-none"
          >
            <Terminal size={20} />
            <span className="mt-1 text-[8px] font-gaming">JOIN</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
