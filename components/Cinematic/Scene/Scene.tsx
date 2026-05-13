'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useExperienceStore } from '@/lib/store/experience-store';
import Atmosphere from './Atmosphere';
import IdentityCore from './IdentityCore';

const CameraController = () => {
  const { cameraPosition, cameraRotation } = useExperienceStore();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    if (cameraRef.current) {
      // Interpolate position
      cameraRef.current.position.lerp(new THREE.Vector3(...cameraPosition), 0.05);
      
      // Interpolate rotation (using quaternions for smoothness)
      const targetRotation = new THREE.Euler(...cameraRotation);
      const targetQuaternion = new THREE.Quaternion().setFromEuler(targetRotation);
      cameraRef.current.quaternion.slerp(targetQuaternion, 0.05);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={45} />;
};

const Scene: React.FC = () => {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <CameraController />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        {/* Atmosphere */}
        <Atmosphere />

        {/* Identity Core */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <IdentityCore />
        </Float>
      </Suspense>
    </Canvas>
  );
};

export default Scene;
