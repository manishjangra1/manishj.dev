'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedGradient = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.1}>
      <Sphere ref={meshRef} args={[2, 100, 100]} scale={1.5}>
        <MeshDistortMaterial
          color="#3b82f6"
          speed={0.3}
          distort={0.2}
          radius={1}
          metalness={0.5}
          roughness={0.2}
          emissive="#1d4ed8"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
};

const Wallpaper: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />
        <spotLight position={[0, 5, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
        
        <AnimatedGradient />
        
        {/* Cinematic particles or depth */}
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.8} 
            roughness={0.1}
          />
        </mesh>

        <Environment preset="night" />
      </Canvas>
      
      {/* Overlay for extra cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
};

export default Wallpaper;
