export type LionState = 'stand' | 'walk' | 'run' | 'sit' | 'sleep';

export type FacingDirection = 1 | -1; // 1 = facing right, -1 = facing left

export interface LionPosition {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  tilt: number; // Current pitch angle in degrees
  facing: FacingDirection;
  state: LionState;
  frameIndex: number;
  stateTimer: number;
  idleTimer: number;
  reactionTimer: number;
  distanceToTarget: number;
}

export interface LionParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  vx: number;
  vy: number;
  type: 'dust' | 'zzz' | 'sparkle';
  color?: string;
  char?: string;
}

export interface LionPhysicsConfig {
  /** Distance in px beyond which lion begins to follow */
  leashRadius: number;
  /** Distance in px to switch from walking to sprinting */
  runThreshold: number;
  /** Distance in px to consider target reached and start sitting */
  stopThreshold: number;
  /** Milliseconds of reaction delay before lion starts moving */
  reactionDelayMs: number;
  /** Seconds of sitting before transitioning to sleep */
  sleepDelaySeconds: number;
  /** Linear interpolation speed for walking */
  walkSpeed: number;
  /** Linear interpolation speed for running */
  runSpeed: number;
  /** Maximum tilt / pitch angle in degrees when moving up/down */
  maxTiltAngle: number;
  /** Speed of tilt smoothing (lerp factor) */
  tiltLerpSpeed: number;
  /** Friction / deceleration factor when stopping */
  friction: number;
  /** Milliseconds per frame for walking animation */
  walkFrameDuration: number;
  /** Milliseconds per frame for running animation */
  runFrameDuration: number;
  /** Milliseconds per frame for sitting/breathing idle animation */
  sitFrameDuration: number;
  /** Milliseconds per frame for sleeping animation */
  sleepFrameDuration: number;
}

