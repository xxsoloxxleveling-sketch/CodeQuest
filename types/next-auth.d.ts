import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      level: number;
      xp: number;
      bytes: number;
      streak: number;
      purchasedItems: string[];
      equippedAvatar: string;
      equippedTheme: string;
      equippedTitle: string;
      equippedCompanion: string;
      completedDays: number[];
      completedJavaDays: number[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    level: number;
    xp: number;
    bytes: number;
    streak: number;
    purchasedItems: string[];
    equippedAvatar: string;
    equippedTheme: string;
    equippedTitle: string;
    equippedCompanion: string;
    completedDays: number[];
    completedJavaDays: number[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    level: number;
    xp: number;
    bytes: number;
    streak: number;
    purchasedItems: string[];
    equippedAvatar: string;
    equippedTheme: string;
    equippedTitle: string;
    equippedCompanion: string;
    completedDays: number[];
    completedJavaDays: number[];
  }
}
