
import React from 'react';
import { ShieldAlert, Users2, Cpu, FileCheck, Terminal } from 'lucide-react';

export const Rules: React.FC = () => {
  return (
    <section id="rules" className="py-24 px-6 bg-slate-950 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter flex items-center gap-4 glitch-text">
            <ShieldAlert size={48} className="text-lime-500" /> SYSTEM <span className="neon-text-lime">RULES</span>
          </h2>
          <p className="text-slate-500 font-gaming text-[8px] uppercase tracking-widest">Version 2026.1.4 // Protocol: FAIR_PLAY</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-10 rounded-3xl bg-slate-900/60 border-2 border-white/5 hover:border-cyan-500 transition-all group relative">
             <div className="absolute top-4 right-6 text-cyan-500 opacity-20 font-orbitron font-black text-2xl group-hover:opacity-40">01</div>
            <Users2 className="text-cyan-400 mb-8" size={40} />
            <h4 className="text-xl font-black text-white mb-4 font-orbitron tracking-wide uppercase">SQUAD SIZE</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Solo or Duo (Max 2 students). Team configurations are locked once Phase 2 begins. Choose your teammates carefully!
            </p>
          </div>
          
          <div className="p-10 rounded-3xl bg-slate-900/60 border-2 border-white/5 hover:border-lime-500 transition-all group relative">
             <div className="absolute top-4 right-6 text-lime-500 opacity-20 font-orbitron font-black text-2xl group-hover:opacity-40">02</div>
            <Cpu className="text-lime-400 mb-8" size={40} />
            <h4 className="text-xl font-black text-white mb-4 font-orbitron tracking-wide uppercase">AI AUGMENTATION</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              <span className="text-lime-500 font-bold uppercase tracking-widest">Co-pilot, not Autopilot.</span> You can use AI to assist, but blind copy-pasting is an instant disqualification.
            </p>
          </div>

          <div className="p-10 rounded-3xl bg-slate-900/60 border-2 border-white/5 hover:border-slate-500 transition-all group relative">
             <div className="absolute top-4 right-6 text-slate-500 opacity-20 font-orbitron font-black text-2xl group-hover:opacity-40">03</div>
            <FileCheck className="text-slate-400 mb-8" size={40} />
            <h4 className="text-xl font-black text-white mb-4 font-orbitron tracking-wide uppercase">CLASS ROLES</h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Each member must define their exact role (e.g., Developer, UI Designer). Every member must contribute to the code.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-slate-900/40 p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center gap-8 group">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
            <Terminal size={32} className="text-slate-500 group-hover:text-lime-500 transition-colors" />
          </div>
          <div>
            <h5 className="text-white font-black font-orbitron text-lg uppercase mb-1">PRO-TIP // EXPERT ADVICE</h5>
            <p className="text-slate-500 text-sm leading-relaxed">
              Judges aren't just looking for complex code; they want to see a <span className="text-cyan-400 font-bold italic underline">practical solution</span> that can actually be used at school tomorrow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
