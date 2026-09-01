import { LionPhysicsConfig } from './types';

/**
 * Standard physics and animation timing configuration for the Lion companion
 */
export const DEFAULT_LION_CONFIG: LionPhysicsConfig = {
  /** Distance in px beyond which lion runs instead of walking */
  runThreshold: 9999, // Gallop stride mode
  /** Distance in px to consider target reached and sit down */
  stopThreshold: 22,
  /** Leash radius */
  leashRadius: 30,
  /** Milliseconds of delay before lion starts following the moved cursor */
  reactionDelayMs: 650,
  /** Seconds of sitting before transitioning to sleep */
  sleepDelaySeconds: 5.0,
  /** Slow, graceful running speed in pixels per second */
  walkSpeed: 105,
  /** Smooth pursuit speed when running */
  runSpeed: 105,
  /** Maximum tilt / pitch angle in degrees when moving up/down */
  maxTiltAngle: 32,
  /** Speed of tilt smoothing (lerp factor) */
  tiltLerpSpeed: 0.15,
  /** Friction factor */
  friction: 0.85,
  /** Milliseconds per frame for walking stride cycle */
  walkFrameDuration: 110,
  /** Milliseconds per frame for running gallop animation */
  runFrameDuration: 110,
  /** Milliseconds per frame for sitting/breathing idle animation */
  sitFrameDuration: 500,
  /** Milliseconds per frame for sleeping animation */
  sleepFrameDuration: 900,
};

export const LION_PALETTE = {
  // Pure Full Solid Theme Color (Full Black in light mode, Full White in dark mode)
  c1: 'var(--color-lion-fill, var(--color-text))',
  c2: 'var(--color-lion-fill, var(--color-text))',
  c3: 'var(--color-lion-fill, var(--color-text))',
  c4: 'var(--color-lion-accent, var(--color-text-secondary))',
  c5: 'var(--color-lion-fill, var(--color-text))',
  
  // Pure Inverted Contrast (Full White in light mode, Full Black in dark mode)
  c6: 'var(--color-lion-inverted, var(--color-bg))',
  
  // Particle effects
  dust: 'var(--color-text-muted)',
  zzz: 'var(--color-lion-fill, var(--color-text))',
} as const;



export const SPRITE_GRID = {
  width: 48,
  height: 32,
  displayWidth: 24, // Compact small screen footprint (24px x 16px)
  displayHeight: 16,
  pixelSize: 0.5,
} as const;

