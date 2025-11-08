'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const themes: { name: string; value: ReturnType<typeof useTheme>['theme']; color: string }[] = [
  // Original themes
  { name: 'Dark', value: 'dark', color: '#6366f1' },
  { name: 'Light', value: 'light', color: '#4f46e5' },
  { name: 'Blue', value: 'blue', color: '#3b82f6' },
  { name: 'Green', value: 'green', color: '#10b981' },
  { name: 'Purple', value: 'purple', color: '#a855f7' },
  { name: 'Orange', value: 'orange', color: '#f97316' },
  { name: 'Red', value: 'red', color: '#ef4444' },
  // New beautiful themes
  { name: 'Sunset', value: 'sunset', color: '#fb7185' },
  { name: 'Ocean', value: 'ocean', color: '#06b6d4' },
  { name: 'Forest', value: 'forest', color: '#059669' },
  { name: 'Lavender', value: 'lavender', color: '#c084fc' },
  { name: 'Midnight', value: 'midnight', color: '#6366f1' },
  { name: 'Rose', value: 'rose', color: '#f43f5e' },
  { name: 'Amber', value: 'amber', color: '#f59e0b' },
  { name: 'Mint', value: 'mint', color: '#10b981' },
  { name: 'Indigo', value: 'indigo', color: '#6366f1' },
  { name: 'Coral', value: 'coral', color: '#fb7185' },
  { name: 'Emerald', value: 'emerald', color: '#10b981' },
  { name: 'Violet', value: 'violet', color: '#8b5cf6' },
  { name: 'Sakura', value: 'sakura', color: '#f472b6' },
  { name: 'Cyber', value: 'cyber', color: '#00ff88' },
];

export default function ThemeSelector() {
  const { theme, setTheme, colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when dropdown is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Prevent scroll propagation to background
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const isScrollingDown = e.deltaY > 0;
    const isScrollingUp = e.deltaY < 0;
    
    // Prevent background scroll when at scroll boundaries
    if (
      (isScrollingDown && scrollTop + clientHeight >= scrollHeight - 1) ||
      (isScrollingUp && scrollTop <= 1)
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 backdrop-blur-lg rounded-xl border transition-all flex items-center justify-center"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.cardBorder,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.cardBorder;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.cardBg;
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Select theme"
      >
        <Palette className="w-5 h-5" style={{ color: colors.textPrimary }} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 z-50 backdrop-blur-xl rounded-2xl border p-3 min-w-[200px] max-h-[600px] overflow-y-auto shadow-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              }}
              onWheel={handleWheel}
            >
              <div 
                className="text-xs font-semibold uppercase tracking-wider mb-3 px-2 py-2 rounded sticky top-0"
                style={{ 
                  color: colors.textSecondary,
                  backgroundColor: colors.cardBg,
                  paddingBottom: '8px',
                }}
              >
                Themes ({themes.length})
              </div>
              <div className="space-y-1">
                {themes.map((t) => (
                  <motion.button
                    key={t.value}
                    onClick={() => {
                      setTheme(t.value);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left border"
                    style={{
                      backgroundColor: theme === t.value ? colors.cardBorder : 'transparent',
                      borderColor: theme === t.value ? colors.gradientFrom : 'transparent',
                      color: theme === t.value ? colors.textPrimary : colors.textSecondary,
                    }}
                    onMouseEnter={(e) => {
                      if (theme !== t.value) {
                        e.currentTarget.style.backgroundColor = colors.cardBorder;
                        e.currentTarget.style.color = colors.textPrimary;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (theme !== t.value) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = colors.textSecondary;
                      }
                    }}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2"
                      style={{ 
                        backgroundColor: t.color,
                        borderColor: colors.cardBorder,
                      }}
                    />
                    <span className="text-sm font-medium">{t.name}</span>
                    {theme === t.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: colors.gradientFrom }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


