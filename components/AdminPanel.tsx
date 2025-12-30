
import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { Terminal, Users, Database, ShieldCheck, ChevronRight, Search, FileText, ExternalLink } from 'lucide-react';

interface Submission {
  id: string;
  teamName: string;
  memberCount: string;
  leader: { fullName: string; grade: string; roles: string[] };
  member2: { fullName: string; grade: string; roles: string[] } | null;
  problemStatement: string;
  solution: string;
  techStack: string;
  aiUsage: string;
  pitchFileName: string;
  createdAt: Timestamp;
}

export const AdminPanel: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "submissions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: Submission[] = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() } as Submission);
      });
      setSubmissions(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filtered = submissions.filter(s => 
    s.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.leader.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-500/10 border border-lime-500/20 rounded-md text-lime-400 font-gaming text-[8px] tracking-widest uppercase">
              <ShieldCheck size={12} /> Root Authorization Active
            </div>
            <h1 className="text-4xl font-black text-white font-orbitron uppercase tracking-tighter flex items-center gap-4">
              COMMAND <span className="neon-text-lime">CENTER</span>
            </h1>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-lime-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH SQUADS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border-2 border-slate-800 rounded-xl pl-12 pr-6 py-3 text-white font-orbitron text-sm focus:outline-none focus:border-lime-500 w-full md:w-80 transition-all"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 space-y-2">
            <span className="text-[8px] font-gaming text-slate-500 uppercase tracking-widest">Total Squads</span>
            <div className="text-3xl font-black text-white font-orbitron">{submissions.length}</div>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 space-y-2">
            <span className="text-[8px] font-gaming text-slate-500 uppercase tracking-widest">Active Units</span>
            <div className="text-3xl font-black text-lime-500 font-orbitron">
              {submissions.reduce((acc, s) => acc + parseInt(s.memberCount), 0)}
            </div>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 space-y-2">
            <span className="text-[8px] font-gaming text-slate-500 uppercase tracking-widest">System Sync</span>
            <div className="text-3xl font-black text-cyan-400 font-orbitron">100%</div>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 space-y-2">
            <span className="text-[8px] font-gaming text-slate-500 uppercase tracking-widest">Status</span>
            <div className="text-xl font-black text-emerald-500 font-orbitron uppercase flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Online
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* List Section */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-[10px] font-gaming text-slate-500 uppercase tracking-[0.2em]">Transmission Log</h3>
              <div className="text-[10px] font-gaming text-lime-500/50">LIVE_FEED</div>
            </div>
            
            <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-24 bg-slate-900/30 rounded-2xl animate-pulse border border-white/5"></div>
                ))
              ) : filtered.length === 0 ? (
                <div className="text-center py-12 text-slate-700 font-gaming text-[10px]">NO_DATA_FOUND</div>
              ) : filtered.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubmission(sub)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${selectedSubmission?.id === sub.id ? 'bg-lime-500 border-lime-500 text-black' : 'bg-slate-900/50 border-white/5 text-white hover:border-lime-500/50'}`}
                >
                  <div>
                    <div className={`text-xs font-gaming mb-1 opacity-50 ${selectedSubmission?.id === sub.id ? 'text-black' : 'text-lime-500'}`}>
                      {sub.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-lg font-black font-orbitron uppercase truncate max-w-[150px]">{sub.teamName}</div>
                    <div className={`text-[9px] font-bold uppercase tracking-widest opacity-60`}>Lead: {sub.leader.fullName}</div>
                  </div>
                  <ChevronRight size={20} className={`transition-transform ${selectedSubmission?.id === sub.id ? 'translate-x-1' : 'group-hover:translate-x-1 opacity-20 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-8">
            {selectedSubmission ? (
              <div className="bg-slate-900/40 rounded-[2.5rem] border border-white/10 p-8 md:p-12 space-y-10 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/10 pb-8">
                  <div>
                    <h2 className="text-4xl font-black text-white font-orbitron uppercase tracking-tighter mb-2">{selectedSubmission.teamName}</h2>
                    <div className="flex flex-wrap gap-4">
                      <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-gaming text-slate-400 uppercase tracking-widest">
                        {selectedSubmission.memberCount} Squad Member{selectedSubmission.memberCount === '2' ? 's' : ''}
                      </div>
                      <div className="px-3 py-1 bg-lime-500/10 border border-lime-500/20 rounded text-[10px] font-gaming text-lime-400 uppercase tracking-widest">
                        Submission ID: {selectedSubmission.id.slice(0, 8)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-gaming text-slate-600 uppercase mb-1">Received At</div>
                    <div className="text-sm font-bold font-orbitron text-slate-300">
                      {selectedSubmission.createdAt?.toDate().toLocaleDateString()} // {selectedSubmission.createdAt?.toDate().toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  {/* Squad Info */}
                  <div className="space-y-6">
                    <h4 className="text-lime-500 font-gaming text-[8px] uppercase tracking-[0.3em] flex items-center gap-2">
                      <Users size={12} /> Personnel File
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5">
                        <div className="text-[8px] font-gaming text-slate-600 uppercase mb-2">Unit 01 (Lead)</div>
                        <div className="text-white font-bold font-orbitron">{selectedSubmission.leader.fullName}</div>
                        <div className="text-xs text-slate-500">{selectedSubmission.leader.grade}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedSubmission.leader.roles.map(r => (
                            <span key={r} className="text-[8px] font-gaming bg-white/5 text-white/50 px-2 py-1 rounded">{r}</span>
                          ))}
                        </div>
                      </div>

                      {selectedSubmission.member2 && (
                        <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5">
                          <div className="text-[8px] font-gaming text-slate-600 uppercase mb-2">Unit 02 (Ally)</div>
                          <div className="text-white font-bold font-orbitron">{selectedSubmission.member2.fullName}</div>
                          <div className="text-xs text-slate-500">{selectedSubmission.member2.grade}</div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedSubmission.member2.roles.map(r => (
                              <span key={r} className="text-[8px] font-gaming bg-white/5 text-white/50 px-2 py-1 rounded">{r}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Technical Profile */}
                  <div className="space-y-6">
                    <h4 className="text-cyan-400 font-gaming text-[8px] uppercase tracking-[0.3em] flex items-center gap-2">
                      <Database size={12} /> Technical Profile
                    </h4>
                    <div className="p-6 bg-slate-950/50 rounded-2xl border border-cyan-500/10 space-y-4">
                      <div>
                        <div className="text-[8px] font-gaming text-slate-600 uppercase mb-2">Tech Stack</div>
                        <div className="text-white font-bold text-sm leading-relaxed">{selectedSubmission.techStack}</div>
                      </div>
                      <div>
                        <div className="text-[8px] font-gaming text-slate-600 uppercase mb-2">AI Implementation</div>
                        <div className="text-white font-bold text-sm leading-relaxed">{selectedSubmission.aiUsage}</div>
                      </div>
                      <div className="pt-4 border-t border-white/5">
                        <div className="text-[8px] font-gaming text-slate-600 uppercase mb-3">Pitch Asset</div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <FileText size={14} className="text-lime-500" /> {selectedSubmission.pitchFileName}
                          </div>
                          <button className="text-lime-500 hover:text-white transition-colors">
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-8 pt-6">
                  <div className="space-y-4">
                    <h4 className="text-slate-500 font-gaming text-[8px] uppercase tracking-[0.3em]">Operational Problem</h4>
                    <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5 text-slate-300 text-sm leading-relaxed font-medium">
                      {selectedSubmission.problemStatement}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-slate-500 font-gaming text-[8px] uppercase tracking-[0.3em]">Proposed Protocol (Solution)</h4>
                    <div className="p-6 bg-lime-500/5 rounded-2xl border border-lime-500/10 text-slate-300 text-sm leading-relaxed font-medium">
                      {selectedSubmission.solution}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-900/20 rounded-[2.5rem] border border-dashed border-slate-800 text-center space-y-6">
                <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-slate-700">
                  <Terminal size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-700 font-orbitron uppercase tracking-widest">Select an Active Squad</h3>
                  <p className="text-slate-800 font-gaming text-[8px] uppercase tracking-[0.2em] mt-2 italic">Awaiting selection from transmission log...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
