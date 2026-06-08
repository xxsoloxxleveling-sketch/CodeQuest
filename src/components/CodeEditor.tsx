"use client";

import { useRef, useEffect } from "react";
import Editor, { useMonaco, Monaco } from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export default function CodeEditor({ value, onChange, language = "python" }: CodeEditorProps) {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("codequest-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "bbcac5", fontStyle: "italic" },
          { token: "keyword", foreground: "b5fff0" },
          { token: "string", foreground: "fba76e" },
          { token: "number", foreground: "bdc2ff" },
          { token: "identifier", foreground: "dee1fd" },
        ],
        colors: {
          "editor.background": "#0e1226",
          "editor.foreground": "#dee1fd",
          "editorLineNumber.foreground": "#34384e",
          "editor.lineHighlightBackground": "#161a2f",
          "editorCursor.foreground": "#b5fff0",
          "editorIndentGuide.background": "#1a1e33",
          "editorIndentGuide.activeBackground": "#34384e",
        },
      });
      monaco.editor.setTheme("codequest-dark");
    }
  }, [monaco]);

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  return (
    <div className="w-full h-full">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme="codequest-dark"
        options={{
          fontFamily: "var(--font-body-md), 'JetBrains Mono', monospace",
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          formatOnPaste: true,
        }}
        loading={
          <div className="flex items-center justify-center h-full text-primary animate-pulse">
            Loading Editor...
          </div>
        }
      />
    </div>
  );
}
