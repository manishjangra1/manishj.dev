'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '@/contexts/OSContext';
import { useProjects, useSkills, useExperience, useSettings } from '@/hooks/useData';

const TerminalApp: React.FC = () => {
  const { resolvedTheme } = useOS();
  const { projects, isLoading: projectsLoading } = useProjects();
  const { groupedSkills, isLoading: skillsLoading } = useSkills();
  const { experience, isLoading: expLoading } = useExperience();

  const { settings, isLoading: settingsLoading } = useSettings();

  const [history, setHistory] = useState<string[]>([
    "Welcome to MOS Terminal",
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
        newHistory.push("Available commands: help, about, projects, skills, experience, contact, clear");
        break;
      
      case 'about':
        if (settingsLoading) {
          newHistory.push("Reading system configuration...");
        } else if (!settings) {
          newHistory.push("Manish Jangra: Full Stack Developer & Spatial Designer.");
        } else {
          newHistory.push(`[System Profile]: ${settings.siteTitle || 'Manish Jangra'}`);
          newHistory.push(`[Status]: ${settings.heroText || 'Available for work'}`);
          newHistory.push(`[Description]: ${settings.aboutText || 'Building the future of the web.'}`);
        }
        break;
      
      case 'projects':
        if (projectsLoading) {
          newHistory.push("Synchronizing with project database...");
        } else if (projects.length === 0) {
          newHistory.push("No projects found in the simulation catalog.");
        } else {
          newHistory.push(`Retrieved ${projects.length} projects:`);
          projects.forEach(p => {
            newHistory.push(`- ${p.title}: ${p.description.substring(0, 50)}...`);
          });
        }
        break;
      
      case 'skills':
        if (skillsLoading) {
          newHistory.push("Scanning technical core...");
        } else {
          newHistory.push("Technical Stack Breakdown:");
          Object.entries(groupedSkills).forEach(([category, skills]) => {
            const skillNames = skills.map(s => s.name).join(", ");
            newHistory.push(`[${category}]: ${skillNames}`);
          });
        }
        break;

      case 'experience':
        if (expLoading) {
          newHistory.push("Accessing professional timeline...");
        } else if (experience.length === 0) {
          newHistory.push("No experience records found.");
        } else {
          newHistory.push("Professional History:");
          experience.forEach(job => {
            newHistory.push(`- ${job.role} @ ${job.company} (${job.location || 'Remote'})`);
          });
        }
        break;
      
      case 'contact':
        newHistory.push("Contact Details:");
        newHistory.push("- Email: manish@manishj.dev");
        newHistory.push("- GitHub: github.com/manishjangra1");
        newHistory.push("- LinkedIn: linkedin.com/in/manishjangra1");
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
