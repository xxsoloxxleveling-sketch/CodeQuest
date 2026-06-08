import { 
  Shield, Cpu, Wand2, Star, Target, Ghost, Hexagon, Zap, 
  Cat, Dog, Bug, Squirrel, Box, Crown, Gem, Rocket, Flame, 
  Sparkles, Feather, Anchor, Compass, Heart, Moon
} from "lucide-react";

export const SHOP_ITEMS = {
  avatars: [
    { id: "default-avatar-id", name: "Recruit", cost: 0, desc: "Standard issue training gear.", icon: Shield, color: "text-blue-400" },
    { id: "avatar-cyber-hacker", name: "Cyber Hacker", cost: 300, desc: "Neon visor helmet for system infiltrations.", icon: Cpu, color: "text-primary" },
    { id: "avatar-arch-mage", name: "Arch Mage", cost: 600, desc: "Master of code syntax and binary spellcraft.", icon: Wand2, color: "text-purple-400" },
    { id: "avatar-star-princess", name: "Star Princess", cost: 500, desc: "Holographic tiara and glowing pastel aesthetic.", icon: Star, color: "text-pink-400" },
    { id: "avatar-mecha-pilot", name: "Mecha Pilot", cost: 700, desc: "Heavy armor and HUD visor.", icon: Target, color: "text-orange-400" },
    { id: "avatar-pixel-ninja", name: "Pixel Ninja", cost: 400, desc: "Stealthy masked coder.", icon: Ghost, color: "text-gray-400" },
    { id: "avatar-ai-overseer", name: "AI Overseer", cost: 1000, desc: "Advanced synthetic lifeform.", icon: Hexagon, color: "text-red-400" },
    { id: "avatar-royal-emperor", name: "Royal Emperor", cost: 1500, desc: "A golden crown for the absolute ruler of the repo.", icon: Crown, color: "text-yellow-400" },
    { id: "avatar-diamond-hands", name: "Diamond Hands", cost: 2000, desc: "Unbreakable resolve. Holds the code through crashes.", icon: Gem, color: "text-cyan-300" },
    { id: "avatar-astro-dev", name: "Astro Dev", cost: 800, desc: "Rocketing towards production at lightspeed.", icon: Rocket, color: "text-indigo-400" },
    { id: "avatar-fire-coder", name: "Fire Coder", cost: 600, desc: "Leaving a trail of blazing fast commits.", icon: Flame, color: "text-orange-500" },
    { id: "avatar-magic-fairy", name: "Magic Fairy", cost: 550, desc: "Sprinkling pixie dust to make the bugs disappear.", icon: Sparkles, color: "text-yellow-200" },
    { id: "avatar-love-bug", name: "Love Bug", cost: 350, desc: "Spreading good vibes and clean code.", icon: Heart, color: "text-rose-400" },
    { id: "avatar-lunar-child", name: "Lunar Child", cost: 650, desc: "Codes best under the light of the moon.", icon: Moon, color: "text-slate-200" }
  ],
  themes: [
    { id: "neon-theme-id", name: "Neon Cyberpunk", cost: 500, desc: "High-contrast syntax highlighting optimized for late-night hacking.", bg: "#0d0d14", codeBg: "bg-background", tag: "const", string: "'online'", tagColor: "text-red-400", stringColor: "text-[#f1fa8c]" },
    { id: "theme-deep-ocean", name: "Deep Ocean", cost: 800, desc: "Calming blues and muted aquas to reduce eye strain.", bg: "#071324", codeBg: "bg-[#0a192f]", tag: "const", string: "'online'", tagColor: "text-cyan-400", stringColor: "text-blue-300" },
    { id: "theme-matrix-green", name: "Matrix Green", cost: 1200, desc: "Nostalgic monochrome terminal vibes.", bg: "#050b05", codeBg: "bg-black/80", tag: "var", string: "'access'", tagColor: "text-[#00ff00]/70", stringColor: "text-[#00ff00]" },
    { id: "theme-sakura-blossom", name: "Sakura Blossom", cost: 900, desc: "Soft pinks, cherry blossom accents, and light floral styling.", bg: "#fff0f5", codeBg: "bg-[#ffe4e1]", tag: "let", string: "'bloom'", tagColor: "text-pink-500", stringColor: "text-rose-400" },
    { id: "theme-magical-girl", name: "Magical Girl", cost: 1500, desc: "Vibrant pinks, golds, and glittering syntax highlighting.", bg: "#ffe6f2", codeBg: "bg-[#ffb3d9]", tag: "sparkle", string: "'magic'", tagColor: "text-yellow-500", stringColor: "text-purple-500" },
    { id: "theme-midnight-forge", name: "Midnight Forge", cost: 800, desc: "Dark obsidian and molten orange for intense coding.", bg: "#1a0f00", codeBg: "bg-[#261400]", tag: "forge", string: "'fire'", tagColor: "text-orange-500", stringColor: "text-red-500" },
    { id: "theme-dracula", name: "Vampire Lord", cost: 1000, desc: "A dark theme inspired by the famous Dracula palette.", bg: "#282a36", codeBg: "bg-[#1e1f29]", tag: "class", string: "'blood'", tagColor: "text-[#ff79c6]", stringColor: "text-[#f1fa8c]" },
    { id: "theme-synthwave", name: "Synthwave '84", cost: 1300, desc: "Outrun aesthetic with glowing neon purples and cyans.", bg: "#2b213a", codeBg: "bg-[#241b2f]", tag: "import", string: "'retro'", tagColor: "text-[#f92aad]", stringColor: "text-[#36f9f6]" },
    { id: "theme-tokyo-night", name: "Tokyo Night", cost: 1100, desc: "A clean, dark theme that celebrates the lights of downtown Tokyo.", bg: "#1a1b26", codeBg: "bg-[#16161e]", tag: "function", string: "'city'", tagColor: "text-[#bb9af7]", stringColor: "text-[#9ece6a]" },
    { id: "theme-barbie-dream", name: "Barbie Dream", cost: 1400, desc: "Everything is plastic, it's fantastic. Hot pinks and bright whites.", bg: "#ffc0cb", codeBg: "bg-[#ff69b4]", tag: "style", string: "'glamour'", tagColor: "text-white", stringColor: "text-yellow-300" }
  ],
  titles: [
    { id: "default-title-id", name: "Level 42 Developer", cost: 0, desc: "Standard developer designation." },
    { id: "title-script-kiddie", name: "Script Kiddie", cost: 150, desc: "Everyone starts somewhere." },
    { id: "title-bug-hunter", name: "Bug Hunter", cost: 400, desc: "For developers who drink bugs for breakfast." },
    { id: "title-logic-fairy", name: "Logic Fairy", cost: 500, desc: "Sprinkling functional logic everywhere." },
    { id: "title-code-queen", name: "Code Queen", cost: 600, desc: "Ruler of the codebase kingdom." },
    { id: "title-syntax-samurai", name: "Syntax Samurai", cost: 700, desc: "Slicing through spaghetti code." },
    { id: "title-binary-archmage", name: "Binary Archmage", cost: 900, desc: "Ultimate prestige." },
    { id: "title-10x-dev", name: "10x Developer", cost: 1200, desc: "Mythical status. You do the work of an entire team." },
    { id: "title-so-copypaster", name: "Stack Overflow Scholar", cost: 300, desc: "Ctrl+C, Ctrl+V is a valid lifestyle." },
    { id: "title-css-wizard", name: "CSS Wizard", cost: 800, desc: "You can actually center a div on the first try." },
    { id: "title-frontend-princess", name: "Frontend Princess", cost: 850, desc: "Making the web beautiful, one component at a time." },
    { id: "title-backend-beast", name: "Backend Beast", cost: 850, desc: "Handling the servers, databases, and heavy lifting." },
    { id: "title-fullstack-god", name: "Full Stack God", cost: 2000, desc: "Omnipotent mastery over both the front and back end." }
  ],
  companions: [
    { id: "none", name: "None", cost: 0, desc: "Solo mission.", icon: null, imageUrl: null, baseImageUrl: null },
    { id: "companion-akita-dog", name: "Akita Dog", cost: 500, desc: "A loyal dog companion to follow your code.", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/dog/akita_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/dog/akita" },
    { id: "companion-red-fox", name: "Red Fox", cost: 800, desc: "A cunning and fast fox companion.", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/fox/red_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/fox/red" },
    { id: "companion-gray-totoro", name: "Gray Totoro", cost: 900, desc: "A fluffy and peaceful forest spirit.", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/totoro/gray_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/totoro/gray" },
    { id: "companion-red-crab", name: "Red Crab", cost: 1000, desc: "Snips away bugs with its claws.", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/crab/red_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/crab/red" },
    { id: "companion-green-turtle", name: "Green Turtle", cost: 1200, desc: "Slow and steady wins the race.", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/turtle/green_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/turtle/green" },
    { id: "companion-orange-turtle", name: "Orange Turtle", cost: 1500, desc: "A rare turtle with an orange shell.", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/turtle/orange_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/turtle/orange" },
    { id: "companion-yellow-clippy", name: "Clippy", cost: 300, desc: "It looks like you're writing code. Need some help?", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/clippy/yellow_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/clippy/yellow" },
    { id: "companion-rubber-duck", name: "Rubber Duck", cost: 400, desc: "The ultimate debugging companion. Tell it your problems.", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/rubber-duck/yellow_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/rubber-duck/yellow" },
    { id: "companion-green-snake", name: "Python Snake", cost: 1100, desc: "Slithers through your backend logic with ease.", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/snake/green_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/snake/green" },
    { id: "companion-white-fox", name: "Arctic Fox", cost: 1800, desc: "A rare icy fox with stunning speed.", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/fox/white_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/fox/white" },
    { id: "companion-black-dog", name: "Shadow Dog", cost: 1600, desc: "Blends in perfectly with dark mode.", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/dog/black_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/dog/black" },
    { id: "companion-rocky", name: "Rocky", cost: 700, desc: "A literal pet rock. Doesn't do much, but tries his best.", icon: null, imageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/rocky/gray_idle_8fps.gif", baseImageUrl: "https://raw.githubusercontent.com/tonybaloney/vscode-pets/main/media/rocky/gray" }
  ]
};

