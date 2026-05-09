'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '@/contexts/OSContext';

const TerminalApp: React.FC = () => {
  const { resolvedTheme } = useOS();
  const [history, setHistory] = useState<string[]>([
    "Welcome to MOS Terminal v1.0.4",
    "Type 'help' to see available commands.",
    ""
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `manish@os:~$ ${input}`];

    switch (cmd) {
      case 'help':
        newHistory.push("Available commands: help, about, projects, skills, contact, clear");
        break;
      case 'about':
        newHistory.push("Manish Jangra: A Fullstack Developer & Spatial Designer building the future of the web.");
        break;
      case 'projects':
        newHistory.push("Loading projects database... [Found 12 projects]");
        newHistory.push("- Simulation Engine");
        newHistory.push("- Quantum CRM");
        newHistory.push("- Neural Portfolio");
        break;
      case 'skills':
        newHistory.push("Core Tech: React, Next.js, TypeScript, Three.js, Node.js, MongoDB.");
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      default:
        newHistory.push(`Command not found: ${cmd}. Type 'help' for assistance.`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div 
      className={`h-full p-4 overflow-hidden flex flex-col transition-colors duration-500 antialiased ${
        resolvedTheme === 'dark' 
          ? 'bg-zinc-950/90 text-emerald-500' 
          : 'bg-zinc-50/90 text-emerald-700'
      }`}
      style={{ 
        fontFamily: 'SF Mono, ui-monospace, Menlo, Monaco, Consolas, monospace',
        fontSize: '13px',
        lineHeight: '1.5'
      }}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 mb-2 custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex items-center gap-2">
        <span className={`shrink-0 transition-colors font-medium ${
          resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        }`}>manish@os:~$</span>
        <input 
          autoFocus
          spellCheck={false}
          autoComplete="off"
          className={`bg-transparent border-none outline-none flex-1 transition-colors ${
            resolvedTheme === 'dark' ? 'text-white' : 'text-zinc-900'
          }`}
          style={{ 
            fontFamily: 'SF Mono, ui-monospace, Menlo, Monaco, Consolas, monospace',
            fontSize: '13px'
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default TerminalApp;
