'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

const Atmosphere: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Warm Ambient Glow (Far Field) */}
      <pointLight position={[10, 10, -30]} intensity={0.3} color="#D6A86A" />
      <pointLight position={[-15, -5, -25]} intensity={0.15} color="#8B6B4A" />
    </group>
  );
};


export default Atmosphere;
