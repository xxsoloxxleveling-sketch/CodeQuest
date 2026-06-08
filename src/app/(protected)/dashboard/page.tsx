"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Play, Lock, Code2, Calculator, Type, Folder, FolderOpen } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { pythonCurriculum, javaCurriculum } from "@/lib/curriculumData";

export default function DashboardPage() {
  const { username, completedDays, completedJavaDays } = useGameStore();
  const [openFolder, setOpenFolder] = useState<"python" | "java">("python");

  // Determine lists and data based on active folder
  const currentCurriculum = openFolder === "python" ? pythonCurriculum : javaCurriculum;
  const currentCompletedList = openFolder === "python" ? completedDays : completedJavaDays;

  // Calculate percentages
  const pythonProgress = Math.round(((completedDays || []).length / pythonCurriculum.length) * 100) || 0;
  const javaProgress = Math.round(((completedJavaDays || []).length / javaCurriculum.length) * 100) || 0;

  // Find first incomplete day for "Jump Back In" button
  const getNextIncompleteDay = (curriculum: typeof pythonCurriculum, completedList: number[]) => {
    for (const dayData of curriculum) {
      if (!completedList.includes(dayData.day)) {
        return dayData.day;
      }
    }
    return 1; // Default to day 1 if all are complete
  };

  const nextPythonDay = getNextIncompleteDay(pythonCurriculum, completedDays || []);
  const nextJavaDay = getNextIncompleteDay(javaCurriculum, completedJavaDays || []);

  const jumpBackInUrl = openFolder === "python"
    ? `/learning?track=python&day=${nextPythonDay}`
    : `/learning?track=java&day=${nextJavaDay}`;

  const getDayStatus = (dayNum: number, completedList: number[]) => {
    if ((completedList || []).includes(dayNum)) return "completed";
    if (dayNum === 1 || (completedList || []).includes(dayNum - 1)) return "active";
    return "locked";
  };

  // Determine current active day index for skill map highlight
  const activeDay = openFolder === "python" ? nextPythonDay : nextJavaDay;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="bg-surface-container rounded-2xl p-6 md:p-8 card-border relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-r from-on-surface/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 space-y-4 text-center md:text-left md:max-w-xl">
          <h2 className="font-headline-xl text-3xl font-bold text-primary font-orbitron">
            Welcome back, {username || "Hero"}.
          </h2>
          <p className="font-body-lg text-lg text-on-surface-variant">
              {openFolder === "python" 
              ? `Your next Python assignment is Lecture ${nextPythonDay}: ${pythonCurriculum[nextPythonDay - 1]?.title || "The variables sector"}. Ready to build?`
              : `Your next Java assignment is Lecture ${nextJavaDay}: ${javaCurriculum[nextJavaDay - 1]?.title || "The syntax gate"}. Ready to compile?`}
          </p>
        </div>
        <div className="relative z-10 mt-6 md:mt-0">
          <Link href={jumpBackInUrl}>
            <button className={`text-background font-bold text-lg py-3 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-lg ${
              openFolder === "python" ? "bg-primary glow-primary" : "bg-secondary glow-secondary"
            }`}>
              Jump Back In
            </button>
          </Link>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Progress & Quests */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface rounded-2xl p-6 card-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-on-surface">Language Sectors</h3>
              <span className="text-xs font-bold text-secondary uppercase bg-secondary/10 px-3 py-1 rounded-full">
                Season 1
              </span>
            </div>

            {/* Folder Tabs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={() => setOpenFolder("python")}
                className={`flex-1 flex items-center justify-between p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                  openFolder === "python"
                    ? "bg-gradient-to-br from-yellow-500/10 via-blue-500/5 to-transparent border-primary/50 shadow-md shadow-primary/10"
                    : "bg-surface-container/30 border-transparent hover:border-on-surface/10 opacity-70"
                }`}
              >
                <div className="flex items-center gap-3">
                  {openFolder === "python" ? (
                    <FolderOpen className="w-8 h-8 text-primary animate-pulse" />
                  ) : (
                    <Folder className="w-8 h-8 text-on-surface-variant group-hover:text-primary transition-colors" />
                  )}
                  <div className="text-left">
                    <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">Python Sector</h4>
                    <p className="text-xs text-on-surface-variant">The Serpent's Path</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-primary">{pythonProgress}%</span>
                  <div className="text-[10px] text-on-surface-variant mt-1">{(completedDays || []).length}/5 Completed</div>
                </div>
              </button>

              <button
                onClick={() => setOpenFolder("java")}
                className={`flex-1 flex items-center justify-between p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                  openFolder === "java"
                    ? "bg-gradient-to-br from-orange-600/10 via-red-500/5 to-transparent border-secondary/50 shadow-md shadow-secondary/10"
                    : "bg-surface-container/30 border-transparent hover:border-on-surface/10 opacity-70"
                }`}
              >
                <div className="flex items-center gap-3">
                  {openFolder === "java" ? (
                    <FolderOpen className="w-8 h-8 text-secondary animate-pulse" />
                  ) : (
                    <Folder className="w-8 h-8 text-on-surface-variant group-hover:text-secondary transition-colors" />
                  )}
                  <div className="text-left">
                    <h4 className="font-bold text-on-surface group-hover:text-secondary transition-colors">Java Sector</h4>
                    <p className="text-xs text-on-surface-variant">Island of Bytecode</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-secondary">{javaProgress}%</span>
                  <div className="text-[10px] text-on-surface-variant mt-1">{(completedJavaDays || []).length}/5 Completed</div>
                </div>
              </button>
            </div>

            {/* List of Days */}
            <div className="space-y-3">
              {currentCurriculum.map((dayData) => {
                const status = getDayStatus(dayData.day, currentCompletedList);
                const isCompleted = status === "completed";
                const isActive = status === "active";
                const isLocked = status === "locked";

                return (
                  <div
                    key={dayData.day}
                    className={`flex flex-col sm:flex-row sm:items-center p-4 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                      isCompleted
                        ? "bg-surface-container/30 border-primary/20 opacity-75 hover:opacity-100"
                        : isActive
                        ? openFolder === "python"
                          ? "bg-surface-container border-primary glow-primary"
                          : "bg-surface-container border-secondary glow-secondary"
                        : "bg-surface-container/10 border-on-surface/5 opacity-50"
                    }`}
                  >
                    <div className="flex items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        isCompleted
                          ? "bg-primary/20 text-primary"
                          : isActive
                          ? openFolder === "python"
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary/20 text-secondary"
                          : "bg-surface-bright text-on-surface-variant"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : isActive ? (
                          <Play className="w-5 h-5 fill-current" />
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                            Lecture {dayData.day}
                          </span>
                          {isCompleted && (
                            <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">
                              Complete
                            </span>
                          )}
                          {isActive && (
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded animate-pulse ${
                              openFolder === "python" ? "text-primary bg-primary/10" : "text-secondary bg-secondary/10"
                            }`}>
                              Next Up
                            </span>
                          )}
                        </div>
                        <h4 className={`text-base font-bold mt-0.5 ${isCompleted ? "text-on-surface/80" : "text-on-surface"}`}>
                          {dayData.title}
                        </h4>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-0 ml-14 sm:ml-0 flex justify-end">
                      {isLocked ? (
                        <span className="text-xs font-bold text-on-surface-variant uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-bright/50 border border-on-surface/5">
                          <Lock className="w-3.5 h-3.5" /> Locked
                        </span>
                      ) : (
                        <Link href={`/learning?track=${openFolder}&day=${dayData.day}`}>
                          <button className={`font-bold text-xs px-4 py-2 rounded-lg transition-all duration-200 ${
                            isCompleted
                              ? "bg-surface-bright border border-on-surface-variant/20 hover:border-primary/50 text-on-surface"
                              : openFolder === "python"
                              ? "bg-primary text-background hover:scale-105 glow-primary"
                              : "bg-secondary text-background hover:scale-105 glow-secondary"
                          }`}>
                            {isCompleted ? "Review Class" : "Start Quest"}
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Skill Map & Leaderboard */}
        <div className="lg:col-span-4 space-y-6">
          {/* Skill Map */}
          <div className="bg-surface rounded-2xl p-6 card-border">
            <h3 className="text-2xl font-bold text-on-surface mb-6">Skill Map</h3>
            <div className="relative py-8 flex flex-col items-center">
              {/* Connecting Line */}
              <div className="absolute top-10 bottom-10 left-1/2 w-1 -ml-[0.5px] bg-secondary/20 z-0"></div>
              
              <div className="relative z-10 w-full flex justify-center mb-8">
                <div className={`border px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center transition-all duration-300 ${
                  activeDay <= 2
                    ? openFolder === "python"
                      ? "bg-primary/10 border-primary text-primary glow-primary"
                      : "bg-secondary/10 border-secondary text-secondary glow-secondary"
                    : "bg-surface-bright border-on-surface-variant/20 text-on-surface-variant opacity-75"
                }`}>
                  <Code2 className="w-4 h-4 mr-2" />
                  Variables
                </div>
              </div>
              
              <div className="relative z-10 w-full flex justify-center mb-8">
                <div className={`border px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center transition-all duration-300 ${
                  activeDay === 3
                    ? openFolder === "python"
                      ? "bg-primary/10 border-primary text-primary glow-primary"
                      : "bg-secondary/10 border-secondary text-secondary glow-secondary"
                    : "bg-surface-bright border-on-surface-variant/20 text-on-surface-variant opacity-75"
                }`}>
                  <Calculator className="w-4 h-4 mr-2" />
                  Math
                </div>
              </div>
              
              <div className="relative z-10 w-full flex justify-center">
                <div className={`border px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center transition-all duration-300 ${
                  activeDay >= 4
                    ? openFolder === "python"
                      ? "bg-primary/10 border-primary text-primary glow-primary"
                      : "bg-secondary/10 border-secondary text-secondary glow-secondary"
                    : "bg-surface-bright border-on-surface-variant/20 text-on-surface-variant opacity-75"
                }`}>
                  <Type className="w-4 h-4 mr-2" />
                  Strings
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-surface rounded-2xl p-6 card-border">
            <h3 className="text-2xl font-bold text-on-surface mb-6">Top Pilots</h3>
            <div className="space-y-4">
              {[
                { rank: 1, name: "Alex.dev", xp: "32k XP", color: "text-primary", border: "border-primary", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZZ6yTJh5v8l2G0v2sGYYhjQKUVc5gj0BsatamoDPQb7bLJJhtcr6IVxdns7LBiHTClh31tZVuOOm38wT2U0V3_AMhBMz7XcAa8x0oJ9MfMEyEJJO9xd6r1NM2HGdArzkB8YEroxCahexmS8iVS8lEWoTAI1pgvZ4XzJzYrfp02Ut5_HSjNAdnPaDvdEADnESOVRDWtFKtfL6Bsqhsa4AMBv31hwReL0U05CogyIMIS2S_SZGp8f_V-EZl4lxhzFNa03dhqV58lPw" },
                { rank: 2, name: "Sarah_Codes", xp: "28k XP", color: "text-on-surface-variant", border: "border-secondary", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzMwHxz1gr1yFjK60yIQagGXd1bmS9dyFdDO5sBNNK36ruQapdxTPVtFG_g4RMCl4TbjB8b33gIpkyAN0C20GEeA2SvG6kkX-_46TfzDltv-OWWXfhBOPcM1cb4XHX2bo5iDsjQ8PDc1QwOIDgrIJhQfFpxIFBxPC6q0waRiRbusRwTBkeqCFL-Xyw_E2DN0MMfIR-MhfoP8HQnkYS6X51SjYK8DD6HWjGp5mIdcS-kw-LeDEAA2lL9b26ZPRKMqBcX4NDRKB2xeU" },
                { rank: 3, name: "Mike_C++", xp: "26k XP", color: "text-on-surface-variant", border: "border-on-surface-variant/20", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn3PWLFyQ0Nad7hbrM1jG7x1E9X1F_jURdt6RZUySpKp0FSrL4ChFrKV0R6ciR6q0YhJFnELdM8kV2hysSy28Wq_6zP79OxI0PuS0oScpuTb7OqpPw1e6oNjLAXfrc6m8tZKahMKYdNK5auGCOqhuldeEoZj7MVj-h_RJ7JCPC_DcNoPMgzvWf8vPt04tYTqPVlGOH0O3jmcJtu4gffdmtRiaR503QcdcovYjHw5TrL-SOU8TfAvwsm3gV43UOO9MaJjB0eDqfvKo" }
              ].map((pilot) => (
                <div key={pilot.rank} className="flex items-center p-3 rounded-lg hover:bg-surface-container-high transition-colors">
                  <div className={`w-8 text-xl font-bold ${pilot.rank}`}>{pilot.rank}</div>
                  <img alt={`Avatar ${pilot.rank}`} className={`w-10 h-10 rounded-full border ${pilot.border} ml-2 object-cover`} src={pilot.img} />
                  <div className="ml-4 flex-1">
                    <div className="font-bold text-on-surface">{pilot.name}</div>
                  </div>
                  <div className="text-xs font-bold text-secondary uppercase">{pilot.xp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
