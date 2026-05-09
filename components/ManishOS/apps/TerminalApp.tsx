'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "Welcome to Manish OS Terminal v1.0.4",
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
    <div className="h-full bg-zinc-950/90 p-4 font-mono text-sm text-emerald-500 overflow-hidden flex flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 mb-2 custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex items-center gap-2">
        <span className="text-blue-400 shrink-0">manish@os:~$</span>
        <input 
          autoFocus
          className="bg-transparent border-none outline-none flex-1 text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
};

export default TerminalApp;
