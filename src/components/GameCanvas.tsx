import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Gem, Key, Flame, Zap, Check, MessageSquare } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { SHOP_ITEMS } from "@/lib/shopData";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export interface GameState {
  playerMessage: string | null;
  isGateOpen: boolean;
}

interface GameLevel {
  title: string;
  goal: string;
  setup: string;
  winCondition: string;
}

interface GameCanvasProps {
  gameState: GameState;
  level?: GameLevel;
  day?: number;
}

export default function GameCanvas({ gameState, level, day = 1 }: GameCanvasProps) {
  const [showPlayerMessage, setShowPlayerMessage] = useState(false);
  const [robotAnimationData, setRobotAnimationData] = useState<any>(null);
  const { equippedCompanion } = useGameStore();
  const companion = SHOP_ITEMS.companions.find(c => c.id === equippedCompanion);

  useEffect(() => {
    fetch("https://assets5.lottiefiles.com/packages/lf20_1idqkuej.json")
      .then(res => res.json())
      .then(data => setRobotAnimationData(data))
      .catch(err => console.error("Failed to load hero robot animation", err));
  }, []);

  useEffect(() => {
    if (gameState.playerMessage) {
      setShowPlayerMessage(true);
      const timer = setTimeout(() => setShowPlayerMessage(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [gameState.playerMessage]);

  const renderDayScene = () => {
    switch (day) {
      case 1:
        return (
          <div className="relative flex flex-col items-center">
            {/* Target Speech Bubble (Gatekeeper) */}
            <div className={`mb-12 relative transition-all duration-1000 ${gameState.isGateOpen ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
               <div className="w-16 h-16 rounded-xl border-2 border-secondary/50 flex items-center justify-center bg-secondary/10 shadow-[0_0_20px_rgba(var(--secondary-rgb),0.2)]">
                 <MessageSquare className="w-8 h-8 text-secondary" />
               </div>
               <div className="absolute -top-12 -left-16 bg-surface text-on-surface font-mono text-sm p-3 rounded border-2 shadow-lg w-48 text-center border-secondary before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:w-4 before:h-4 before:bg-surface before:border-b-2 before:border-r-2 before:border-secondary before:transform before:rotate-45 before:-translate-x-1/2">
                 Speak to begin.
               </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="relative flex flex-col items-center">
            <div className={`mb-16 relative transition-all duration-1000 ${gameState.isGateOpen ? 'scale-110' : 'scale-100'}`}>
               <div className="w-24 h-32 relative flex items-center justify-center">
                 {/* Pedestal */}
                 <div className="absolute bottom-0 w-32 h-8 bg-surface-container-high border-t-4 border-secondary rounded-t-lg"></div>
                 {/* Crystal */}
                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   className={`w-12 h-16 rounded-t-full rounded-b-md border-2 z-10 flex items-center justify-center transition-all duration-1000 ${gameState.isGateOpen ? 'bg-primary/40 border-primary shadow-[0_0_40px_rgba(var(--primary-rgb),0.8)]' : 'bg-purple-900/40 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]'}`}
                 >
                   <Gem className={`w-6 h-6 ${gameState.isGateOpen ? 'text-primary' : 'text-purple-400'}`} />
                 </motion.div>
               </div>
               <div className={`absolute -top-12 -left-12 bg-surface text-on-surface font-mono text-sm p-3 rounded border-2 shadow-lg w-48 text-center transition-colors duration-500 ${gameState.isGateOpen ? 'border-primary' : 'border-purple-500'}`}>
                 {gameState.isGateOpen ? "Crystal Unlocked!" : "Password: STARLIGHT"}
               </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="relative flex flex-col items-center w-full">
            <div className="w-full h-32 relative flex items-center justify-center mb-16">
               {/* Chasm */}
               <div className="absolute bottom-0 w-full h-16 bg-black/50 border-t-2 border-dashed border-red-500/30 overflow-hidden flex justify-center gap-4 pt-4">
                 {/* Planks */}
                 {[...Array(6)].map((_, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: gameState.isGateOpen ? 1 : 0.2, y: gameState.isGateOpen ? 0 : 20 }}
                     transition={{ duration: 0.5, delay: gameState.isGateOpen ? i * 0.15 : 0 }}
                     className={`w-12 h-4 rounded shadow-lg ${gameState.isGateOpen ? 'bg-amber-700 border-2 border-amber-900 shadow-[0_0_15px_rgba(217,119,6,0.6)]' : 'bg-surface-container-high border-2 border-dashed border-surface-variant'}`}
                   />
                 ))}
               </div>
               <div className={`absolute -top-8 bg-surface text-on-surface font-mono text-sm p-3 rounded border-2 shadow-lg w-64 text-center transition-colors duration-500 ${gameState.isGateOpen ? 'border-amber-500' : 'border-red-500/50'}`}>
                 {gameState.isGateOpen ? "Bridge Assembled: 18 Coins" : "6 gaps. 3 coins per plank."}
               </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="relative flex flex-col items-center">
            <div className="flex gap-12 mb-16 relative">
              <motion.div 
                animate={gameState.isGateOpen ? { x: 50, scale: 1.5, opacity: 0 } : { y: [0, -5, 0] }}
                transition={{ duration: gameState.isGateOpen ? 0.8 : 2, repeat: gameState.isGateOpen ? 0 : Infinity }}
                className="w-16 h-16 rounded-full bg-red-900/40 border-2 border-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              >
                <Flame className="w-8 h-8 text-red-500" />
              </motion.div>
              <motion.div 
                animate={gameState.isGateOpen ? { x: -50, scale: 1.5, opacity: 0 } : { y: [0, 5, 0] }}
                transition={{ duration: gameState.isGateOpen ? 0.8 : 2.5, repeat: gameState.isGateOpen ? 0 : Infinity }}
                className="w-16 h-16 rounded-full bg-blue-900/40 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                <Zap className="w-8 h-8 text-blue-500" />
              </motion.div>
              
              {/* Combined state */}
              {gameState.isGateOpen && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-purple-900/60 border-4 border-purple-400 flex items-center justify-center shadow-[0_0_50px_rgba(192,132,252,0.8)]"
                >
                  <span className="font-bold text-purple-200 text-sm tracking-widest uppercase">Firestorm</span>
                </motion.div>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="relative flex flex-col items-center">
            <div className={`mb-16 relative transition-all duration-1000 ${gameState.isGateOpen ? 'scale-110' : 'scale-100'}`}>
               <div className={`w-24 h-32 rounded-t-full border-4 flex items-center justify-center transition-all duration-1000 ${gameState.isGateOpen ? 'bg-primary/20 border-primary shadow-[0_0_40px_rgba(var(--primary-rgb),0.5)]' : 'bg-surface-container-high border-secondary shadow-[0_0_20px_rgba(var(--secondary-rgb),0.2)]'}`}>
                 <span className={`material-symbols-outlined text-6xl ${gameState.isGateOpen ? 'text-primary drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)]' : 'text-secondary'}`}>
                   {gameState.isGateOpen ? 'sentiment_very_satisfied' : 'sentiment_neutral'}
                 </span>
               </div>
               <div className={`absolute -top-12 -left-12 bg-surface text-on-surface font-mono text-sm p-3 rounded border-2 shadow-lg w-48 text-center transition-colors duration-500 ${gameState.isGateOpen ? 'border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]' : 'border-secondary'}`}>
                 {gameState.isGateOpen ? "Greetings, Traveler!" : "Who goes there?"}
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="absolute inset-0 flex flex-col transition-colors duration-1000 bg-cover bg-center" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(9, 13, 33, 0.3), rgba(9, 13, 33, 0.9)), url('/assets/bg_day_${day}.png')`
      }}
    >
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-1000" 
        style={{ 
          backgroundSize: '32px 32px', 
          backgroundImage: gameState.isGateOpen
            ? 'linear-gradient(to right, #b5fff0 1px, transparent 1px), linear-gradient(to bottom, #b5fff0 1px, transparent 1px)'
            : 'linear-gradient(to right, #818cf8 1px, transparent 1px), linear-gradient(to bottom, #818cf8 1px, transparent 1px)' 
        }}
      ></div>

      {/* Level Info Header */}
      {level && (
        <AnimatePresence mode="wait">
          <motion.div 
            key={level.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 m-4 p-4 bg-surface/80 backdrop-blur-md rounded-xl border border-secondary/20 shadow-lg flex justify-between items-start"
          >
            <div>
              <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                {level.title}
                {gameState.isGateOpen && (
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded-full border border-primary/50 flex items-center gap-1">
                    <Check className="w-3 h-3" /> You completed it correctly!
                  </span>
                )}
              </h3>
              <p className="text-sm text-on-surface-variant mb-1"><strong>Goal:</strong> {level.goal}</p>
              <p className="text-sm text-on-surface-variant text-secondary"><strong>Win:</strong> {level.winCondition}</p>
            </div>
            
            {gameState.isGateOpen && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary text-on-primary font-bold px-4 py-2 rounded-lg hover:scale-105 active:scale-95 transition-transform shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] whitespace-nowrap h-fit mt-2 mr-2"
                onClick={() => window.location.href = `/learning?day=${day + 1}`}
              >
                Next Quest
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Scene Wrapper */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center p-4">
        
        {renderDayScene()}
        
        {/* Player Robot & Companion */}
        <div className="relative mt-8 flex items-end gap-6">
          {/* Companion */}
          <AnimatePresence>
            {companion && companion.imageUrl && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-16 h-16 drop-shadow-[0_0_15px_rgba(var(--secondary-rgb),0.5)] pb-2"
              >
                <img src={companion.imageUrl} alt={companion.name} className="w-full h-full object-contain [image-rendering:pixelated]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero */}
          <div className="relative">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 drop-shadow-[0_0_25px_rgba(var(--primary-rgb),0.6)]"
            >
              {robotAnimationData ? (
                <Lottie animationData={robotAnimationData} loop={true} />
              ) : (
                <div className="w-full h-full flex items-center justify-center animate-pulse bg-primary/20 rounded-full" />
              )}
            </motion.div>
            
            {/* Player Speech Bubble */}
            <div className={`absolute -top-14 -right-16 z-20 bg-primary-container text-surface-container-high font-bold font-mono text-xs p-2 rounded shadow-lg w-32 text-center transition-all duration-300 ${showPlayerMessage || gameState.playerMessage ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'} before:content-[''] before:absolute before:bottom-[-6px] before:left-4 before:w-3 before:h-3 before:bg-primary-container before:transform before:rotate-45`}>
              {gameState.playerMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
