"use client";

import { useGameStore } from "@/store/gameStore";
import { Users, ShieldAlert, Lock, Zap, Hourglass, HelpCircle, Code } from "lucide-react";
import { useState, useEffect } from "react";

export default function MultiplayerPage() {
  const { username, level } = useGameStore();
  const [dots, setDots] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setJoinedWaitlist(true);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden min-h-[80vh]">
      {/* Background Matrix/Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(to right, #818cf8 1px, transparent 1px), linear-gradient(to bottom, #818cf8 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      ></div>
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#d3bbff]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-2xl w-full text-center relative z-10 space-y-8">
        {/* Glowing Gate Lock Emblem */}
        <div className="relative inline-flex items-center justify-center mb-4">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="w-24 h-24 rounded-2xl bg-surface border-2 border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(94,234,212,0.15)] relative">
            <div className="absolute inset-0.5 border border-primary/10 rounded-xl"></div>
            <Lock className="w-10 h-10 text-primary animate-bounce" />
          </div>
        </div>

        {/* Header and Details */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(94,234,212,0.2)]">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest">COMING SOON</span>
          </div>
          
          <h1 className="font-headline-xl text-4xl md:text-6xl font-bold text-on-surface tracking-tight leading-none uppercase">
            Multiplayer <span className="text-primary glow-text-sm">Arena</span>
          </h1>
          
          <p className="font-body-lg text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Relay nodes are currently calibrating. Co-op matchmakers, live code races, and global guild raids are offline for optimization.
          </p>
        </div>

        {/* Relays Calibrating Grid Visual */}
        <div className="bg-surface-container rounded-2xl border border-secondary/20 p-6 max-w-lg mx-auto text-left relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary"></div>
          
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-secondary/10">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5 text-primary" /> System Logs
            </span>
            <span className="text-xs text-primary font-mono font-bold">Offline {dots}</span>
          </div>

          <div className="font-mono text-xs text-secondary space-y-2">
            <div className="flex justify-between">
              <span>&gt; Calibrating netcode clusters:</span>
              <span className="text-primary-container">PENDING</span>
            </div>
            <div className="flex justify-between">
              <span>&gt; Syncing global leaderboards:</span>
              <span className="text-primary-container">OK</span>
            </div>
            <div className="flex justify-between">
              <span>&gt; Deploying multiplayer leagues:</span>
              <span className="text-red-400">RESTRICTED</span>
            </div>
            <div className="pt-2">
              <div className="w-full bg-background rounded-full h-2.5 overflow-hidden border border-secondary/10 relative">
                <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full animate-pulse" style={{ width: '74%' }}></div>
              </div>
              <div className="flex justify-between text-[9px] font-bold text-on-surface-variant uppercase tracking-wider mt-1.5">
                <span>Deploying core logic shards</span>
                <span>74% Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Waitlist Subscription */}
        <div className="max-w-md mx-auto bg-surface-container/60 backdrop-blur-md border border-secondary/10 p-6 rounded-2xl">
          {joinedWaitlist ? (
            <div className="text-center py-4 space-y-2 animate-fade-in">
              <Zap className="w-8 h-8 text-primary mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-on-surface">Telemetry Linked!</h3>
              <p className="text-sm text-on-surface-variant">We'll alert you the microsecond the multiplayer relays go online.</p>
            </div>
          ) : (
            <form onSubmit={handleJoinWaitlist} className="space-y-4 text-center">
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                Pre-register for Arena Early Access
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email"
                  required
                  placeholder="Enter developer email..."
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="flex-1 bg-background border border-secondary/20 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-all font-mono"
                />
                <button 
                  type="submit"
                  className="bg-primary text-background font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:shadow-[0_0_15px_rgba(94,234,212,0.4)] transition-all flex items-center justify-center gap-1.5"
                >
                  <Code className="w-4 h-4" /> Link Comms
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
