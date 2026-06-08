"use client";

import { useGameStore } from "@/store/gameStore";
import { Users, Flame, AlertTriangle, Edit3, Save, Play, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [missionTitle, setMissionTitle] = useState("Variables & The Void");
  const [xpReward, setXpReward] = useState("250");
  const [briefing, setBriefing] = useState(`Welcome, recruit. Before we can navigate the datastreams, we need containers to hold our navigational coordinates. 

In JavaScript, we use \`let\` and \`const\` to declare these variables.

1. Use \`let\` when the data might change.
2. Use \`const\` when the data is fixed.`);

  // CMS States
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      showToast("Mission published to Module 2!");
    }, 1500);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("Draft saved successfully.");
    }, 1000);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setRunOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setRunOutput("Executing in Sandbox...\n> playerName declared.\n> MAX_HEALTH declared.\n[SUCCESS] Tests passed.");
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5" />
          {toastMessage}
        </div>
      )}

      {/* Top Stats Bar (Specific to Educator) */}
      <header className="bg-surface/80 backdrop-blur-md border-b border-secondary/10 flex justify-between items-center px-6 w-full py-4 shrink-0 z-10 mb-5">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-on-surface hidden sm:block">Lesson Builder</h1>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Stat 1 */}
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1.5 rounded-full border border-[#818cf8]/10">
            <Users className="text-primary w-4 h-4" />
            <span className="text-xs text-on-surface font-bold">Active Students: <strong className="text-primary-container">24</strong></span>
          </div>
          
          {/* Stat 2 */}
          <div className="hidden lg:flex items-center gap-2 bg-surface-container-highest px-3 py-1.5 rounded-full border border-[#818cf8]/10">
            <Flame className="text-[#dfccff] w-4 h-4" />
            <span className="text-xs text-on-surface font-bold">Avg Streak: <strong>4 days</strong></span>
          </div>
          
          {/* Stat 3 (Alert) */}
          <div className="flex items-center gap-2 bg-red-900/20 border border-red-500/30 px-3 py-1.5 rounded-full">
            <AlertTriangle className="text-red-400 w-4 h-4" />
            <span className="text-xs text-on-surface font-bold">Stuck: <strong className="text-red-400">2</strong></span>
          </div>
        </div>
      </header>

      {/* Split View Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden px-4 md:px-6 pb-6 gap-5">
        
        {/* Left Pane: CMS Form */}
        <section className="flex-1 bg-surface rounded-2xl border border-[#818cf8]/10 flex flex-col overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary-container"></div>
          
          <div className="p-4 border-b border-secondary/10 flex justify-between items-center bg-surface-bright/50">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Edit3 className="text-primary w-5 h-5" />
              Mission Editor
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-3 py-1.5 rounded-lg border border-secondary-container text-secondary text-xs font-bold hover:bg-secondary-container/20 transition-colors w-24 flex justify-center"
              >
                {isSaving ? <span className="material-symbols-outlined animate-spin text-sm">refresh</span> : "Save Draft"}
              </button>
              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-3 py-1.5 rounded-lg bg-primary text-background text-xs font-bold hover:shadow-[0_0_15px_rgba(94,234,212,0.5)] transition-all flex items-center justify-center gap-2 w-28"
              >
                {isPublishing ? <span className="material-symbols-outlined animate-spin text-sm">refresh</span> : <><Save className="w-3 h-3" /> Publish</>}
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Lesson Title */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant/70 uppercase">Mission Title</label>
              <input 
                className="w-full bg-background border border-secondary/20 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-lg font-bold placeholder-surface-variant" 
                placeholder="Enter title..." 
                type="text" 
                value={missionTitle}
                onChange={(e) => setMissionTitle(e.target.value)}
              />
            </div>
            
            {/* Level Setup Dropdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant/70 uppercase">Module Placement</label>
                <select className="w-full bg-background border border-secondary/20 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary appearance-none">
                  <option>Module 1: The Awakening</option>
                  <option value="module2">Module 2: Data Structures</option>
                  <option>Module 3: Logic Gates</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant/70 uppercase">XP Reward</label>
                <div className="relative">
                  <Flame className="absolute left-3 top-3.5 text-secondary w-4 h-4" />
                  <input 
                    className="w-full bg-background border border-secondary/20 rounded-lg pl-10 pr-4 py-3 text-on-surface focus:outline-none focus:border-primary font-mono" 
                    type="number" 
                    value={xpReward}
                    onChange={(e) => setXpReward(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Markdown Content */}
            <div className="space-y-2 flex-1 flex flex-col min-h-[250px]">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold text-on-surface-variant/70 uppercase">Mission Briefing (Markdown)</label>
              </div>
              <textarea 
                className="w-full flex-1 bg-background border border-secondary/20 rounded-lg p-4 text-on-surface text-sm focus:outline-none focus:border-primary resize-none min-h-[150px]"
                value={briefing}
                onChange={(e) => setBriefing(e.target.value)}
              />
            </div>
            
            {/* Code Snippet Base */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant/70 uppercase">Initial Code Template</label>
              <div className="rounded-lg overflow-hidden border border-secondary/20">
                <div className="bg-surface-bright px-4 py-2 flex justify-between items-center border-b border-secondary/20">
                  <span className="text-xs font-bold text-on-surface">index.js</span>
                </div>
                <textarea 
                  className="w-full bg-[#0c1024] p-4 text-primary font-mono text-sm focus:outline-none resize-y min-h-[120px]" 
                  spellCheck="false"
                  defaultValue={`// Declare a variable named 'playerName' and assign it your name.\n\n\n// Declare a constant named 'MAX_HEALTH' and set it to 100.`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Right Pane: Live Preview */}
        <section className="flex-1 bg-surface-container-low rounded-2xl border border-[#818cf8]/10 flex flex-col overflow-hidden relative hidden lg:flex">
          <div className="p-3 border-b border-secondary/10 flex justify-between items-center bg-surface/50">
            <span className="text-xs font-bold text-on-surface-variant uppercase flex items-center gap-2">
              Live Student Preview
            </span>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
            </div>
          </div>
          
          {/* Simulated Student View */}
          <div className="flex-1 bg-[#090d21] p-6 overflow-y-auto relative custom-scrollbar">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #818cf8 1px, transparent 1px), linear-gradient(to bottom, #818cf8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="max-w-md mx-auto space-y-6 relative z-10 pt-4 pb-12">
              <div className="bg-surface p-6 rounded-2xl border border-secondary/20 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full blur-xl"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl text-on-surface font-bold">{missionTitle}</h3>
                  <span className="bg-primary/20 text-primary-container px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3" /> {xpReward} XP
                  </span>
                </div>
                
                <div className="text-on-surface-variant mb-6 text-sm leading-relaxed whitespace-pre-wrap">
                  {briefing}
                </div>
                
                <div className="bg-[#0c1024] rounded-xl border border-secondary/30 overflow-hidden">
                  <div className="bg-surface-bright/50 px-3 py-1.5 flex items-center border-b border-secondary/30">
                    <span className="font-mono text-xs text-secondary">index.js</span>
                  </div>
                  <div className="p-4 font-mono text-sm text-primary/70 outline-none" contentEditable suppressContentEditableWarning>
                    <span className="text-on-surface-variant/50">// Declare a variable named 'playerName'...</span><br/><br/>
                    <span className="text-on-surface-variant/50">// Declare a constant named 'MAX_HEALTH'...</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="w-full mt-6 bg-primary/10 text-primary py-3 rounded-xl text-xs font-bold uppercase tracking-wider border border-primary/30 flex justify-center items-center gap-2 hover:bg-primary hover:text-background transition-all disabled:opacity-50"
                >
                  {isRunning ? <span className="material-symbols-outlined animate-spin text-sm">refresh</span> : "Run Code"} {isRunning ? "" : <Play className="w-4 h-4" />}
                </button>

                {runOutput && (
                  <div className="mt-4 p-4 bg-background border border-primary/20 rounded-lg font-mono text-xs text-secondary whitespace-pre-wrap animate-fade-in">
                    {runOutput}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
