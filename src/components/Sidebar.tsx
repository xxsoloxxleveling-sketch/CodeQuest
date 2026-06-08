"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useGameStore } from "@/store/gameStore";
import { LayoutDashboard, GraduationCap, ShoppingCart, Users, Settings, HelpCircle, Code } from "lucide-react";
import { SHOP_ITEMS } from "@/lib/shopData";

export default function Sidebar() {
  const pathname = usePathname();
  const { role, username, level, equippedAvatar } = useGameStore();

  const isEducator = role === "educator";

  const activeAvatarData = SHOP_ITEMS.avatars.find(a => a.id === equippedAvatar) || SHOP_ITEMS.avatars[0];
  const AvatarIcon = activeAvatarData.icon;

  const navItems = isEducator
    ? [
        { name: "CMS Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Learning", path: "/learning", icon: GraduationCap },
      ]
    : [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Learning", path: "/learning", icon: GraduationCap },
        { name: "Shop", path: "/shop", icon: ShoppingCart },
        { name: "Multiplayer", path: "/multiplayer", icon: Users },
      ];

  return (
    <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 bg-surface-container-low border-r border-secondary/10 py-6 z-50">
      <div className="px-6 mb-8 flex items-center space-x-2">
        <Code className="text-primary w-6 h-6" />
        <h1 className="font-headline-xl text-xl font-bold text-primary">CodeQuest</h1>
      </div>
      
      <div className="px-6 mb-8 flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden flex items-center justify-center border border-primary/30 shadow-[0_0_10px_rgba(94,234,212,0.1)] shrink-0">
          {isEducator ? (
            <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCLXeGiS93ypBdxtvnrY8hwInRD5olcYOCjbfSBYlLAY0z4oskt6zw6-mZJ58NZC1grpVP3Z_3DK9pBfgcZAW2YKtpBRlseFcReedymWMfUrxIeq2pFRbvivf6D4I8Gqxl-SsDMZrpdNFjL-DfP3aFWWZipRs3r9CZTjVs756MF6mWi1okh8bVmO_lzCCWqly9g3rrboxKH2RVdl3mSsLs-XewSngb5cDYLfX7AQVjbcokIb5aohQaS775ajyCDI4xlghg63rdPpo" />
          ) : (
            <AvatarIcon className={`w-7 h-7 ${activeAvatarData.color}`} />
          )}
        </div>
        <div>
          <div className="font-body-md font-bold truncate max-w-[120px]">{username || "Guest"}</div>
          <div className="font-body-md text-xs text-on-surface-variant">Level {level} {isEducator ? "Admin" : "Developer"}</div>
        </div>
      </div>
      
      {!isEducator && (
        <button className="mx-6 mb-8 bg-primary-container text-surface-container-high font-bold text-xs uppercase py-2 px-4 rounded-full glow-primary hover:scale-105 transition-transform duration-200">
          New Mission
        </button>
      )}

      <ul className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center px-6 py-3 transition-all duration-300 ease-in-out ${
                  isActive
                    ? "text-primary font-bold border-r-2 border-primary bg-primary/5"
                    : "text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-primary"
                }`}
              >
                <Icon className="mr-3 w-5 h-5 shrink-0" />
                <span>{item.name}</span>
                {item.name === "Multiplayer" && (
                  <span className="ml-auto text-[9px] bg-red-950/40 border border-red-500/30 text-red-400 px-1.5 py-0.5 rounded font-mono font-bold">SOON</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto space-y-2">
        <Link
          href="/"
          className="flex items-center px-6 py-3 text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-primary transition-all duration-300 ease-in-out"
        >
          <Settings className="mr-3 w-5 h-5" />
          Logout
        </Link>
        <Link
          href="#"
          className="flex items-center px-6 py-3 text-on-surface-variant font-medium hover:bg-surface-container-high hover:text-primary transition-all duration-300 ease-in-out"
        >
          <HelpCircle className="mr-3 w-5 h-5" />
          Support
        </Link>
      </div>
    </nav>
  );
}
