import { create } from 'zustand';

type UserRole = 'student' | 'educator' | null;

interface GameState {
  role: UserRole;
  username: string;
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
  login: (role: UserRole, username: string) => void;
  logout: () => void;
  addXP: (amount: number) => void;
  addBytes: (amount: number) => void;
  purchaseItem: (id: string, cost: number) => boolean;
  equipItem: (category: 'avatar' | 'theme' | 'title' | 'companion', id: string) => void;
  initialize: (userData: Partial<GameState>) => void;
}

export const useGameStore = create<GameState>((set) => ({
  role: null,
  username: '',
  level: 1,
  xp: 0,
  bytes: 0,
  streak: 0,
  purchasedItems: [],
  equippedAvatar: 'default-avatar-id',
  equippedTheme: 'neon-theme-id',
  equippedTitle: 'default-title-id',
  equippedCompanion: 'none',
  completedDays: [],
  completedJavaDays: [],
  
  initialize: (userData) => set((state) => ({ ...state, ...userData })),

  login: (role, username) => set({ role, username }),
  
  logout: () => set({ role: null, username: '' }),
  
  addXP: (amount) => set((state) => ({ 
    xp: state.xp + amount,
    level: Math.floor((state.xp + amount) / 10000) + 2
  })),
  
  addBytes: (amount) => set((state) => ({ bytes: state.bytes + amount })),
  
  purchaseItem: (id, cost) => {
    let success = false;
    set((state) => {
      if (state.bytes >= cost && !state.purchasedItems.includes(id)) {
        success = true;
        return {
          bytes: state.bytes - cost,
          purchasedItems: [...state.purchasedItems, id]
        };
      }
      return {};
    });
    return success;
  },

  equipItem: (category, id) => set((state) => {
    switch (category) {
      case 'avatar': return { equippedAvatar: id };
      case 'theme': return { equippedTheme: id };
      case 'title': return { equippedTitle: id };
      case 'companion': return { equippedCompanion: id };
      default: return {};
    }
  })
}));
