
import React, { useState, useRef } from 'react';
import { Grade, ROLES, RegistrationData } from '../types';
import { Send, Loader2, CheckCircle2, FileUp, Download, Terminal, AlertCircle } from 'lucide-react';
import { submitToGoogleSheet } from '../services/submissionService';

export const RegistrationForm: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<RegistrationData>({
    teamName: '',
    memberCount: '1',
    leader: { fullName: '', grade: Grade.GRADE_7, roles: [] },
    member2: { fullName: '', grade: Grade.GRADE_7, roles: [] },
    problemStatement: '',
    solution: '',
    techStack: '',
    aiUsage: '',
    pitchFile: null,
    acceptedPolicy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, pitchFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pitchFile) {
      alert("Please upload your pitch document.");
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    const success = await submitToGoogleSheet(formData);
    
    if (success) {
      setIsSubmitted(true);
      window.scrollTo({ top: document.getElementById('register')?.offsetTop || 0, behavior: 'smooth' });
    } else {
      setError("Critical connection error. Please verify your terminal link and try again.");
    }
    setIsSubmitting(false);
  };

  const toggleRole = (member: 'leader' | 'member2', role: string) => {
    setFormData(prev => {
      const currentRoles = member === 'leader' ? prev.leader.roles : prev.member2?.roles || [];
      const newRoles = currentRoles.includes(role) 
        ? currentRoles.filter(r => r !== role)
        : [...currentRoles, role];
      
      return {
        ...prev,
        [member]: {
          ...prev[member === 'leader' ? 'leader' : 'member2'],
          roles: newRoles
        }
      };
    });
  };

  if (isSubmitted) {
    return (
      <div id="register" className="max-w-4xl mx-auto py-24 px-6 text-center animate-in zoom-in-95 duration-500 scroll-mt-20">
        <div className="w-20 h-20 bg-lime-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(204,255,0,0.5)] rotate-12">
          <CheckCircle2 size={40} className="text-slate-950" />
        </div>
        <h2 className="font-orbitron text-4xl font-black text-white mb-6 uppercase tracking-tighter">DATA LOGGED</h2>
        <p className="text-slate-400 text-lg mb-10 font-medium leading-snug">
          Entry protocol established. Squad <span className="text-lime-500">#{formData.teamName}</span> is live on the master sheet.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)} 
          className="px-8 py-4 bg-white/5 border border-white/10 text-white font-orbitron font-black uppercase tracking-widest rounded-xl active:scale-95 transition-all"
        >
          New Protocol
        </button>
      </div>
    );
  }

  return (
    <section id="register" className="py-20 px-4 md:px-6 relative bg-slate-950/20 scroll-mt-20">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-lime-500/5 border border-lime-500/20 rounded-lg text-lime-400 font-orbitron text-[9px] font-bold tracking-widest mb-4">
            <Terminal size={10} /> ACCESSING TERMINAL // V2.6
          </div>
          <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white mb-2 uppercase tracking-tighter glitch-text">
            SQUAD <span className="neon-text-lime">SIGN-UP</span>
          </h2>
          <p className="text-slate-500 font-gaming text-[7px] uppercase tracking-widest opacity-60 italic">Cloud Sync Enabled</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
          {/* Section A: Team Details */}
          <div className="bg-slate-900/60 backdrop-blur-2xl p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 space-y-6 glow-border-lime mobile-card-shadow">
            <h3 className="text-base font-black text-lime-400 flex items-center gap-2 uppercase tracking-tighter font-orbitron">
              <span className="w-7 h-7 rounded bg-lime-500/20 flex items-center justify-center text-[10px] border border-lime-500/20">A</span>
              Squad Intel
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[8px] font-gaming text-slate-500 uppercase tracking-widest mb-2">Team Callsign</label>
                <input 
                  required
                  type="text" 
                  value={formData.teamName}
                  onChange={e => setFormData({...formData, teamName: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-500 transition-all font-bold text-sm"
                  placeholder="IDENTIFIER"
                />
              </div>
              <div>
                <label className="block text-[8px] font-gaming text-slate-500 uppercase tracking-widest mb-2">Unit Count</label>
                <div className="flex gap-2">
                  {['1', '2'].map(val => (
                    <label key={val} className="flex-1">
                      <input 
                        type="radio" 
                        name="memberCount" 
                        className="sr-only peer" 
                        value={val}
                        checked={formData.memberCount === val}
                        onChange={() => setFormData({...formData, memberCount: val as '1' | '2'})}
                      />
                      <div className="text-center py-3.5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer peer-checked:bg-lime-500 peer-checked:border-lime-500 peer-checked:text-black text-slate-500 font-orbitron font-black text-[10px] uppercase transition-all">
                        {val} Student{val === '2' ? 's' : ''}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Participant Section B */}
          <div className="bg-slate-900/60 backdrop-blur-2xl p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 space-y-6 mobile-card-shadow">
            <h3 className="text-base font-black text-white flex items-center gap-2 uppercase tracking-tighter font-orbitron">
              <span className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-[10px] border border-white/10">B</span>
              Unit 01 (Lead)
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[8px] font-gaming text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.leader.fullName}
                  onChange={e => setFormData({...formData, leader: {...formData.leader, fullName: e.target.value}})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-500 font-bold text-sm"
                />
              </div>
              <div>
                <label className="block text-[8px] font-gaming text-slate-500 uppercase tracking-widest mb-2">Academic Grade</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-500 font-bold text-sm"
                  value={formData.leader.grade}
                  onChange={e => setFormData({...formData, leader: {...formData.leader, grade: e.target.value}})}
                >
                  {Object.values(Grade).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[8px] font-gaming text-slate-500 uppercase tracking-widest mb-3">Roles</label>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole('leader', role)}
                      className={`px-4 py-2.5 rounded-lg text-[8px] font-black font-gaming uppercase tracking-widest transition-all active:scale-90 ${formData.leader.roles.includes(role) ? 'bg-lime-500 text-black shadow-[0_0_15px_rgba(204,255,0,0.2)]' : 'bg-slate-950 text-slate-600 border border-slate-800'}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Optional Participant Section C */}
          {formData.memberCount === '2' && (
            <div className="bg-slate-900/60 backdrop-blur-2xl p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 space-y-6 animate-in slide-in-from-top-4 mobile-card-shadow">
              <h3 className="text-base font-black text-white flex items-center gap-2 uppercase tracking-tighter font-orbitron">
                <span className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-[10px] border border-white/10">C</span>
                Unit 02 (Ally)
              </h3>
              <div className="space-y-6">
                <input 
                  required
                  type="text" 
                  value={formData.member2?.fullName || ''}
                  placeholder="Full Name"
                  onChange={e => setFormData({...formData, member2: {...(formData.member2 || { fullName: '', grade: Grade.GRADE_7, roles: [] }), fullName: e.target.value}})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-500 font-bold text-sm"
                />
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-500 font-bold text-sm"
                  value={formData.member2?.grade || Grade.GRADE_7}
                  onChange={e => setFormData({...formData, member2: {...(formData.member2 || { fullName: '', grade: Grade.GRADE_7, roles: [] }), grade: e.target.value}})}
                >
                  {Object.values(Grade).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole('member2', role)}
                      className={`px-4 py-2.5 rounded-lg text-[8px] font-black font-gaming uppercase tracking-widest transition-all active:scale-90 ${formData.member2?.roles.includes(role) ? 'bg-lime-500 text-black shadow-[0_0_15px_rgba(204,255,0,0.2)]' : 'bg-slate-950 text-slate-600 border border-slate-800'}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section D: Pitch Data */}
          <div className="bg-slate-900/60 backdrop-blur-2xl p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 space-y-8 mobile-card-shadow">
            <h3 className="text-base font-black text-lime-400 flex items-center gap-2 uppercase tracking-tighter font-orbitron">
              <span className="w-7 h-7 rounded bg-lime-500/20 flex items-center justify-center text-[10px] border border-lime-500/20">D</span>
              The Blueprint
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[8px] font-gaming text-slate-500 uppercase tracking-widest mb-2 italic">Problem Statement</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.problemStatement}
                  onChange={e => setFormData({...formData, problemStatement: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-500 text-sm font-medium leading-relaxed"
                  placeholder="Identify a real 'pain point'..."
                ></textarea>
              </div>

              <div>
                <label className="block text-[8px] font-gaming text-slate-500 uppercase tracking-widest mb-2 italic">The AI Solution</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.solution}
                  onChange={e => setFormData({...formData, solution: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-500 text-sm font-medium leading-relaxed"
                  placeholder="How will your tech fix it?"
                ></textarea>
              </div>

              {/* Mobile Optimized File Upload */}
              <div className="p-6 bg-slate-950 border-2 border-dashed border-slate-800 rounded-xl space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="space-y-1">
                    <h4 className="text-white font-black font-orbitron text-xs uppercase tracking-widest flex items-center gap-2">
                      <FileUp size={16} className="text-lime-500" /> Pitch Docs
                    </h4>
                    <p className="text-[7px] font-gaming text-slate-600 uppercase">PDF/PPTX/DOCX // MAX 10MB</p>
                  </div>
                  
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); alert('Template downloading...'); }}
                    className="w-full text-center text-lime-500 font-black font-orbitron text-[9px] uppercase tracking-widest px-4 py-3 border border-lime-500/30 rounded-lg bg-lime-500/5 active:bg-lime-500 active:text-black transition-all"
                  >
                    <Download size={12} className="inline mr-2" /> Download Template
                  </a>
                </div>

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`cursor-pointer group flex flex-col items-center justify-center py-10 rounded-xl border-2 border-dashed transition-all active:scale-[0.97] ${formData.pitchFile ? 'border-lime-500 bg-lime-500/5' : 'border-slate-800'}`}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.pptx,.docx" />
                  {formData.pitchFile ? (
                    <div className="flex flex-col items-center gap-3 text-lime-500 text-center px-2">
                      <CheckCircle2 size={24} />
                      <span className="font-orbitron font-black text-xs truncate max-w-[200px]">{formData.pitchFile.name}</span>
                      <span className="text-[7px] font-gaming opacity-60">TOUCH TO REPLACE</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-700 text-center px-2">
                      <FileUp size={32} className="mb-1" />
                      <span className="font-orbitron font-black text-sm uppercase">Upload Pitch</span>
                      <span className="text-[7px] font-gaming">Click to select file</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                  <input 
                    required
                    type="text" 
                    value={formData.techStack}
                    onChange={e => setFormData({...formData, techStack: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-500 font-bold text-sm"
                    placeholder="Stack: Lovable, Google AI Studio, Gemini, Nano Banana Pro, Stitch..."
                  />
                  <input 
                    required
                    type="text" 
                    value={formData.aiUsage}
                    onChange={e => setFormData({...formData, aiUsage: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-lime-500 font-bold text-sm"
                    placeholder="AI: Gemini API, Neural Engine, etc."
                  />
              </div>
            </div>
          </div>

          {/* Section E: Final Commitment */}
          <div className="space-y-6 pb-12">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="text-red-500 shrink-0" size={18} />
                <span className="text-red-400 text-[10px] font-gaming uppercase tracking-widest">{error}</span>
              </div>
            )}

            <label className="flex items-start gap-3 p-4 bg-slate-900/40 rounded-xl border border-white/5 active:bg-lime-500/5 transition-colors">
              <input 
                required
                type="checkbox" 
                checked={formData.acceptedPolicy}
                onChange={e => setFormData({...formData, acceptedPolicy: e.target.checked})}
                className="mt-1 w-5 h-5 accent-lime-500" 
              />
              <span className="text-[10px] text-slate-400 font-medium leading-relaxed">
                I acknowledge that plagiarism or "blind" AI copy-pasting will result in <span className="text-lime-500 font-black">TERMINATION</span> from the challenge.
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting || !formData.acceptedPolicy}
              className="w-full py-6 bg-lime-500 text-slate-950 text-xl font-black font-orbitron uppercase tracking-widest rounded-2xl active:scale-95 shadow-[0_10px_30px_rgba(204,255,0,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-30 mobile-card-shadow"
            >
              {isSubmitting ? (
                <>UPLOADING DATA... <Loader2 size={24} className="animate-spin" /></>
              ) : (
                <>SUBMIT PITCH <Send size={24} /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
