'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

const Atmosphere: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars 
        radius={100} 
        depth={50} 
        count={isMobile ? 1000 : 5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      <Sparkles 
        count={isMobile ? 30 : 100} 
        scale={10} 
        size={2} 
        speed={0.2} 
        opacity={0.2} 
        color="#3b82f6" 
      />
      <Sparkles 
        count={isMobile ? 20 : 50} 
        scale={15} 
        size={4} 
        speed={0.1} 
        opacity={0.1} 
        color="#8b5cf6" 
      />
      
      {/* Volumetric glow background */}
      <mesh scale={[100, 100, 100]} position={[0, 0, -50]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial 
          color="#00050a" 
          side={THREE.BackSide} 
        />
      </mesh>
    </group>
  );
};

export default Atmosphere;
