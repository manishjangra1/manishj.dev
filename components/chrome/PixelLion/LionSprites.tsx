import React from 'react';
import { LionState } from './types';
import { LION_PALETTE, SPRITE_GRID } from './constants';

interface LionSpriteProps {
  state: LionState;
  frameIndex: number;
}

export const LionSprite: React.FC<LionSpriteProps> = ({ state, frameIndex }) => {
  const { width, height } = SPRITE_GRID;
  const p = LION_PALETTE;

  const renderFrame = () => {
    switch (state) {
      case 'run':
      case 'walk':
        return renderRunFrame(frameIndex % 4, p);
      case 'sit':
        return renderSitFrame(frameIndex % 2, p);
      case 'sleep':
        return renderSleepFrame(frameIndex % 2, p);
      case 'stand':
      default:
        return renderStandFrame(frameIndex % 2, p);
    }
  };

  return (
    <svg
      width={SPRITE_GRID.displayWidth}
      height={SPRITE_GRID.displayHeight}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      shapeRendering="crispEdges"
      className="overflow-visible select-none pointer-events-none"
      style={{ imageRendering: 'pixelated' }}
    >
      {renderFrame()}
    </svg>
  );
};


/* =========================================================================
   1. SIT FRAME (Dense Micro-Pixel Art, Regal Seated Lion King)
   ========================================================================= */
function renderSitFrame(frame: number, p: typeof LION_PALETTE) {
  const bY = frame === 1 ? -1 : 0; // Gentle breathing rise
  const tailTwitch = frame === 1 ? 1 : 0;

  return (
    <g id="lion-sit-dense">
      {/* --- TAIL (Curling around haunches and paws with fluffy tuft) --- */}
      <rect x="7" y="24" width="4" height="3" fill={p.c4} />
      <rect x="4" y="26" width="4" height="2" fill={p.c3} />
      <rect x="2" y="24" width="3" height="3" fill={p.c3} />
      <rect x="1" y={20 - tailTwitch} width="3" height="5" fill={p.c2} />
      {/* Bushy Tail Tuft */}
      <rect x="1" y={15 - tailTwitch} width="5" height="5" fill={p.c5} />
      <rect x="2" y={16 - tailTwitch} width="3" height="3" fill={p.c6} />
      <rect x="3" y={14 - tailTwitch} width="3" height="2" fill={p.c4} />
      <rect x="4" y={15 - tailTwitch} width="1" height="1" fill={p.c2} />

      {/* --- FOLDED REAR HAUNCHES & HIND LEGS (Seated flat on floor) --- */}
      <rect x="8" y="17" width="10" height="8" fill={p.c5} />
      <rect x="7" y="22" width="12" height="6" fill={p.c4} />
      <rect x="8" y="25" width="11" height="4" fill={p.c3} />
      <rect x="9" y="27" width="10" height="2" fill={p.c2} />
      <rect x="8" y="29" width="12" height="2" fill={p.c5} />

      {/* --- UPRIGHT PROUD TORSO & SPINE --- */}
      <rect x="15" y={11 + bY} width="13" height="13" fill={p.c3} />
      <rect x="16" y={10 + bY} width="11" height="3" fill={p.c2} />
      <rect x="17" y={9 + bY} width="9" height="2" fill={p.c1} />
      <rect x="16" y={17 + bY} width="8" height="7" fill={p.c4} />

      {/* --- STRAIGHT FRONT LEGS & ROUNDED PAWS --- */}
      {/* Far Front Leg (Shadow depth) */}
      <rect x="24" y="18" width="4" height="11" fill={p.c5} />
      <rect x="24" y="29" width="5" height="2" fill={p.c5} />

      {/* Near Front Leg */}
      <rect x="28" y="16" width="5" height="13" fill={p.c3} />
      <rect x="29" y="17" width="3" height="11" fill={p.c2} />
      <rect x="30" y="18" width="1" height="9" fill={p.c1} />
      {/* Broad Front Paw with claws */}
      <rect x="27.5" y="29" width="6.5" height="2" fill={p.c2} />
      <rect x="27" y="30" width="7.5" height="1" fill={p.c5} />
      <rect x="29" y="30" width="1" height="1" fill={p.c6} />
      <rect x="32" y="30" width="1" height="1" fill={p.c6} />

      {/* --- GLORIOUS VOLUMINOUS MANE (Dense layered tufts) --- */}
      {/* Outer dark base */}
      <rect x="16" y={4 + bY} width="16" height="18" fill={p.c5} />
      <rect x="17" y={3 + bY} width="15" height="19" fill={p.c4} />
      <rect x="18" y={2 + bY} width="14" height="20" fill={p.c3} />
      <rect x="19" y={1 + bY} width="12" height="6" fill={p.c2} />
      <rect x="20" y={0.5 + bY} width="10" height="3" fill={p.c1} />

      {/* Mane flow highlights and shadow crevices */}
      <rect x="17" y={7 + bY} width="5" height="10" fill={p.c5} />
      <rect x="19" y={14 + bY} width="6" height="8" fill={p.c4} />
      <rect x="22" y={17 + bY} width="7" height="5" fill={p.c3} />
      <rect x="24" y={19 + bY} width="5" height="4" fill={p.c2} />
      <rect x="26" y={21 + bY} width="3" height="2" fill={p.c1} />

      {/* --- NOBLE HEAD & FACE --- */}
      <rect x="28" y={4 + bY} width="11" height="10" fill={p.c2} />
      <rect x="29" y={3 + bY} width="9" height="3" fill={p.c1} />

      {/* Lion Ear */}
      <rect x="26" y={1 + bY} width="4.5" height="4.5" fill={p.c4} />
      <rect x="27" y={2 + bY} width="2.5" height="2.5" fill={p.c6} />
      <rect x="28" y={2.5 + bY} width="1" height="1" fill={p.c3} />
      <rect x="31" y={1 + bY} width="4" height="4" fill={p.c2} />
      <rect x="32" y={2 + bY} width="2" height="2" fill={p.c4} />

      {/* Piercing Cat Eye & Brow */}
      <rect x="32" y={6 + bY} width="5" height="2" fill={p.c5} />
      <rect x="33" y={7 + bY} width="4" height="3" fill={p.c6} />
      <rect x="34" y={7 + bY} width="2" height="2" fill={p.c1} />
      <rect x="35" y={8 + bY} width="1" height="1" fill={p.c6} />

      {/* Feline Muzzle & Whiskers */}
      <rect x="36" y={9 + bY} width="8" height="5.5" fill={p.c2} />
      <rect x="37" y={10 + bY} width="6" height="4" fill={p.c1} />
      {/* Dark Nose */}
      <rect x="42" y={9 + bY} width="3" height="3" fill={p.c6} />
      <rect x="43" y={9.5 + bY} width="1.5" height="1.5" fill={p.c4} />
      {/* Mouth & Chin line */}
      <rect x="39" y={13.5 + bY} width="5" height="1.5" fill={p.c5} />
      <rect x="38" y={14.5 + bY} width="4" height="1.5" fill={p.c3} />
      {/* Whiskers */}
      <rect x="39" y={12 + bY} width="1" height="1" fill={p.c4} />
      <rect x="41" y={12 + bY} width="1" height="1" fill={p.c4} />
    </g>
  );
}

/* =========================================================================
   2. STAND FRAME (Alert, noble 4-legged posture)
   ========================================================================= */
function renderStandFrame(frame: number, p: typeof LION_PALETTE) {
  const tailY = frame === 1 ? -1 : 0;
  const bY = frame === 1 ? -0.8 : 0;

  return (
    <g id="lion-stand-dense">
      {/* --- TAIL (S-curve high alert with dark bushy brush) --- */}
      <rect x="8" y={15 + tailY} width="3" height="3" fill={p.c4} />
      <rect x="5" y={12 + tailY} width="3" height="4" fill={p.c4} />
      <rect x="3" y={8 + tailY} width="3" height="5" fill={p.c3} />
      <rect x="4" y={4 + tailY} width="3.5" height="5" fill={p.c2} />
      <rect x="6" y={1.5 + tailY} width="5.5" height="5" fill={p.c5} />
      <rect x="7" y={2.5 + tailY} width="3.5" height="3" fill={p.c6} />
      <rect x="6" y={1 + tailY} width="3" height="2" fill={p.c2} />

      {/* --- FAR REAR LEG (In shadow) --- */}
      <rect x="10" y="18" width="5" height="6" fill={p.c5} />
      <rect x="9" y="22" width="4" height="7" fill={p.c5} />
      <rect x="9" y="29" width="5" height="2" fill={p.c5} />

      {/* --- FAR FRONT LEG (In shadow) --- */}
      <rect x="27" y="18" width="5" height="6" fill={p.c5} />
      <rect x="27" y="22" width="4" height="7" fill={p.c5} />
      <rect x="27" y="29" width="5" height="2" fill={p.c5} />

      {/* --- MAIN BODY & SPINE --- */}
      <rect x="11" y={12 + bY} width="19" height="8" fill={p.c3} />
      <rect x="12" y={11 + bY} width="17" height="3" fill={p.c2} />
      <rect x="13" y={10 + bY} width="15" height="2" fill={p.c1} />
      <rect x="12" y={19 + bY} width="16" height="3" fill={p.c4} />

      {/* --- NEAR REAR LEG & MUSCULAR HOCK --- */}
      <rect x="11" y={14 + bY} width="7" height="7" fill={p.c3} />
      <rect x="10" y={16 + bY} width="7" height="6" fill={p.c2} />
      <rect x="11" y={20} width="5" height="5" fill={p.c2} />
      <rect x="12" y={24} width="4" height="5" fill={p.c2} />
      <rect x="11" y={29} width="6" height="2" fill={p.c2} />
      <rect x="10.5" y={30} width="7" height="1" fill={p.c5} />

      {/* --- NEAR FRONT LEG & SHOULDER --- */}
      <rect x="28" y={15 + bY} width="6" height="7" fill={p.c3} />
      <rect x="29" y={20} width="5" height="5" fill={p.c2} />
      <rect x="29.5" y={24} width="4" height="5" fill={p.c2} />
      <rect x="28.5" y={29} width="6" height="2" fill={p.c2} />
      <rect x="28" y={30} width="7" height="1" fill={p.c5} />

      {/* --- MASSIVE REGAL MANE --- */}
      <rect x="19" y={5 + bY} width="14" height="17" fill={p.c5} />
      <rect x="20" y={4 + bY} width="14" height="18" fill={p.c4} />
      <rect x="21" y={3 + bY} width="13" height="19" fill={p.c3} />
      <rect x="22" y={2 + bY} width="11" height="6" fill={p.c2} />
      <rect x="23" y={1 + bY} width="9" height="3" fill={p.c1} />
      <rect x="20" y={8 + bY} width="5" height="9" fill={p.c5} />
      <rect x="23" y={14 + bY} width="7" height="8" fill={p.c4} />

      {/* --- HEAD, EYE, MUZZLE --- */}
      <rect x="30" y={5 + bY} width="11" height="10" fill={p.c2} />
      <rect x="31" y={4 + bY} width="9" height="3" fill={p.c1} />

      {/* Ear */}
      <rect x="28" y={2 + bY} width="4.5" height="4.5" fill={p.c4} />
      <rect x="29" y={3 + bY} width="2.5" height="2.5" fill={p.c6} />
      <rect x="33" y={2 + bY} width="4" height="4" fill={p.c2} />

      {/* Eye */}
      <rect x="34" y={7 + bY} width="5" height="2" fill={p.c5} />
      <rect x="35" y={8 + bY} width="4" height="3" fill={p.c6} />
      <rect x="36" y={8 + bY} width="2" height="2" fill={p.c1} />

      {/* Muzzle */}
      <rect x="38" y={10 + bY} width="8" height="5.5" fill={p.c2} />
      <rect x="39" y={11 + bY} width="6" height="4" fill={p.c1} />
      <rect x="44" y={10 + bY} width="3" height="3" fill={p.c6} />
      <rect x="41" y={14.5 + bY} width="5" height="1.5" fill={p.c5} />
    </g>
  );
}

/* =========================================================================
   3. RUN / GALLOP FRAMES (4-phase authentic feline bounding leap)
   ========================================================================= */
function renderRunFrame(frame: number, p: typeof LION_PALETTE) {
  switch (frame) {
    case 0: // Full extension stretch leap
      return (
        <g id="lion-run-dense-0">
          {/* Tail trailing straight back */}
          <rect x="0" y="9" width="7" height="3" fill={p.c5} />
          <rect x="1" y="10" width="5" height="2" fill={p.c6} />
          <rect x="6" y="10" width="6" height="2.5" fill={p.c3} />

          {/* Rear legs kicked far back */}
          <rect x="4" y="14" width="10" height="5" fill={p.c5} />
          <rect x="0" y="16" width="6" height="3.5" fill={p.c5} />

          {/* Stretched muscular torso */}
          <rect x="11" y="9" width="22" height="8" fill={p.c3} />
          <rect x="12" y="8" width="20" height="3" fill={p.c2} />
          <rect x="13" y="7" width="18" height="2" fill={p.c1} />
          <rect x="14" y="15" width="16" height="3" fill={p.c4} />

          {/* Streamlined mane flowing back */}
          <rect x="19" y="3" width="14" height="14" fill={p.c5} />
          <rect x="20" y="2" width="14" height="15" fill={p.c4} />
          <rect x="21" y="1" width="13" height="15" fill={p.c3} />
          <rect x="22" y="0.5" width="10" height="5" fill={p.c1} />

          {/* Head pushed forward */}
          <rect x="31" y="3" width="11" height="9" fill={p.c2} />
          <rect x="36" y="5" width="4" height="3" fill={p.c6} />
          <rect x="37" y="5" width="2" height="2" fill={p.c1} />
          <rect x="39" y="7" width="7" height="5" fill={p.c2} />
          <rect x="44" y="7" width="3" height="3" fill={p.c6} />

          {/* Front legs outstretched forward */}
          <rect x="30" y="13" width="8" height="5" fill={p.c3} />
          <rect x="36" y="14" width="9" height="4" fill={p.c2} />
          <rect x="43" y="15" width="5" height="3" fill={p.c1} />
        </g>
      );

    case 1: // Airborne suspension glide
      return (
        <g id="lion-run-dense-1">
          {/* Tail */}
          <rect x="1" y="7" width="6" height="3.5" fill={p.c5} />
          <rect x="2" y="8" width="4" height="2" fill={p.c6} />
          <rect x="6" y="8" width="5" height="2.5" fill={p.c3} />

          {/* Rear legs trailing */}
          <rect x="5" y="16" width="8" height="5" fill={p.c5} />
          <rect x="2" y="19" width="5" height="3.5" fill={p.c5} />

          {/* Body high */}
          <rect x="11" y="7" width="21" height="8.5" fill={p.c3} />
          <rect x="12" y="6" width="19" height="3" fill={p.c2} />
          <rect x="13" y="5" width="17" height="2" fill={p.c1} />
          <rect x="14" y="14" width="15" height="3" fill={p.c4} />

          {/* Mane */}
          <rect x="19" y="2" width="14" height="14" fill={p.c5} />
          <rect x="20" y="1" width="14" height="15" fill={p.c4} />
          <rect x="21" y="0" width="13" height="15" fill={p.c3} />

          {/* Head */}
          <rect x="31" y="2" width="11" height="9" fill={p.c2} />
          <rect x="36" y="4" width="4" height="3" fill={p.c6} />
          <rect x="37" y="4" width="2" height="2" fill={p.c1} />
          <rect x="39" y="6" width="7" height="5" fill={p.c2} />
          <rect x="44" y="6" width="3" height="3" fill={p.c6} />

          {/* Front legs angled down-forward */}
          <rect x="30" y="13" width="7" height="5" fill={p.c3} />
          <rect x="34" y="17" width="7" height="5" fill={p.c2} />
          <rect x="39" y="20" width="5" height="3" fill={p.c1} />
        </g>
      );

    case 2: // Tucked / Gathered compact spring
      return (
        <g id="lion-run-dense-2">
          {/* Tail rising */}
          <rect x="4" y="4" width="6" height="4" fill={p.c5} />
          <rect x="5" y="5" width="4" height="2.5" fill={p.c6} />
          <rect x="7" y="7" width="4" height="4" fill={p.c3} />

          {/* Rear legs tucked under */}
          <rect x="11" y="17" width="7" height="6" fill={p.c5} />
          <rect x="12" y="21" width="6" height="5" fill={p.c5} />

          {/* Arched body */}
          <rect x="11" y="8" width="19" height="10" fill={p.c3} />
          <rect x="12" y="7" width="17" height="3" fill={p.c2} />
          <rect x="13" y="6" width="15" height="2" fill={p.c1} />

          {/* Mane */}
          <rect x="19" y="2" width="14" height="15" fill={p.c5} />
          <rect x="20" y="1" width="14" height="16" fill={p.c4} />
          <rect x="21" y="0.5" width="13" height="16" fill={p.c3} />

          {/* Head */}
          <rect x="30" y="2" width="11" height="9.5" fill={p.c2} />
          <rect x="35" y="4.5" width="4" height="3" fill={p.c6} />
          <rect x="36" y="4.5" width="2" height="2" fill={p.c1} />
          <rect x="38" y="6.5" width="7.5" height="5.5" fill={p.c2} />
          <rect x="43" y="6.5" width="3" height="3" fill={p.c6} />

          {/* Front legs tucked under chest */}
          <rect x="25" y="16" width="6" height="6" fill={p.c3} />
          <rect x="23" y="21" width="6" height="5" fill={p.c2} />
        </g>
      );

    case 3: // Push-off power stride
    default:
      return (
        <g id="lion-run-dense-3">
          {/* Tail */}
          <rect x="3" y="6" width="5.5" height="4" fill={p.c5} />
          <rect x="5" y="8" width="4" height="4" fill={p.c3} />

          {/* Rear legs pushing ground hard */}
          <rect x="8" y="16" width="7" height="7" fill={p.c5} />
          <rect x="7" y="22" width="6" height="7" fill={p.c5} />
          <rect x="6" y="28" width="7" height="3" fill={p.c5} />

          {/* Body angled upwards */}
          <rect x="11" y="9" width="19" height="9" fill={p.c3} />
          <rect x="12" y="8" width="17" height="3" fill={p.c2} />
          <rect x="13" y="7" width="15" height="2" fill={p.c1} />

          {/* Mane */}
          <rect x="19" y="3" width="14" height="15" fill={p.c5} />
          <rect x="20" y="2" width="14" height="16" fill={p.c4} />
          <rect x="21" y="1" width="13" height="16" fill={p.c3} />

          {/* Head */}
          <rect x="30" y="3" width="11" height="9.5" fill={p.c2} />
          <rect x="35" y="5.5" width="4" height="3" fill={p.c6} />
          <rect x="36" y="5.5" width="2" height="2" fill={p.c1} />
          <rect x="38" y="7.5" width="7.5" height="5.5" fill={p.c2} />
          <rect x="43" y="7.5" width="3" height="3" fill={p.c6} />

          {/* Front legs reaching forward */}
          <rect x="29" y="15" width="7" height="5.5" fill={p.c3} />
          <rect x="32" y="19" width="6" height="6" fill={p.c2} />
          <rect x="35" y="24" width="6" height="3" fill={p.c1} />
        </g>
      );
  }
}

/* =========================================================================
   4. SLEEP FRAME (Loaf resting pose with gentle breathing)
   ========================================================================= */
function renderSleepFrame(frame: number, p: typeof LION_PALETTE) {
  const bY = frame === 1 ? -0.8 : 0;

  return (
    <g id="lion-sleep-dense">
      {/* Tail resting */}
      <rect x="3" y="25" width="6" height="3" fill={p.c5} />
      <rect x="7" y="24" width="5" height="2.5" fill={p.c4} />

      {/* Body loaf */}
      <rect x="10" y={17 + bY} width="22" height="9" fill={p.c3} />
      <rect x="11" y={16 + bY} width="20" height="3" fill={p.c2} />
      <rect x="12" y={15 + bY} width="18" height="2" fill={p.c1} />
      <rect x="11" y={25} width="21" height="4" fill={p.c5} />

      {/* Mane draped */}
      <rect x="19" y={10 + bY} width="14" height="14" fill={p.c5} />
      <rect x="20" y={9 + bY} width="14" height="15" fill={p.c4} />
      <rect x="21" y={8 + bY} width="13" height="16" fill={p.c3} />

      {/* Head resting on front paws */}
      <rect x="30" y={12 + bY} width="11" height="9" fill={p.c2} />
      <rect x="31" y={11 + bY} width="9" height="3" fill={p.c1} />

      {/* Ear */}
      <rect x="28" y={8 + bY} width="4" height="4" fill={p.c4} />

      {/* Closed eye slit */}
      <rect x="34" y={15 + bY} width="4" height="2" fill={p.c6} />

      {/* Muzzle resting */}
      <rect x="36" y={16 + bY} width="8" height="5" fill={p.c2} />
      <rect x="42" y={16 + bY} width="3" height="3" fill={p.c6} />

      {/* Front paws tucked under chin */}
      <rect x="29" y="25" width="12" height="4" fill={p.c4} />
      <rect x="30" y="26" width="11" height="3" fill={p.c3} />
    </g>
  );
}
