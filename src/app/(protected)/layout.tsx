"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import Sidebar from "@/components/Sidebar";
import TopHUD from "@/components/TopHUD";
import PetCompanion from "@/components/PetCompanion";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const initialize = useGameStore((state) => state.initialize);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated" && session?.user) {
      // Hydrate game store with user data from the session
      initialize({
        role: session.user.role as any,
        username: session.user.name as string,
        level: session.user.level as number,
        xp: session.user.xp as number,
        bytes: session.user.bytes as number,
        streak: session.user.streak as number,
        purchasedItems: session.user.purchasedItems as string[],
        equippedAvatar: session.user.equippedAvatar as string,
        equippedTheme: session.user.equippedTheme as string,
        equippedTitle: session.user.equippedTitle as string,
        equippedCompanion: session.user.equippedCompanion as string,
        completedDays: (session.user as any).completedDays as number[] || [],
        completedJavaDays: (session.user as any).completedJavaDays as number[] || [],
      });
    }
  }, [session, status, router, initialize]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        <TopHUD />
        <div className="p-4 md:p-8 flex-1 space-y-6">{children}</div>
        <PetCompanion />
      </main>
    </div>
  );
}
