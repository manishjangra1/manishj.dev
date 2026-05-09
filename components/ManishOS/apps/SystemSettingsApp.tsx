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
  label,
  resolvedTheme
}: { 
  mode: ThemeMode; 
  active: boolean; 
  onClick: () => void;
  icon: any;
  label: string;
  resolvedTheme: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
      active 
        ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
        : resolvedTheme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/5 hover:bg-black/10'
    }`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
      active 
        ? 'bg-blue-500 text-white' 
        : resolvedTheme === 'dark' ? 'bg-white/10 text-white/60' : 'bg-black/10 text-black/40'
    }`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="text-left">
      <div className="font-medium">{label}</div>
      <div className="text-xs opacity-50">{active ? 'Currently Active' : 'Switch to ' + label}</div>
    </div>
  </button>
);

const SystemSettingsApp: React.FC = () => {
  const { 
    theme, setTheme, resolvedTheme, 
    motionEnabled, setMotionEnabled,
    soundsEnabled, setSoundsEnabled,
    density, setDensity 
  } = useOS();

  return (
    <div className={`h-full p-8 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'text-white' : 'text-zinc-900'
    }`}>
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
            resolvedTheme={resolvedTheme}
          />
          <AppearanceCard 
            mode="dark" 
            label="Dark Mode" 
            icon={Moon} 
            active={theme === 'dark'} 
            onClick={() => setTheme('dark')} 
            resolvedTheme={resolvedTheme}
          />
          <AppearanceCard 
            mode="auto" 
            label="Auto Mode" 
            icon={Monitor} 
            active={theme === 'auto'} 
            onClick={() => setTheme('auto')} 
            resolvedTheme={resolvedTheme}
          />
        </SettingsSection>

        <SettingsSection title="Experience" icon={Zap}>
          <div className={`col-span-full border rounded-xl p-6 space-y-6 transition-colors ${
            resolvedTheme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MonitorPlay className="w-5 h-5 opacity-50" />
                <div>
                  <div className="font-medium">Motion & Parallax</div>
                  <div className="text-xs opacity-50">Enable spatial depth effects</div>
                </div>
              </div>
              <button 
                onClick={() => setMotionEnabled(!motionEnabled)}
                className={`w-12 h-6 rounded-full relative p-1 transition-colors duration-300 ${
                  motionEnabled ? 'bg-blue-500' : (resolvedTheme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300')
                }`}
              >
                <motion.div 
                  animate={{ x: motionEnabled ? 24 : 0 }}
                  className="w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 opacity-50" />
                <div>
                  <div className="font-medium">System Sounds</div>
                  <div className="text-xs opacity-50">Audio feedback for interactions</div>
                </div>
              </div>
              <button 
                onClick={() => setSoundsEnabled(!soundsEnabled)}
                className={`w-12 h-6 rounded-full relative p-1 transition-colors duration-300 ${
                  soundsEnabled ? 'bg-blue-500' : (resolvedTheme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300')
                }`}
              >
                <motion.div 
                  animate={{ x: soundsEnabled ? 24 : 0 }}
                  className="w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Layout className="w-5 h-5 opacity-50" />
                <div>
                  <div className="font-medium">Interface Density</div>
                  <div className="text-xs opacity-50">Compact vs. Spacious layout</div>
                </div>
              </div>
              <div className={`flex gap-1 p-1 rounded-lg transition-colors ${
                resolvedTheme === 'dark' ? 'bg-white/5' : 'bg-black/5'
              }`}>
                <button 
                  onClick={() => setDensity('compact')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    density === 'compact' 
                      ? (resolvedTheme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black')
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  Compact
                </button>
                <button 
                  onClick={() => setDensity('standard')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    density === 'standard'
                      ? (resolvedTheme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black')
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  Standard
                </button>
              </div>
            </div>
          </div>
        </SettingsSection>

        <footer className="pt-12 text-center text-[10px] opacity-30 uppercase tracking-[0.2em]">
          MOS v1.0.4 • Build 24A5264n
        </footer>
      </div>
    </div>
  );
};

export default SystemSettingsApp;
