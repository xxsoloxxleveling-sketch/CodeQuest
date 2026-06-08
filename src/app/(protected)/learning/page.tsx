"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Settings as SettingsIcon, Terminal, Gamepad2, Code, ChevronRight, ChevronLeft, BookOpen, Sword } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import TerminalOutput from "@/components/TerminalOutput";
import ASTViewer from "@/components/ASTViewer";
import GameCanvas, { GameState } from "@/components/GameCanvas";
import { pythonCurriculum, javaCurriculum } from "@/lib/curriculumData";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

// Client-side Java syntax checking & transpiler
function simulateJavaCompiler(code: string, day: number): { success: boolean; error?: string; pyCode?: string } {
  const trimmed = code.trim();
  
  // 1. Check for public class Main
  const classMatch = trimmed.match(/public\s+class\s+(\w+)/);
  if (!classMatch) {
    return { success: false, error: "Main.java:1: error: class definition missing\n    Please define the class as 'public class Main'." };
  }
  const className = classMatch[1];
  if (className !== "Main") {
    return { success: false, error: `Main.java:1: error: class ${className} is public, should be declared in a file named Main.java\npublic class ${className} {` };
  }

  // 2. Check for main method
  const mainMatch = trimmed.match(/public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s+args\s*\)/) ||
                    trimmed.match(/public\s+static\s+void\s+main\s*\(\s*String\s+args\s*\[\s*\]\s*\)/);
  if (!mainMatch) {
    return { success: false, error: "Main.java: error: Main method not found in class Main, please define the main method as:\n    public static void main(String[] args)" };
  }

  // 3. Verify braces { }
  let openBraces = 0;
  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed[i] === "{") openBraces++;
    if (trimmed[i] === "}") openBraces--;
  }
  if (openBraces !== 0) {
    return { success: false, error: "Main.java: error: reached end of file while parsing\n    Check that all opening braces '{' have a matching closing brace '}'." };
  }

  // 4. Extract body of main method
  const mainIdx = trimmed.indexOf("public static void main");
  const mainStartBrace = trimmed.indexOf("{", mainIdx);
  if (mainStartBrace === -1) {
    return { success: false, error: "Main.java: error: main method brace missing" };
  }

  let braceCount = 1;
  let mainBody = "";
  let endIdx = -1;
  for (let i = mainStartBrace + 1; i < trimmed.length; i++) {
    if (trimmed[i] === "{") braceCount++;
    if (trimmed[i] === "}") {
      braceCount--;
      if (braceCount === 0) {
        endIdx = i;
        break;
      }
    }
  }
  if (endIdx === -1) {
    return { success: false, error: "Main.java: error: reached end of file while parsing main method" };
  }
  mainBody = trimmed.substring(mainStartBrace + 1, endIdx);

  // 5. Split mainBody into lines and validate semicolons
  const rawLines = mainBody.split("\n");
  
  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i].trim();
    if (rawLine === "" || rawLine.startsWith("//") || rawLine.startsWith("/*") || rawLine.startsWith("*") || rawLine.endsWith("*/")) {
      continue;
    }
    // Statement lines must end with a semicolon
    if (!rawLine.endsWith(";") && !rawLine.endsWith("{") && !rawLine.endsWith("}")) {
      const origLineNum = getOriginalLineNumber(code, rawLines[i]);
      return { success: false, error: `Main.java:${origLineNum}: error: ';' expected\n    ${rawLine}` };
    }
  }

  // 6. Check for Scanner import if Day 5
  if (day === 5) {
    const importMatch = trimmed.match(/import\s+java\.util\.Scanner\s*;/);
    if (!importMatch) {
      return { success: false, error: "Main.java:2: error: cannot find symbol\n  symbol:   class Scanner\n  location: class Main\n    Please import Scanner: import java.util.Scanner;" };
    }
    
    const hasScannerInit = mainBody.includes("new Scanner(System.in)");
    if (!hasScannerInit) {
      return { success: false, error: "Main.java: error: Scanner not initialized with System.in\n    Expected: Scanner sc = new Scanner(System.in);" };
    }
  }

  // 7. Transpile main method body to Python
  const lines = rawLines.map(l => l.trim()).filter(l => l !== "");
  let pyLines: string[] = [];
  
  for (let line of lines) {
    line = line.trim();
    if (line.startsWith("//") || line.startsWith("/*") || line.startsWith("*") || line.endsWith("*/")) {
      pyLines.push(line.replace("//", "#"));
      continue;
    }
    
    if (line.endsWith(";")) {
      line = line.substring(0, line.length - 1).trim();
    }

    let processed = line;

    // Check System.out.println
    if (processed.includes("System.out.println")) {
      const matchPrint = processed.match(/System\.out\.println\s*\((.*)\)/);
      if (matchPrint) {
        let inside = matchPrint[1].trim();
        processed = `print(${inside})`;
      }
    } else if (processed.includes("System.out.print")) {
      const matchPrint = processed.match(/System\.out\.print\s*\((.*)\)/);
      if (matchPrint) {
        let inside = matchPrint[1].trim();
        processed = `print(${inside}, end='')`;
      }
    }

    // Type declarations
    const declMatch = processed.match(/^(String|int|double|boolean|Scanner)\s+(\w+)\s*=\s*(.*)$/);
    if (declMatch) {
      const type = declMatch[1];
      const varName = declMatch[2];
      let value = declMatch[3].trim();

      if (type === "boolean") {
        if (value === "true") value = "True";
        if (value === "false") value = "False";
      }

      if (value.includes(".nextLine()")) {
        value = "input()";
      } else if (value.includes(".nextInt()")) {
        value = "int(input())";
      } else if (type === "Scanner") {
        continue;
      }

      processed = `${varName} = ${value}`;
    } else {
      const assignMatch = processed.match(/^(\w+)\s*=\s*(.*)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        let value = assignMatch[2].trim();
        if (value.includes(".nextLine()")) {
          value = "input()";
        } else if (value.includes(".nextInt()")) {
          value = "int(input())";
        }
        processed = `${varName} = ${value}`;
      }
    }
    
    pyLines.push(processed);
  }

  return { success: true, pyCode: pyLines.join("\n") };
}

function getOriginalLineNumber(code: string, snippet: string): number {
  const lines = code.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(snippet)) {
      return i + 1;
    }
  }
  return 1;
}

export default function LearningPage() {
  const { data: session, update } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const trackParam = searchParams.get("track") || "python";
  const isJava = trackParam === "java";
  const curriculum = isJava ? javaCurriculum : pythonCurriculum;
  
  const dayParam = searchParams.get("day");
  const dayIndex = dayParam ? parseInt(dayParam) - 1 : 0;
  const currentDay = curriculum[dayIndex] || curriculum[0];

  const completedDays = isJava
    ? (session?.user as any)?.completedJavaDays || []
    : (session?.user as any)?.completedDays || [];

  const maxUnlockedDay = Math.max(0, ...completedDays) + 1;
  const isLocked = currentDay.day > maxUnlockedDay;

  // New Modes
  const [viewMode, setViewMode] = useState<'lecture' | 'quest'>('lecture');
  const [rightTab, setRightTab] = useState<'ide' | 'ast'>('ide');

  const [code, setCode] = useState(currentDay.codeExample);
  const [output, setOutput] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    playerMessage: null,
    isGateOpen: false,
  });
  const workerRef = useRef<Worker | null>(null);

  // Reset code when day or track changes
  useEffect(() => {
    setCode(currentDay.codeExample);
    setOutput([]);
    setGameState({ playerMessage: null, isGateOpen: false });
    setViewMode('lecture');
  }, [currentDay.day, trackParam]);

  useEffect(() => {
    // Initialize Web Worker for Pyodide execution
    workerRef.current = new Worker(new URL("../../../workers/pyodide.worker.ts", import.meta.url));
    
    workerRef.current.onmessage = (e) => {
      const { status, output: workerOutput, error, message, type, action, text } = e.data;
      
      if (type === "GAME_ACTION") {
        if (action === "say") {
          setGameState(prev => ({ ...prev, playerMessage: text }));
        } else if (action === "open_gate") {
          setGameState(prev => ({ ...prev, isGateOpen: true }));
        }
        return;
      }

      if (status === "loading" || status === "running") {
        setOutput((prev) => [...prev, `[System]: ${message}`]);
      } else if (status === "success") {
        if (workerOutput) {
          setOutput((prev) => [...prev, ...workerOutput.split("\n").filter((l: string) => l)]);
        }
        setIsExecuting(false);

        // Win Condition Checker
        let won = false;
        const outLower = (workerOutput || "").toLowerCase();
        
        if (currentDay.day === 1 && outLower.includes("i am awake")) won = true;
        if (currentDay.day === 2 && outLower.includes("starlight")) won = true;
        if (currentDay.day === 3 && outLower.includes("18")) won = true;
        if (currentDay.day === 4 && outLower.includes("firestorm")) won = true;
        if (currentDay.day === 5 && (outLower.includes("welcome") || outLower.includes("hello"))) won = true;

        if (won) {
          setGameState(prev => ({ ...prev, isGateOpen: true }));
          // Call API to complete day
          fetch("/api/user/complete-day", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dayId: currentDay.day, track: trackParam })
          }).then(res => res.json()).then(data => {
            if (data.message) {
              setOutput((prev) => [...prev, `[System]: ${data.message}`]);
            }
            if (isJava && data.completedJavaDays) {
              update({ completedJavaDays: data.completedJavaDays, xp: data.xp, level: data.level, bytes: data.bytes });
            } else if (!isJava && data.completedDays) {
              update({ completedDays: data.completedDays, xp: data.xp, level: data.level, bytes: data.bytes });
            }
          });
        }

      } else if (status === "error") {
        setOutput((prev) => [...prev, `[Error]: ${error}`]);
        setIsExecuting(false);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [currentDay.day, trackParam]);

  const handleRunCode = () => {
    if (!workerRef.current || isExecuting) return;
    setIsExecuting(true);
    setOutput([]);
    setGameState({ playerMessage: null, isGateOpen: false });

    let finalPythonCode = "";

    if (isJava) {
      // 1. Simulating Java compilation & transpiling
      const compilerResult = simulateJavaCompiler(code, currentDay.day);
      if (!compilerResult.success) {
        setOutput((prev) => [...prev, `[Error]: Compilation Failed!`, compilerResult.error || ""]);
        setIsExecuting(false);
        return;
      }
      finalPythonCode = compilerResult.pyCode || "";
    } else {
      finalPythonCode = code;
    }

    // Patch input() to not block
    const patchedCode = `
import builtins
builtins.input = lambda prompt="": "Traveler"
` + finalPythonCode;
    
    workerRef.current.postMessage({
      id: Date.now(),
      python: patchedCode,
    });
  };

  const handleNextDay = () => {
    if (dayIndex < curriculum.length - 1) {
      router.push(`/learning?track=${trackParam}&day=${currentDay.day + 1}`);
    }
  };

  const handlePrevDay = () => {
    if (dayIndex > 0) {
      router.push(`/learning?track=${trackParam}&day=${currentDay.day - 1}`);
    }
  };

  // Reusable IDE component
  const IDEComponent = (
    <div className={`bg-surface rounded-2xl border flex flex-col h-full overflow-hidden relative shadow-[0_0_15px_rgba(129,140,248,0.05)] border-t-2 ${
      isJava ? "border-secondary/10 border-t-secondary" : "border-primary/10 border-t-primary"
    }`}>
      <div className="bg-surface-container-high px-4 py-2 border-b border-secondary/10 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Code className={`${isJava ? "text-secondary" : "text-primary"} w-4 h-4`} />
          <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
            {isJava ? "Main.java" : "main.py"}
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            title="Reset Code"
            className="text-on-surface-variant hover:text-primary p-1 transition-colors" 
            onClick={() => setCode(currentDay.codeExample)}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="text-on-surface-variant hover:text-primary p-1 transition-colors">
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-background relative overflow-hidden">
        <CodeEditor value={code} onChange={setCode} />
      </div>
      
      <div className="p-4 bg-surface-container-low border-t border-secondary/10 shrink-0 flex justify-between items-center">
        <div className="text-xs text-on-surface-variant font-mono">
          Ready to execute
        </div>
        <button 
          onClick={handleRunCode}
          disabled={isExecuting}
          className={`font-bold px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
            isExecuting 
              ? 'opacity-50 cursor-not-allowed' 
              : isJava 
              ? 'bg-secondary text-background hover:scale-105 glow-secondary' 
              : 'bg-primary text-background hover:scale-105 glow-primary'
          }`}
        >
          <Play className="w-5 h-5 fill-current" />
          {isExecuting ? 'Running...' : 'Run Code'}
        </button>
      </div>
      <TerminalOutput output={output} />
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)] relative animate-fade-in">
      {/* Locked Overlay */}
      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#090d21]/80 backdrop-blur-md rounded-2xl border border-secondary/20"
          >
            <div className="text-center p-8 bg-surface rounded-2xl shadow-2xl border border-secondary/20 max-w-md">
              <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(var(--secondary-rgb),0.2)]">
                <span className="material-symbols-outlined text-4xl text-secondary">lock</span>
              </div>
              <h2 className="text-3xl font-bold text-on-surface mb-4">Sector Locked</h2>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                You must complete Lecture {currentDay.day - 1} before you can enter this zone. Master the previous coding spells to advance!
              </p>
              <button 
                onClick={handlePrevDay}
                className={`text-on-secondary font-bold px-8 py-3 rounded-lg hover:opacity-90 hover:scale-105 active:scale-95 transition-all ${
                  isJava ? "bg-secondary shadow-[0_0_15px_rgba(var(--secondary-rgb),0.4)]" : "bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]"
                }`}
              >
                Return to Previous Quest
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main View Mode Logic */}
      {viewMode === 'lecture' ? (
        <>
          {/* Lecture Mode Left Pane: Markdown */}
          <section className="flex-1 flex flex-col min-w-[300px] max-w-3xl overflow-hidden">
            <motion.div 
              key={`lecture-${currentDay.day}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`bg-surface/60 backdrop-blur-xl rounded-2xl border flex flex-col h-full overflow-hidden ${
                isJava ? "border-secondary/30 shadow-[0_0_20px_rgba(249,115,22,0.05)]" : "border-primary/30 shadow-[0_0_20px_rgba(20,184,166,0.05)]"
              }`}
            >
              <div className="flex items-center justify-between mb-4 p-6 pb-2 shrink-0 border-b border-surface-bright">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                    isJava ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
                  }`}>
                    Lecture {currentDay.day}
                  </span>
                  <h2 className="text-2xl font-display font-bold text-on-surface flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-on-surface-variant" />
                    {currentDay.title}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={handlePrevDay} disabled={dayIndex === 0} className="p-2 rounded bg-surface-container hover:bg-surface-container-high disabled:opacity-50 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-on-surface" />
                  </button>
                  <button onClick={handleNextDay} disabled={dayIndex === curriculum.length - 1} className="p-2 rounded bg-surface-container hover:bg-surface-container-high disabled:opacity-50 transition-colors">
                    <ChevronRight className="w-5 h-5 text-on-surface" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar">
                <div className={`prose prose-invert max-w-none ${isJava ? 'prose-orange' : 'prose-teal'}`}>
                  <ReactMarkdown>{currentDay.whatYouWillLearn}</ReactMarkdown>
                </div>
              </div>

              <div className="p-6 bg-surface-container-low border-t border-surface-bright shrink-0 flex justify-end">
                <button 
                  onClick={() => setViewMode('quest')}
                  className={`font-display font-bold px-8 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                    isJava ? 'bg-secondary text-background hover:scale-105 shadow-[0_0_20px_rgba(var(--secondary-rgb),0.4)]' : 'bg-primary text-background hover:scale-105 shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]'
                  }`}
                >
                  <Sword className="w-5 h-5" />
                  Begin Quest
                </button>
              </div>
            </motion.div>
          </section>

          {/* Lecture Mode Right Pane: IDE / AST Tabs */}
          <section className="flex-1 flex flex-col bg-surface rounded-2xl border border-surface-bright overflow-hidden min-w-[300px]">
            <div className="flex border-b border-surface-bright bg-background shrink-0 p-1">
              <button 
                onClick={() => setRightTab('ide')}
                className={`flex-1 py-3 text-sm font-bold uppercase transition-colors rounded-t-lg flex justify-center items-center gap-2 ${
                  rightTab === 'ide' 
                    ? isJava ? 'bg-surface text-secondary' : 'bg-surface text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <Code className="w-4 h-4" /> Practice IDE
              </button>
              <button 
                onClick={() => setRightTab('ast')}
                className={`flex-1 py-3 text-sm font-bold uppercase transition-colors rounded-t-lg flex justify-center items-center gap-2 ${
                  rightTab === 'ast' 
                    ? isJava ? 'bg-surface text-secondary' : 'bg-surface text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <Terminal className="w-4 h-4" /> AST Explorer
              </button>
            </div>
            
            <div className="flex-1 relative bg-background">
              {rightTab === 'ide' ? IDEComponent : (
                <div className="absolute inset-0 p-4">
                  <ASTViewer code={code} />
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Quest Mode Left Pane: IDE */}
          <section className="flex-1 flex flex-col min-w-[300px] max-w-3xl">
             <button 
               onClick={() => setViewMode('lecture')}
               className="mb-4 flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors w-fit font-mono text-sm"
             >
               <ChevronLeft className="w-4 h-4" /> Back to Lecture
             </button>
             {IDEComponent}
          </section>

          {/* Quest Mode Right Pane: Game Canvas */}
          <section className="flex-1 flex flex-col min-w-[300px] overflow-hidden rounded-2xl border border-surface-bright relative">
            <GameCanvas gameState={gameState} level={currentDay.gameLevel} day={currentDay.day} />
          </section>
        </>
      )}
    </div>
  );
}
