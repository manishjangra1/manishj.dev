'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

export const LiquidGlassCursor: React.FC = () => {
  const [hasPointer, setHasPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<'default' | 'card' | 'button' | 'text'>('default');

  // Precise inner dot position values (instant response)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const dotXSpring = useSpring(dotX, { damping: 22, stiffness: 450, mass: 0.15 });
  const dotYSpring = useSpring(dotY, { damping: 22, stiffness: 450, mass: 0.15 });

  // Elastic outer glass bubble position values (liquid trailing lag)
  const glassX = useMotionValue(-100);
  const glassY = useMotionValue(-100);
  const glassXSpring = useSpring(glassX, { damping: 28, stiffness: 180, mass: 0.75 });
  const glassYSpring = useSpring(glassY, { damping: 28, stiffness: 180, mass: 0.75 });

  useEffect(() => {
    // 1. Detect precise pointer device (mouse/trackpad, not touch)
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(pointer: fine)');
      setHasPointer(mediaQuery.matches);
      
      const mediaHandler = (e: MediaQueryListEvent) => setHasPointer(e.matches);
      mediaQuery.addEventListener('change', mediaHandler);

      // Hide cursor by default only if custom cursor is active
      if (mediaQuery.matches) {
        document.documentElement.classList.add('custom-cursor-active');
      }

      return () => {
        mediaQuery.removeEventListener('change', mediaHandler);
        document.documentElement.classList.remove('custom-cursor-active');
      };
    }
  }, []);

  useEffect(() => {
    if (!hasPointer) return;

    // 2. Window boundary handlers
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // 3. Mouse movement tracker
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      dotX.set(clientX);
      dotY.set(clientY);
      glassX.set(clientX);
      glassY.set(clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    // 4. Global Hover element classifier
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target is inside a link, button, or general interactive element first
      const linkOrButton = target.closest('a, button, [role="button"], input, select, textarea, .clickable');
      
      // Identify text elements (avoid selecting parent layouts like sections)
      const textEl = target.closest('p, h1, h2, h3, h4, h5, h6, li, code, span');
      const isTargetText = textEl && textEl.textContent?.trim();

      // Check for cards separately
      const cardEl = target.closest('.bento-card');

      if (linkOrButton) {
        // It's a link or button (even if it contains text inside), so avoid magnifying
        setIsHovered(true);
        setHoverType('button');
      } else if (isTargetText && !target.classList.contains('bento-card') && target.tagName !== 'SECTION') {
        // It's static reading text, so trigger magnification!
        setIsHovered(true);
        setHoverType('text');
      } else if (cardEl) {
        setIsHovered(true);
        setHoverType('card');
      } else {
        setIsHovered(false);
        setHoverType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [hasPointer, isVisible, dotX, dotY, glassX, glassY]);

  if (!hasPointer) return null;

  // Render cursor with Framer Motion animations
  return (
    <>
      {/* SVG Magnifier Displacement Filter Portal */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} width="0" height="0">
        <defs>
          <filter id="lens-zoom" x="-20%" y="-20%" width="140%" height="140%">
            <feImage 
              href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><defs><linearGradient id='r' x1='0' y1='0' x2='1' y2='0'><stop offset='0%25' stop-color='%23000000'/><stop offset='100%25' stop-color='%23ff0000'/></linearGradient><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0%25' stop-color='%23000000'/><stop offset='100%25' stop-color='%2300ff00'/></linearGradient></defs><rect width='100' height='100' fill='url(%23r)'/><rect width='100' height='100' fill='url(%23g)' style='mix-blend-mode:screen'/></svg>" 
              result="map" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="map" 
              scale="35" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      <AnimatePresence>
        {isVisible && (
          <>
            {/* Precise Inner Dot */}
            <motion.div
              style={{
                x: dotXSpring,
                y: dotYSpring,
              }}
              className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-amber rounded-full pointer-events-none z-99999 -translate-x-1/2 -translate-y-1/2"
              animate={{
                // Hide only during text magnification. Keep visible and highlighted on buttons and links!
                scale: isHovered 
                  ? hoverType === 'text' 
                    ? 0 
                    : hoverType === 'button'
                      ? 1.5 
                      : 1 
                  : 1,
                opacity: isHovered 
                  ? hoverType === 'text' 
                    ? 0 
                    : 1 
                  : 1,
              }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            />

            {/* Liquid Glass Ring */}
            <motion.div
              style={{
                x: glassXSpring,
                y: glassYSpring,
                backdropFilter: isHovered && hoverType === 'text' 
                  ? 'url(#lens-zoom)' 
                  : 'none',
                WebkitBackdropFilter: isHovered && hoverType === 'text' 
                  ? 'url(#lens-zoom)' 
                  : 'none',
              }}
              className="fixed top-0 left-0 pointer-events-none z-99998 -translate-x-1/2 -translate-y-1/2 border transition-[backdrop-filter,webkit-backdrop-filter] duration-300 ease-out"
              animate={{
                // Magnified big circle ONLY on text hover, subtle expansions on other interactive states
                width: isHovered 
                  ? hoverType === 'text'
                    ? 130 // Big circular magnifying glass for text
                    : hoverType === 'button'
                      ? 52 // Medium indicator for buttons
                      : 40 // Subtly larger indicator for cards
                  : 28, // Default idle pointer size
                
                height: isHovered 
                  ? hoverType === 'text'
                    ? 130 
                    : hoverType === 'button'
                      ? 52 
                      : 40 
                  : 28,
                
                borderRadius: '9999px',
                
                // Colors & borders (using theme vintage gold #A36620 in all states)
                borderColor: isHovered 
                  ? hoverType === 'text'
                    ? 'rgba(163, 102, 32, 0.65)' // Bold vintage gold for text magnifier
                    : hoverType === 'button'
                      ? 'rgba(163, 102, 32, 0.55)' // Medium vintage gold for buttons
                      : 'rgba(163, 102, 32, 0.4)' // Subtle vintage gold for cards
                  : 'rgba(163, 102, 32, 0.25)', // Faint vintage gold when idle
                
                backgroundColor: isHovered 
                  ? hoverType === 'text'
                    ? 'rgba(163, 102, 32, 0.02)' 
                    : 'rgba(163, 102, 32, 0.03)'
                  : 'rgba(163, 102, 32, 0.01)',

                boxShadow: isHovered 
                  ? hoverType === 'text'
                    ? 'inset 0 0 20px rgba(163, 102, 32, 0.12), 0 12px 40px rgba(44, 37, 32, 0.25)'
                    : hoverType === 'button'
                      ? 'inset 0 0 12px rgba(163, 102, 32, 0.08), 0 0 15px rgba(163, 102, 32, 0.12)'
                      : 'inset 0 0 10px rgba(163, 102, 32, 0.06), 0 8px 24px rgba(44, 37, 32, 0.15)'
                  : 'inset 0 0 8px rgba(163, 102, 32, 0.04), 0 8px 32px rgba(44, 37, 32, 0.15)',
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 26,
                mass: 0.65,
              }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiquidGlassCursor;
