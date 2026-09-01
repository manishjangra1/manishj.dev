'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { LionState, FacingDirection, LionParticle, LionPosition } from './types';
import { DEFAULT_LION_CONFIG, SPRITE_GRID } from './constants';
import { LionSprite } from './LionSprites';

export function PixelLionCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [lionState, setLionState] = useState<LionState>('sit');
  const [frameIndex, setFrameIndex] = useState(0);

  // Position, velocity, tilt, and state tracking
  const posRef = useRef<LionPosition>({
    currentX: -200,
    currentY: -200,
    targetX: -200,
    targetY: -200,
    vx: 0,
    vy: 0,
    tilt: 0,
    facing: 1,
    state: 'sit',
    frameIndex: 0,
    stateTimer: 0,
    idleTimer: 0,
    reactionTimer: 0,
    distanceToTarget: 0,
  });

  const lionContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<LionParticle[]>([]);
  const particleIdCounter = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const lastParticleSpawnRef = useRef(0);
  const hasInitRef = useRef(false);
  const [, setParticleTick] = useState(0);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasPointer || prefersReducedMotion) return;

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      const pos = posRef.current;
      pos.targetX = clientX;
      pos.targetY = clientY;
      pos.idleTimer = 0; // Reset idle timer on user action

      if (!hasInitRef.current) {
        hasInitRef.current = true;
        pos.currentX = clientX + 20;
        pos.currentY = clientY + 16;
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
    let lastTimestamp = performance.now();

    const animate = (timestamp: number) => {
      const deltaTime = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      const pos = posRef.current;
      const config = DEFAULT_LION_CONFIG;

      // Raw cursor delta relative to lion center
      const rawDx = pos.targetX - pos.currentX;
      const rawDy = pos.targetY - pos.currentY;
      const cursorDistance = Math.hypot(rawDx, rawDy);

      // Stable facing direction update with hysteresis deadzone (prevents hover flipping)
      if (Math.abs(rawDx) > 16) {
        pos.facing = rawDx > 0 ? 1 : -1;
      }

      // Resting destination offset beside the cursor for compact footprint
      const targetOffsetX = pos.facing === 1 ? -16 : 16;
      const targetOffsetY = 12;
      const actualTargetX = pos.targetX + targetOffsetX;
      const actualTargetY = pos.targetY + targetOffsetY;

      const dx = actualTargetX - pos.currentX;
      const dy = actualTargetY - pos.currentY;
      const distance = Math.hypot(dx, dy);
      pos.distanceToTarget = distance;




      const isAwayFromCursor = distance > config.leashRadius;
      const isCurrentlyMoving = pos.state === 'run';

      // Increment reaction timer when cursor is away and lion is stationary
      if (isAwayFromCursor && !isCurrentlyMoving) {
        pos.reactionTimer += deltaTime * 1000;
      } else if (!isAwayFromCursor && !isCurrentlyMoving) {
        pos.reactionTimer = 0;
      }

      // Should the lion be moving?
      // Only starts moving after the delay (650ms), or continues until reaching the cursor
      const shouldMove =
        (isAwayFromCursor && pos.reactionTimer >= config.reactionDelayMs) ||
        (isCurrentlyMoving && distance > config.stopThreshold);

      let nextState: LionState = pos.state;
      let targetTilt = 0;

      if (shouldMove) {
        // Active pursuit (Slow, graceful running gallop)
        nextState = 'run';

        // Normalized direction vector
        const dirX = dx / distance;
        const dirY = dy / distance;

        // Constant calm slow running speed (pixels per second)
        const stepDistance = Math.min(config.runSpeed * deltaTime, distance);
        pos.currentX += dirX * stepDistance;
        pos.currentY += dirY * stepDistance;
        pos.idleTimer = 0;

        // Dynamic incline / decline angle along trajectory vector
        const angleOfMovement = Math.atan2(dy, Math.abs(dx)) * (180 / Math.PI);
        targetTilt = Math.max(-config.maxTiltAngle, Math.min(config.maxTiltAngle, angleOfMovement));
      } else {
        // Near cursor / Waiting in place
        pos.idleTimer += deltaTime;
        if (!isAwayFromCursor) {
          pos.reactionTimer = 0;
        }
        targetTilt = 0; // Flat grounded posture when stopped

        if (pos.state === 'run') {
          nextState = 'stand'; // Settle into standing pose first
          pos.stateTimer = 0;
        } else if (pos.state === 'stand') {
          pos.stateTimer += deltaTime;
          if (pos.stateTimer > 0.25) {
            nextState = 'sit'; // Settle down into sitting posture
          }
        } else if (pos.state === 'sit') {
          if (pos.idleTimer > config.sleepDelaySeconds) {
            nextState = 'sleep'; // Fall asleep after prolonged idle
          }
        }
      }


      // Smoothly interpolate angle of movement
      pos.tilt += (targetTilt - pos.tilt) * config.tiltLerpSpeed;



      // State transition handler
      if (nextState !== pos.state) {
        pos.state = nextState;
        pos.frameIndex = 0;
        lastFrameTimeRef.current = timestamp;
        setLionState(nextState);
      }

      // State-specific frame cycling duration
      let frameDuration = config.walkFrameDuration;
      let maxFrames = 4;

      if (pos.state === 'run') {
        frameDuration = config.runFrameDuration;
        maxFrames = 4;
      } else if (pos.state === 'walk') {
        frameDuration = config.walkFrameDuration;
        maxFrames = 4;
      } else if (pos.state === 'sit' || pos.state === 'stand') {
        frameDuration = config.sitFrameDuration;
        maxFrames = 2;
      } else if (pos.state === 'sleep') {
        frameDuration = config.sleepFrameDuration;
        maxFrames = 2;
      }

      if (timestamp - lastFrameTimeRef.current > frameDuration) {
        lastFrameTimeRef.current = timestamp;
        pos.frameIndex = (pos.frameIndex + 1) % maxFrames;
        setFrameIndex(pos.frameIndex);
      }

      // Micro-dust particle effects when running fast
      if (pos.state === 'run' && distance > 40) {
        if (timestamp - lastParticleSpawnRef.current > 75) {
          lastParticleSpawnRef.current = timestamp;
          const dustX = pos.facing === 1 ? pos.currentX - 12 : pos.currentX + 12;
          const dustY = pos.currentY + 10;
          particlesRef.current.push({
            id: ++particleIdCounter.current,
            x: dustX + (Math.random() - 0.5) * 3,
            y: dustY + (Math.random() - 0.5) * 2,
            opacity: 0.75,
            size: Math.random() > 0.5 ? 3 : 2,
            vx: (pos.facing === 1 ? -1 : 1) * (0.3 + Math.random() * 0.3),
            vy: -0.2 - Math.random() * 0.2,
            type: 'dust',
          });
        }
      } else if (pos.state === 'sleep') {
        if (timestamp - lastParticleSpawnRef.current > 1300) {
          lastParticleSpawnRef.current = timestamp;
          const zX = pos.facing === 1 ? pos.currentX + 12 : pos.currentX - 12;
          const zY = pos.currentY - 2;
          particlesRef.current.push({
            id: ++particleIdCounter.current,
            x: zX,
            y: zY,
            opacity: 0.85,
            size: 8,
            vx: (pos.facing === 1 ? 0.25 : -0.25) + (Math.random() - 0.5) * 0.15,
            vy: -0.35,
            type: 'zzz',
            char: 'z',
          });
        }
      }

      // Update particle decay
      if (particlesRef.current.length > 0) {
        particlesRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.opacity -= p.type === 'zzz' ? 0.008 : 0.035;
        });
        particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0);
        setParticleTick(timestamp);
      }

      // Hardware accelerated DOM transformation: pixel-grid snap to avoid subpixel blur
      if (lionContainerRef.current) {
        const scaleX = pos.facing;
        const rotationAngle = pos.tilt;
        const renderX = Math.round(pos.currentX);
        const renderY = Math.round(pos.currentY);
        lionContainerRef.current.style.transform = `translate3d(${renderX}px, ${renderY}px, 0) scaleX(${scaleX}) rotate(${rotationAngle}deg)`;
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
  }, [prefersReducedMotion]);

  if (!mounted || prefersReducedMotion || !visible) return null;

  const spriteWidth = SPRITE_GRID.width * SPRITE_GRID.pixelSize;
  const spriteHeight = SPRITE_GRID.height * SPRITE_GRID.pixelSize;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* Particle Effects (Dust Puffs & Sleep Zzz) */}
      {particlesRef.current.map((p) => {
        if (p.type === 'zzz') {
          return (
            <div
              key={p.id}
              className="absolute font-mono font-bold text-[9px] select-none text-[var(--color-text-muted)] pointer-events-none"
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                opacity: p.opacity,
                transform: 'translate(-50%, -50%)',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))',
              }}
            >
              {p.char || 'z'}
            </div>
          );
        }

        return (
          <div
            key={p.id}
            className="absolute rounded-none pointer-events-none"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: 'var(--color-text-secondary)',
              opacity: p.opacity * 0.6,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}

      {/* Main Pixel Lion Companion Container */}
      <div
        ref={lionContainerRef}
        className="absolute top-0 left-0 will-change-transform pointer-events-none select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
        style={{
          width: `${spriteWidth}px`,
          height: `${spriteHeight}px`,
          marginLeft: `-${spriteWidth / 2}px`,
          marginTop: `-${spriteHeight / 2}px`,
          transform: 'translate3d(-200px, -200px, 0) scaleX(1) rotate(0deg)',
          transformOrigin: 'center center',
          imageRendering: 'pixelated',
        }}
      >
        <LionSprite state={lionState} frameIndex={frameIndex} />
      </div>
    </div>
  );
}


export default PixelLionCursor;
