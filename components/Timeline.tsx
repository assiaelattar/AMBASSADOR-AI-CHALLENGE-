
import React from 'react';
import { Trophy, Send, Hammer, Video, Users, ChevronRight } from 'lucide-react';

const TimelineStep = ({ phase, title, body, status, icon: Icon }: { phase: string, title: string, body: string, status: 'current' | 'upcoming', icon: any }) => (
  <div className={`relative pl-12 pb-12 last:pb-0 border-l-2 transition-all group ${status === 'current' ? 'border-lime-500' : 'border-slate-800 hover:border-slate-700'}`}>
    <div className={`absolute left-0 -translate-x-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${status === 'current' ? 'bg-lime-500 text-black shadow-[0_0_15px_rgba(204,255,0,0.5)] rotate-45' : 'bg-slate-800 text-slate-500 rotate-45 group-hover:bg-slate-700'}`}>
      <div className="-rotate-45">
        <Icon size={18} />
      </div>
    </div>
    <div className="mb-3">
      <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-md font-orbitron ${status === 'current' ? 'bg-lime-500/20 text-lime-400' : 'bg-slate-800 text-slate-500'}`}>
        {phase}
      </span>
    </div>
    <h4 className={`text-2xl font-black mb-3 font-orbitron tracking-tight ${status === 'current' ? 'text-white' : 'text-slate-600'}`}>{title}</h4>
    <div className={`text-base leading-relaxed font-medium ${status === 'current' ? 'text-slate-400' : 'text-slate-600'}`} dangerouslySetInnerHTML={{ __html: body }}></div>
    {status === 'current' && (
      <div className="mt-4 flex items-center gap-2 text-lime-500 font-black text-xs uppercase tracking-tighter animate-pulse">
        <ChevronRight size={14} /> LIVE STATUS // ACTIVE
      </div>
    )}
  </div>
);

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-24 px-6 bg-slate-900/40 relative overflow-hidden scroll-mt-20">
      {/* Decorative background number */}
      <div className="absolute -top-10 -right-20 text-[20rem] font-black text-white/[0.02] font-orbitron pointer-events-none select-none">2026</div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-orbitron text-5xl md:text-6xl font-black text-white tracking-tighter uppercase glitch-text">
            QUEST <span className="neon-text-lime">LOG</span>
          </h2>
          <div className="inline-block px-6 py-2 bg-slate-950 border border-white/10 rounded-full">
            <p className="text-slate-400 font-orbitron text-sm font-bold uppercase tracking-widest">
              Deadline: <span className="text-white">4 Janvier 2026</span>
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7 space-y-0">
            <TimelineStep 
              phase="STAGE 01: THE PITCH"
              title="REGISTER YOUR SQUAD"
              body="Submit your plan and pitch file by Jan 4th, 2026. <br/><a href='#register' class='text-lime-500 underline underline-offset-4 hover:text-white transition-colors'>Goal: Complete the registration terminal below.</a>"
              status="current"
              icon={Send}
            />
            <TimelineStep 
              phase="STAGE 02: THE BUILD"
              title="CRAFT THE PROTOTYPE"
              body="The Top 20 Squads will be selected to build their Minimum Viable Product.<br/><strong>Deliverable:</strong> Working Prototype Link."
              status="upcoming"
              icon={Hammer}
            />
            <TimelineStep 
              phase="STAGE 03: THE HYPE"
              title="CAMPAIGN TRAILER"
              body="Top 10 Finalists create a high-energy video pitching to the school.<br/><strong>Deliverable:</strong> Final App + Video."
              status="upcoming"
              icon={Video}
            />
            <TimelineStep 
              phase="THE FINALE"
              title="GRAND SHOWDOWN"
              body="The whole school votes for the winner in a live stadium-style event!"
              status="upcoming"
              icon={Users}
            />
          </div>

          <div className="md:col-span-5">
            <div className="sticky top-24 flex flex-col items-center justify-center bg-slate-950 border-2 border-lime-500/30 rounded-[2.5rem] p-12 text-center shadow-[0_0_50px_rgba(204,255,0,0.1)] group transition-all hover:border-lime-500">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-28 h-28 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-3xl flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                  <Trophy size={56} className="text-slate-900 drop-shadow-lg" />
                </div>
              </div>
              <h3 className="font-orbitron text-5xl font-black text-white mb-2 tracking-tighter uppercase">1,000 <span className="text-3xl text-yellow-500">DHS</span></h3>
              <p className="neon-text-lime font-gaming text-[10px] tracking-widest uppercase mb-8">Grand Champion Reward</p>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed italic mb-8">
                "Winning isn't just about the prize. It's about seeing your code change reality at Ambassadeur School."
              </p>
              
              <a 
                href="#register" 
                className="w-full py-4 bg-lime-500 text-black font-orbitron font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all mb-8 shadow-[0_0_15px_rgba(204,255,0,0.3)]"
              >
                CLAIM YOUR PRIZE
              </a>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="py-3 px-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">XP EARNED</span>
                  <span className="font-orbitron text-white font-bold">+5000</span>
                </div>
                <div className="py-3 px-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">REPUTATION</span>
                  <span className="font-orbitron text-white font-bold">MAX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
