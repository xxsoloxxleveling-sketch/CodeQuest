"use client";

import { useGameStore } from "@/store/gameStore";
import { Medal, Flame, Zap, CircleDollarSign } from "lucide-react";

export default function TopHUD() {
  const { level, xp, bytes, streak, role } = useGameStore();
  const isEducator = role === "educator";

  return (
    <header className="flex justify-between items-center px-4 md:px-8 w-full h-16 bg-surface/80 backdrop-blur-md border-b border-secondary/10 shadow-[0_0_15px_rgba(94,234,212,0.1)] sticky top-0 z-40">
      <div className="flex items-center md:hidden">
        <h1 className="font-headline-xl text-xl font-bold text-primary">CodeQuest</h1>
      </div>
      <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
        <div className="flex items-center text-on-surface-variant space-x-4">
          <div className="flex items-center space-x-1 hover:text-primary transition-colors cursor-pointer" title={`Level ${level}: ${isEducator ? "Admin" : "Apprentice"}`}>
            <Medal className="w-4 h-4 text-primary-container" />
            <span className="font-bold text-xs uppercase">Lvl {level}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-primary transition-colors cursor-pointer" title={`${streak}-Day Streak`}>
            <Flame className="w-4 h-4 text-red-400" />
            <span className="font-bold text-xs uppercase">{streak}d</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-primary transition-colors cursor-pointer" title="Total XP">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="font-bold text-xs uppercase">{(xp / 1000).toFixed(1)}k XP</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-primary transition-colors cursor-pointer" title="Bytes">
            <CircleDollarSign className="w-4 h-4 text-green-400" />
            <span className="font-bold text-xs uppercase">{bytes}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
