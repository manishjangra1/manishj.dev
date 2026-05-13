'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, MeshWobbleMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const IdentityCore: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.z = time * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -time * 0.4;
      const scale = 1 + Math.sin(time * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Outer Holographic Shell */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          wireframe 
          transparent 
          opacity={0.1} 
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <MeshDistortMaterial
          color="#3b82f6"
          speed={2}
          distort={0.4}
          radius={1}
          emissive="#3b82f6"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Subtle Rim Light Shell */}
      <mesh scale={[1.55, 1.55, 1.55]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.05}
          color="#ffffff"
          roughness={0}
          transmission={1}
          thickness={0.5}
        />
      </mesh>

      {/* Point Light inside core */}
      <pointLight intensity={2} distance={5} color="#3b82f6" />
    </group>
  );
};

export default IdentityCore;
