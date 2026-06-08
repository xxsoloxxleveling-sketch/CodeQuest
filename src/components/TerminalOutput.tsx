import { Terminal as TerminalIcon } from "lucide-react";
import { useEffect, useRef } from "react";

interface TerminalOutputProps {
  output: string[];
  isError?: boolean;
}

export default function TerminalOutput({ output, isError = false }: TerminalOutputProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="bg-surface-container-high rounded-xl border border-secondary/10 flex flex-col overflow-hidden h-48">
      <div className="bg-surface-container-low px-4 py-2 border-b border-secondary/10 flex items-center gap-2 shrink-0">
        <TerminalIcon className="text-secondary w-4 h-4" />
        <span className="text-xs font-bold text-on-surface uppercase tracking-wider">Console Output</span>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap"
      >
        {output.length === 0 ? (
          <span className="text-on-surface-variant italic">Waiting for execution...</span>
        ) : (
          output.map((line, index) => (
            <div key={index} className={isError ? "text-red-400" : "text-dee1fd"}>
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
