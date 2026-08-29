'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  vx: number;
  vy: number;
}

// Utility to smoothly interpolate angles avoiding 360-degree flip jumps
function lerpAngle(start: number, end: number, factor: number): number {
  const difference = ((((end - start) % 360) + 540) % 360) - 180;
  return start + difference * factor;
}

export function PixelPlaneCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Position and Physics Refs
  const posRef = useRef({
    currentX: -100,
    currentY: -100,
    targetX: -100,
    targetY: -100,
    angle: 0,
    idleTimer: 0,
  });

  const planeRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [, setParticleTick] = useState(0);
  const lastParticleTime = useRef(0);

  useEffect(() => {
    // Only run on desktop/devices with fine pointer (mouse)
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasPointer || prefersReducedMotion) return;

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      if (!visible) {
        posRef.current.currentX = e.clientX;
        posRef.current.currentY = e.clientY;
        setVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationFrameId: number;
    let particleIdCounter = 0;

    const animate = (timestamp: number) => {
      const pos = posRef.current;
      const dx = pos.targetX - pos.currentX;
      const dy = pos.targetY - pos.currentY;
      const distance = Math.hypot(dx, dy);

      // Smooth, deliberate pursuit flight physics (gentle follow speed)
      const lerpSpeed = 0.055;
      pos.currentX += dx * lerpSpeed;
      pos.currentY += dy * lerpSpeed;

      // Calculate directional flight angle when moving
      if (distance > 1.2) {
        const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        pos.angle = lerpAngle(pos.angle, targetAngle, 0.08);
      } else {
        // Subtle floating idle motion
        pos.idleTimer += 0.035;
      }

      // Update plane DOM transform directly for max 120fps performance
      if (planeRef.current) {
        const idleOffsetY = distance <= 1.5 ? Math.sin(pos.idleTimer) * 2.5 : 0;
        const idleBank = distance <= 1.5 ? Math.cos(pos.idleTimer * 0.7) * 5 : 0;
        const finalAngle = pos.angle + idleBank;

        planeRef.current.style.transform = `translate3d(${pos.currentX}px, ${pos.currentY + idleOffsetY}px, 0) translate(-50%, -50%) rotate(${finalAngle}deg)`;
      }

      // Spawn dense pixel exhaust smoke particles behind the engine
      if (distance > 1.8 && timestamp - lastParticleTime.current > 20) {
        lastParticleTime.current = timestamp;
        const rad = ((pos.angle - 90) * Math.PI) / 180;
        const perpRad = rad + Math.PI / 2;

        // Spawn twin contrail streams behind wings/engines
        [-3, 3].forEach((lateralOffset) => {
          const exhaustX = pos.currentX - Math.cos(rad) * 12 + Math.cos(perpRad) * lateralOffset;
          const exhaustY = pos.currentY - Math.sin(rad) * 12 + Math.sin(perpRad) * lateralOffset;

          particlesRef.current.push({
            id: ++particleIdCounter,
            x: exhaustX + (Math.random() - 0.5) * 2,
            y: exhaustY + (Math.random() - 0.5) * 2,
            opacity: 0.9,
            size: Math.random() > 0.4 ? 4 : 3,
            vx: -Math.cos(rad) * 0.4 + (Math.random() - 0.5) * 0.3,
            vy: -Math.sin(rad) * 0.4 + (Math.random() - 0.5) * 0.3,
          });
        });

        // Cap maximum active particles for high density without lag
        if (particlesRef.current.length > 40) {
          particlesRef.current.splice(0, particlesRef.current.length - 40);
        }
      }

      // Update and decay smoke particles
      if (particlesRef.current.length > 0) {
        particlesRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.opacity -= 0.016; // Slower fade for dense visible trail
        });
        particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0);
        setParticleTick(timestamp);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, visible]);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Dense Contrail Pixel Particles */}
      {particlesRef.current.map((p) => (
        <div
          key={p.id}
          className="absolute bg-[var(--color-text-muted)] border border-[var(--color-border-strong)] rounded-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Pixelated Aeroplane Body */}
      <div
        ref={planeRef}
        className={`absolute top-0 left-0 text-[var(--color-text)] transition-opacity duration-300 ${
          visible ? 'opacity-90' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]"
        >
          {/* Nose Tip */}
          <rect x="11" y="2" width="2" height="2" fill="currentColor" />

          {/* Forward Fuselage */}
          <rect x="10" y="4" width="4" height="3" fill="currentColor" />

          {/* Cockpit Glass Pixel */}
          <rect x="11" y="5" width="2" height="2" fill="var(--color-bg)" />

          {/* Main Fuselage Body */}
          <rect x="10" y="7" width="4" height="8" fill="currentColor" />

          {/* Main Wings (Sharp Pixel Step Grid) */}
          <rect x="2" y="9" width="20" height="2" fill="currentColor" />
          <rect x="4" y="11" width="16" height="2" fill="currentColor" />
          <rect x="7" y="13" width="10" height="1" fill="currentColor" />

          {/* Wingtip Beacon Details */}
          <rect x="2" y="9" width="2" height="2" fill="var(--color-text-muted)" />
          <rect x="20" y="9" width="2" height="2" fill="var(--color-text-muted)" />

          {/* Tail Wings (Stabilizers) */}
          <rect x="5" y="17" width="14" height="2" fill="currentColor" />
          <rect x="8" y="19" width="8" height="1" fill="currentColor" />

          {/* Tail Fin */}
          <rect x="11" y="15" width="2" height="4" fill="currentColor" />

          {/* Engine Exhaust Nozzle */}
          <rect x="10" y="20" width="4" height="1" fill="var(--color-text-muted)" />
        </svg>
      </div>
    </div>
  );
}

export default PixelPlaneCursor;
