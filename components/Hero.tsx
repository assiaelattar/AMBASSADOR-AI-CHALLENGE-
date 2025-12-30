
import React from 'react';
import { Trophy, Calendar, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-12 scroll-mt-20">
      {/* Background elements refined for mobile performance */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square bg-lime-500/5 rounded-full blur-[80px] md:blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[60%] aspect-square bg-purple-600/5 rounded-full blur-[60px] md:blur-[120px]"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full font-gaming text-[8px] text-slate-500 uppercase tracking-widest">
          Season 2026 // Episode 01
        </div>
        
        <h1 className="font-orbitron text-[12vw] md:text-8xl font-black text-white mb-4 leading-[0.9] tracking-tighter glitch-text">
          AMBASSADEUR<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-500">
            AI CHALLENGE
          </span>
        </h1>
        
        <div className="mt-4 mb-10">
          <p className="font-orbitron text-lg md:text-4xl font-bold neon-text-lime tracking-[0.2em] uppercase leading-tight">
            STOP COMPLAINING.<br /> START BUILDING.
          </p>
        </div>

        {/* Prize Callout - Enhanced for mobile visibility */}
        <div className="neon-bg-lime text-black font-black font-orbitron px-6 py-4 md:px-12 md:py-6 rounded-2xl flex items-center gap-3 md:gap-6 text-xl md:text-5xl mb-12 animate-float mobile-card-shadow">
          <Trophy size={28} className="md:w-12 md:h-12" /> 
          <span>PRIZE: 1000 DHS</span>
        </div>

        <div className="max-w-2xl text-center space-y-6 mb-16">
          <p className="text-lg md:text-2xl text-slate-300 font-medium leading-snug px-2">
            Identify a real <span className="neon-text-lime font-bold italic underline decoration-lime-500/30">'pain point'</span> at our school.
            <br className="hidden md:block" />
            Build an <span className="text-lime-400 font-bold tracking-widest uppercase">AI-powered app</span> to fix it.
          </p>
          
          <div className="flex flex-col items-center gap-3">
            <h3 className="font-orbitron text-lg md:text-2xl text-white font-black tracking-widest">
              ARE YOU IN?
            </h3>
            <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-xl border border-white/5">
              <Calendar size={14} className="text-lime-500" /> 
              <span className="text-slate-400 font-gaming text-[9px] uppercase tracking-widest">
                Register by <span className="text-white">Jan 4, 2026</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full max-w-sm sm:max-w-none">
          <a 
            href="#register" 
            className="group relative px-10 py-5 bg-lime-500 text-black font-black font-orbitron text-base md:text-xl rounded-2xl overflow-hidden transition-all hover:bg-lime-400 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(204,255,0,0.4)]"
          >
            REGISTER NOW
          </a>
          <a 
            href="#mission" 
            className="px-10 py-5 bg-transparent border-2 border-white/20 text-white font-black font-orbitron text-base md:text-xl rounded-2xl hover:border-lime-500 hover:text-lime-500 active:scale-95 transition-all"
          >
            THE MISSION
          </a>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <a href="#mission" className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
        <span className="font-gaming text-[7px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
};
