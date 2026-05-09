'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOS, ThemeMode } from '@/contexts/OSContext';
import { Sun, Moon, Monitor, Palette, MonitorPlay, Volume2, Layout, Zap } from 'lucide-react';

const SettingsSection = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 text-sm font-semibold opacity-50 uppercase tracking-widest">
      <Icon className="w-4 h-4" />
      <span>{title}</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const AppearanceCard = ({ 
  mode, 
  active, 
  onClick, 
  icon: Icon, 
  label 
}: { 
  mode: ThemeMode; 
  active: boolean; 
  onClick: () => void;
  icon: any;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
      active 
        ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
        : 'bg-white/5 border-white/10 hover:bg-white/10'
    }`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/60'}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="text-left">
      <div className="font-medium">{label}</div>
      <div className="text-xs opacity-50">{active ? 'Currently Active' : 'Switch to ' + label}</div>
    </div>
  </button>
);

const SystemSettingsApp: React.FC = () => {
  const { theme, setTheme } = useOS();

  return (
    <div className="h-full p-8 overflow-y-auto custom-scrollbar space-y-12">
      <div className="max-w-2xl mx-auto space-y-12">
        <section className="text-center space-y-2">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="opacity-50">Personalize your spatial desktop experience</p>
        </section>

        <SettingsSection title="Appearance" icon={Palette}>
          <AppearanceCard 
            mode="light" 
            label="Light Mode" 
            icon={Sun} 
            active={theme === 'light'} 
            onClick={() => setTheme('light')} 
          />
          <AppearanceCard 
            mode="dark" 
            label="Dark Mode" 
            icon={Moon} 
            active={theme === 'dark'} 
            onClick={() => setTheme('dark')} 
          />
          <AppearanceCard 
            mode="auto" 
            label="Auto Mode" 
            icon={Monitor} 
            active={theme === 'auto'} 
            onClick={() => setTheme('auto')} 
          />
        </SettingsSection>

        <SettingsSection title="Experience" icon={Zap}>
          <div className="col-span-full bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MonitorPlay className="w-5 h-5 opacity-50" />
                <div>
                  <div className="font-medium">Motion & Parallax</div>
                  <div className="text-xs opacity-50">Enable spatial depth effects</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative p-1 cursor-pointer">
                <div className="absolute right-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 opacity-50" />
                <div>
                  <div className="font-medium">System Sounds</div>
                  <div className="text-xs opacity-50">Audio feedback for interactions</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-zinc-700 rounded-full relative p-1 cursor-pointer">
                <div className="absolute left-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Layout className="w-5 h-5 opacity-50" />
                <div>
                  <div className="font-medium">Interface Density</div>
                  <div className="text-xs opacity-50">Compact vs. Spacious layout</div>
                </div>
              </div>
              <div className="flex gap-1 p-1 bg-white/5 rounded-lg">
                <button className="px-3 py-1 rounded-md bg-white/10 text-xs font-medium">Compact</button>
                <button className="px-3 py-1 rounded-md text-xs font-medium opacity-50 hover:opacity-100">Standard</button>
              </div>
            </div>
          </div>
        </SettingsSection>

        <footer className="pt-12 text-center text-[10px] opacity-30 uppercase tracking-[0.2em]">
          Manish OS v1.0.4 • Build 24A5264n
        </footer>
      </div>
    </div>
  );
};

export default SystemSettingsApp;
