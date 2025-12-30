
import React from 'react';
import { Bus, Box, Utensils, ScanFace, ChevronRight } from 'lucide-react';

const IdeaCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-6 md:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-white/5 hover:border-lime-500 transition-all hover:-translate-y-1 active:scale-[0.98] group relative overflow-hidden mobile-card-shadow flex flex-col">
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-lime-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-950 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.03)] border border-white/5`}>
      <Icon size={24} className="text-lime-500" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 font-orbitron tracking-tighter uppercase group-hover:neon-text-lime transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm font-medium flex-grow mb-6">{desc}</p>
    
    <a 
      href="#register" 
      className="inline-flex items-center gap-2 text-lime-500 font-gaming text-[8px] uppercase tracking-widest group-hover:gap-3 transition-all"
    >
      START BUILDING <ChevronRight size={12} />
    </a>

    <div className="mt-4 flex items-center gap-2 text-[9px] font-bold text-lime-500 font-gaming opacity-30 group-hover:opacity-60 transition-opacity">
      <div className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse"></div>
      PRIORITY_FIX
    </div>
  </div>
);

export const Mission: React.FC = () => {
  return (
    <section id="mission" className="py-20 px-6 bg-slate-950/80 relative border-y border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
          <div className="flex-1 space-y-6">
            <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase tracking-tighter glitch-text leading-none">
              THE <span className="neon-text-lime">MISSION</span>
            </h2>
            <div className="relative">
              <p className="text-lg md:text-2xl text-slate-300 leading-snug font-bold border-l-4 border-lime-500 pl-6 bg-lime-500/5 py-6 rounded-r-2xl">
                Identify a real <span className="neon-text-lime italic underline decoration-white/20">'pain point'</span> at our school. 
                <br className="hidden md:block" />
                Build an <span className="text-cyan-400 uppercase tracking-widest">AI-powered app</span> to fix it.
              </p>
              <div className="absolute -top-3 -left-1 text-lime-500 opacity-30 font-gaming text-[7px] tracking-tighter">TASK_01 // OBJECTIVE</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-1/3">
             <div className="h-40 bg-cyan-500/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center font-orbitron text-slate-400 text-center p-6 group hover:border-cyan-500/40 hover:text-cyan-400 transition-all">
                <span className="text-[8px] font-gaming opacity-30 mb-2 uppercase">Core Protocol</span>
                <span className="text-base font-black tracking-widest uppercase leading-tight">Code the<br/>Future</span>
             </div>
             <div className="h-40 bg-lime-500/10 rounded-2xl border border-lime-500/20 flex flex-col items-center justify-center font-orbitron text-lime-400 text-center p-6 group hover:bg-lime-500/20 transition-all shadow-[0_0_30px_rgba(204,255,0,0.1)]">
                <span className="text-[8px] font-gaming opacity-50 mb-2 uppercase">Objective B</span>
                <span className="text-base font-black tracking-widest uppercase leading-tight">Fix the<br/>System</span>
             </div>
          </div>
        </div>

        <div className="relative mb-10 flex items-center gap-4">
          <h3 className="text-lg md:text-2xl font-black text-white uppercase font-orbitron tracking-widest shrink-0">
            LEVEL UP <span className="text-slate-500">YOUR IDEAS</span>
          </h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-lime-500/30 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <IdeaCard 
            icon={Bus} 
            title="Transport" 
            desc="A smart pickup coordination app using AI to predict arrival times and notify parents." 
          />
          <IdeaCard 
            icon={Box} 
            title="Inventory" 
            desc="Manage school materials effortlessly with visual recognition of lab equipment and supplies." 
          />
          <IdeaCard 
            icon={Utensils} 
            title="Canteen" 
            desc="An AI-powered pre-order system that predicts daily favorites and optimizes inventory." 
          />
          <IdeaCard 
            icon={ScanFace} 
            title="Attendance" 
            desc="Lightning-fast facial recognition or dynamic QR check-in to replace manual roll-calls." 
          />
        </div>
      </div>
    </section>
  );
};
