"use client";

import { useGameStore } from "@/store/gameStore";
import { SHOP_ITEMS } from "@/lib/shopData";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Lottie is imported dynamically to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function PetCompanion() {
  const { equippedCompanion } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);
  
  // Physics & State
  const [position, setPosition] = useState(100);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useRef<number | null>(null);
  const positionRef = useRef(100);

  useEffect(() => {
    setMounted(true);
    // Fetch a beautiful free Lottie robot animation
    fetch("https://assets9.lottiefiles.com/packages/lf20_syqnfe7c.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation", err));
  }, []);

  useEffect(() => {
    if (!mounted || equippedCompanion === "none") return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
    };

    const handleMouseLeave = () => {
      mouseX.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 80; // pixels per second

    const update = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      let currentX = positionRef.current;
      const targetX = mouseX.current;

      if (targetX !== null) {
        const distance = Math.abs(targetX - currentX);
        
        if (distance > 150) {
          // Move towards mouse
          const dir = targetX > currentX ? 1 : -1;
          setDirection(dir);
          currentX += dir * speed * delta;
        }
      } else {
        // Default wandering if no mouse
        currentX += direction * (speed * 0.5) * delta;
        
        // Bounce off screen edges
        if (currentX < 80) {
          setDirection(1);
        } else if (currentX > window.innerWidth - 80) {
          setDirection(-1);
        }
      }

      positionRef.current = currentX;
      setPosition(currentX);
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, equippedCompanion, direction]);

  if (!mounted || equippedCompanion === "none") return null;

  const activeCompanion = SHOP_ITEMS.companions.find(c => c.id === equippedCompanion);
  if (!activeCompanion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div 
        className="absolute bottom-4 transition-transform duration-200"
        style={{ 
          left: `${position}px`, 
          transform: `translateX(-50%) scaleX(${direction})`
        }}
      >
        <div 
          className="pointer-events-auto relative cursor-pointer flex flex-col items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setDirection(d => d === 1 ? -1 : 1);
          }}
        >
          <div className="w-24 h-24 drop-shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]">
            {activeCompanion.imageUrl ? (
              <img src={activeCompanion.imageUrl} alt={activeCompanion.name} className="w-full h-full object-contain [image-rendering:pixelated]" />
            ) : null}
          </div>
          
          <div 
            className={`absolute -top-10 transition-opacity duration-300 bg-surface-container-high border border-primary/30 text-xs font-bold text-primary whitespace-nowrap px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] z-50 pointer-events-none ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ transform: `scaleX(${direction})` }} // Counter-act the parent scaleX so text isn't backwards
          >
            {activeCompanion.name}
          </div>
        </div>
      </div>
    </div>
  );
}
