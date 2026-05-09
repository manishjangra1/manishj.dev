'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useOS } from '@/contexts/OSContext';

const AnimatedGradient = ({ theme }: { theme: 'light' | 'dark' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  const color = theme === 'dark' ? '#3b82f6' : '#60a5fa';
  const emissive = theme === 'dark' ? '#1d4ed8' : '#93c5fd';

  return (
    <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.1}>
      <Sphere ref={meshRef} args={[2, 100, 100]} scale={1.5}>
        <MeshDistortMaterial
          color={color}
          speed={0.3}
          distort={0.2}
          radius={1}
          metalness={0.5}
          roughness={0.2}
          emissive={emissive}
          emissiveIntensity={theme === 'dark' ? 0.5 : 0.8}
        />
      </Sphere>
    </Float>
  );
};

const Wallpaper: React.FC = () => {
  const { resolvedTheme } = useOS();

  return (
    <div className={`w-full h-full transition-colors duration-1000 ${
      resolvedTheme === 'dark' ? 'bg-[#050505]' : 'bg-[#f0f0f3]'
    }`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={[resolvedTheme === 'dark' ? '#050505' : '#f0f0f3']} />
        <ambientLight intensity={resolvedTheme === 'dark' ? 0.5 : 1} />
        <pointLight position={[10, 10, 10]} intensity={resolvedTheme === 'dark' ? 1 : 2} color={resolvedTheme === 'dark' ? '#60a5fa' : '#3b82f6'} />
        <pointLight position={[-10, -10, -10]} intensity={resolvedTheme === 'dark' ? 1 : 2} color={resolvedTheme === 'dark' ? '#4f46e5' : '#818cf8'} />
        <spotLight position={[0, 5, 10]} angle={0.15} penumbra={1} intensity={resolvedTheme === 'dark' ? 2 : 3} color="#ffffff" />
        
        <AnimatedGradient theme={resolvedTheme} />
        
        {/* Cinematic particles or depth */}
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color={resolvedTheme === 'dark' ? '#0a0a0a' : '#ffffff'} 
            metalness={0.8} 
            roughness={0.1}
          />
        </mesh>

        <Environment preset={resolvedTheme === 'dark' ? 'night' : 'apartment'} />
      </Canvas>
      
      {/* Overlay for extra cinematic feel */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        resolvedTheme === 'dark' 
          ? 'bg-gradient-to-t from-black via-transparent to-transparent opacity-60' 
          : 'bg-gradient-to-t from-white via-transparent to-transparent opacity-40'
      } pointer-events-none`} />
    </div>
  );
};

export default Wallpaper;
