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
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.rotation.z = time * 0.05;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -time * 0.2;
      const scale = 1 + Math.sin(time * 1.5) * 0.03;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Outer Luxury Glass Shell */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshPhysicalMaterial 
          color="#D6A86A" 
          transparent 
          opacity={0.08} 
          roughness={0.05}
          metalness={0.1}
          transmission={0.95}
          thickness={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.45}
        />
      </mesh>

      {/* Internal Liquid Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.85, 64, 64]} />
        <MeshDistortMaterial
          color="#C89652"
          speed={1.5}
          distort={0.3}
          radius={1}
          emissive="#B8833E"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Atmospheric Rim Light Shell */}
      <mesh scale={[1.65, 1.65, 1.65]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.03}
          color="#F5F1EA"
          roughness={0}
          transmission={1}
          thickness={0.2}
        />
      </mesh>

      {/* Point Light inside core */}
      <pointLight intensity={1.5} distance={6} color="#D6A86A" />
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#F5F1EA" />
    </group>
  );
};


export default IdentityCore;
