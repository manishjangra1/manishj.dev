'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface SkillTagProps {
  position: [number, number, number];
  skill: string;
  index: number;
  total: number;
}

function SkillTag({ position, skill, index, total }: SkillTagProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(state.camera.position);
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.1;
    }
  });

  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={0.3}
      color={hovered ? '#ff6b6b' : '#ffffff'}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {skill}
    </Text>
  );
}

function Sphere({ skills }: { skills: string[] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  const skillPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const radius = 3;
    skills.forEach((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      positions.push([x, y, z]);
    });
    return positions;
  }, [skills]);

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#1a1a2e"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      {skills.map((skill, i) => (
        <SkillTag
          key={skill}
          position={skillPositions[i]}
          skill={skill}
          index={i}
          total={skills.length}
        />
      ))}
    </>
  );
}

interface SkillSphereProps {
  skills: string[];
}

export default function SkillSphere({ skills }: SkillSphereProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (skills.length === 0) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center text-white/50">
        No skills to display
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center text-white/50">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <Sphere skills={skills} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

