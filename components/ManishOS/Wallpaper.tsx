'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useOS } from '@/contexts/OSContext';

const Blob = ({ position, color, speed, distort, radius, scale, theme }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05 * speed;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08 * speed;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} position={position} args={[1, 100, 100]} scale={scale}>
        <MeshDistortMaterial
          color={color}
          speed={speed * 3}
          distort={distort}
          radius={radius}
          metalness={theme === 'dark' ? 0.8 : 0.3}
          roughness={theme === 'dark' ? 0.2 : 0.15}
          emissive={color}
          emissiveIntensity={theme === 'dark' ? 0.2 : 0.3}
          transparent
          opacity={theme === 'dark' ? 0.6 : 0.7}
        />
      </Sphere>
    </Float>
  );
};

const Wallpaper: React.FC = () => {
  const { resolvedTheme } = useOS();

  const blobs = useMemo(() => {
    if (resolvedTheme === 'dark') {
      return [
        { position: [2, 1, -2] as [number, number, number], color: '#3b82f6', speed: 0.3, distort: 0.4, radius: 1, scale: 2.5 },
        { position: [-3, -1, -1] as [number, number, number], color: '#4f46e5', speed: 0.5, distort: 0.3, radius: 1, scale: 2 },
        { position: [0, -2, -3] as [number, number, number], color: '#8b5cf6', speed: 0.4, distort: 0.5, radius: 1, scale: 3 },
      ];
    } else {
      return [
        { position: [2.5, 1.5, -2] as [number, number, number], color: '#7dd3fc', speed: 0.2, distort: 0.3, radius: 1, scale: 3.5 },
        { position: [-3.5, -0.5, -1] as [number, number, number], color: '#f9a8d4', speed: 0.3, distort: 0.4, radius: 1, scale: 2.5 },
        { position: [0.5, -2.5, -3] as [number, number, number], color: '#d4d4d8', speed: 0.25, distort: 0.2, radius: 1, scale: 4 },
      ];
    }
  }, [resolvedTheme]);

  return (
    <div className={`w-full h-full transition-colors duration-1000 ${
      resolvedTheme === 'dark' ? 'bg-[#050505]' : 'bg-[#dddde2]'
    }`}>
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={[resolvedTheme === 'dark' ? '#050505' : '#dddde2']} />
        
        <ambientLight intensity={resolvedTheme === 'dark' ? 0.4 : 0.6} />
        <pointLight position={[10, 10, 10]} intensity={resolvedTheme === 'dark' ? 1 : 1.5} color={resolvedTheme === 'dark' ? '#3b82f6' : '#ffffff'} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={resolvedTheme === 'dark' ? 1.5 : 2} castShadow />
        
        {blobs.map((blob, i) => (
          <Blob key={i} {...blob} theme={resolvedTheme} />
        ))}

        <ContactShadows 
          position={[0, -4, 0]} 
          opacity={resolvedTheme === 'dark' ? 0.3 : 0.15} 
          scale={20} 
          blur={2.5} 
          far={4.5} 
        />
        
        <Environment preset={resolvedTheme === 'dark' ? 'night' : 'studio'} />
      </Canvas>
      
      {/* Cinematic Overlays */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
        resolvedTheme === 'dark' 
          ? 'bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]' 
          : 'bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.08)_100%)]'
      }`} />
      
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
        resolvedTheme === 'dark' 
          ? 'bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10' 
          : 'bg-gradient-to-tr from-slate-400/15 via-transparent to-zinc-400/15'
      }`} />
    </div>
  );
};

export default Wallpaper;
