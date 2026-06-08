"use client";

import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { Coins, Sparkles, User, Palette, Tag, Ghost, ShoppingCart } from "lucide-react";
import { SHOP_ITEMS } from "@/lib/shopData";

type Tab = "avatars" | "themes" | "titles" | "companions";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<Tab>("avatars");
  const { bytes, purchasedItems, equippedAvatar, equippedTheme, equippedTitle, equippedCompanion, purchaseItem, equipItem } = useGameStore();

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePurchase = (item: any) => {
    if (bytes >= item.cost) {
      purchaseItem(item.id, item.cost);
      showNotification(`Successfully purchased ${item.name}!`, "success");
    } else {
      showNotification("Not enough Bytes!", "error");
    }
  };

  const handleEquip = (type: Tab, id: string) => {
    // Map plural to singular
    const storeType = type === "avatars" ? "avatar" : type === "themes" ? "theme" : type === "titles" ? "title" : "companion";
    equipItem(storeType as any, id);
    showNotification(`Equipped successfully!`, "success");
  };

  const tabs = [
    { id: "avatars", label: "Avatars", icon: User },
    { id: "themes", label: "Themes", icon: Palette },
    { id: "titles", label: "Titles", icon: Tag },
    { id: "companions", label: "Companions", icon: Ghost },
  ] as const;

  const currentItems = SHOP_ITEMS[activeTab];

  const isEquipped = (type: Tab, id: string) => {
    if (type === "avatars") return equippedAvatar === id;
    if (type === "themes") return equippedTheme === id;
    if (type === "titles") return equippedTitle === id;
    if (type === "companions") return equippedCompanion === id;
    return false;
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 relative">
      {notification && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg border ${
          notification.type === "success" ? "bg-primary/20 border-primary text-primary" : "bg-red-500/20 border-red-500 text-red-400"
        }`}>
          {notification.message}
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl font-display font-bold text-on-surface mb-2 flex items-center">
          <ShoppingCart className="mr-4 w-10 h-10 text-primary" />
          The Terminal Shop
        </h1>
        <p className="text-on-surface-variant font-body">Spend your hard-earned Bytes on exclusive customizations.</p>
      </header>

      {/* Stats HUD */}
      <div className="bg-surface-container rounded border border-primary/20 p-6 mb-8 flex justify-between items-center shadow-[0_0_15px_rgba(94,234,212,0.1)]">
        <div>
          <h2 className="text-on-surface-variant text-sm font-mono mb-1">CURRENT BALANCE</h2>
          <div className="flex items-center text-3xl font-display font-bold text-primary">
            <Coins className="w-8 h-8 mr-3" />
            {bytes.toLocaleString()} BYTES
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-on-surface-variant text-sm font-mono mb-1">INVENTORY ITEMS</h2>
          <div className="text-xl font-display font-bold text-secondary">
            {purchasedItems.length} UNLOCKED
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`w-full flex items-center px-4 py-3 rounded transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary/10 border-l-4 border-primary text-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.label}
            </button>
          ))}
          
          <div className="mt-8 p-4 bg-surface-container rounded border border-secondary/20">
            <div className="flex items-center text-secondary mb-2">
              <Sparkles className="w-5 h-5 mr-2" />
              <h3 className="font-bold">Live Preview</h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Equip an item to immediately see it reflected across your interface. Companions will join you on your journey!
            </p>
          </div>
        </div>

        {/* Items Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentItems.map((item: any) => {
              const isOwned = purchasedItems.includes(item.id) || item.cost === 0;
              const equipped = isEquipped(activeTab, item.id);
              const canAfford = bytes >= item.cost;
              const ItemIcon = item.icon;

              return (
                <div 
                  key={item.id} 
                  className={`bg-surface-container rounded border transition-all duration-300 flex flex-col ${
                    equipped 
                      ? "border-primary shadow-[0_0_15px_rgba(94,234,212,0.2)]" 
                      : isOwned 
                        ? "border-secondary/30 hover:border-secondary/60" 
                        : "border-surface-bright hover:border-primary/50"
                  }`}
                >
                  <div className="p-6 flex-1 flex flex-col items-center text-center relative overflow-hidden">
                    {/* Background glow based on item color */}
                    <div className={`absolute -top-10 -right-10 w-24 h-24 blur-3xl opacity-20 ${item.color ? item.color.split(' ')[0] : 'bg-primary'}`} />
                    
                    {item.imageUrl ? (
                      <div className={`w-16 h-16 rounded-xl mb-4 flex items-center justify-center bg-surface-bright border border-surface-container-high shadow-lg text-white ${item.color || 'border-primary/20'}`}>
                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-contain [image-rendering:pixelated]" />
                      </div>
                    ) : ItemIcon ? (
                      <div className={`w-16 h-16 rounded-xl mb-4 flex items-center justify-center bg-surface-bright border border-surface-container-high shadow-lg text-white ${item.color || 'text-primary'}`}>
                        <ItemIcon className="w-8 h-8" />
                      </div>
                    ) : null}
                    
                    <h3 className="text-lg font-bold text-on-surface mb-1">{item.name}</h3>
                    <p className="text-xs text-on-surface-variant font-mono mb-4">{item.description}</p>
                    
                    <div className="mt-auto">
                      {!isOwned && (
                        <div className={`flex items-center justify-center font-mono font-bold ${canAfford ? 'text-primary' : 'text-red-400'}`}>
                          <Coins className="w-4 h-4 mr-2" />
                          {item.cost} BYTES
                        </div>
                      )}
                      {isOwned && !equipped && (
                        <div className="text-secondary font-mono font-bold text-sm">
                          OWNED
                        </div>
                      )}
                      {equipped && (
                        <div className="text-primary font-mono font-bold text-sm bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                          EQUIPPED
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-surface-bright bg-surface-container-high mt-auto">
                    {!isOwned ? (
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={!canAfford}
                        className={`w-full py-2 rounded font-bold font-mono transition-colors ${
                          canAfford 
                            ? "bg-primary text-background hover:bg-primary/90" 
                            : "bg-surface-bright text-on-surface-variant cursor-not-allowed"
                        }`}
                      >
                        PURCHASE
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEquip(activeTab, item.id)}
                        disabled={equipped}
                        className={`w-full py-2 rounded font-bold font-mono transition-colors ${
                          equipped
                            ? "bg-surface-bright text-on-surface-variant cursor-not-allowed opacity-50"
                            : "bg-secondary text-background hover:bg-secondary/90 shadow-[0_0_10px_rgba(129,140,248,0.3)]"
                        }`}
                      >
                        {equipped ? "EQUIPPED" : "EQUIP"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
