'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { Text, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface SkillTagProps {
  position: [number, number, number];
  skill: string;
  index: number;
  total: number;
  gradientFrom: string;
  gradientTo: string;
}

function SkillTag({ position, skill, index, total, gradientFrom, gradientTo }: SkillTagProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 99, g: 102, b: 241 };
  };

  const color1 = hexToRgb(gradientFrom);
  const color2 = hexToRgb(gradientTo);
  const mix = index / total;
  const r = Math.floor(color1.r + (color2.r - color1.r) * mix);
  const g = Math.floor(color1.g + (color2.g - color1.g) * mix);
  const b = Math.floor(color1.b + (color2.b - color1.b) * mix);
  const hoverColor = `rgb(${r}, ${g}, ${b})`;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(state.camera.position);
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.1;
    }
  });

  return (
    <Float speed={1 + index * 0.1} rotationIntensity={0.2} floatIntensity={0.3}>
      <Text
        ref={meshRef}
        position={position}
        fontSize={0.4}
        color={hovered ? hoverColor : '#ffffff'}
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {skill}
      </Text>
    </Float>
  );
}

function Sphere({ skills, gradientFrom, gradientTo }: { skills: string[]; gradientFrom: string; gradientTo: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : { r: 0.39, g: 0.42, b: 0.95 };
  };

  const color1 = hexToRgb(gradientFrom);
  const color2 = hexToRgb(gradientTo);

  // Create gradient color for wireframe
  const wireframeColor = new THREE.Color(
    color1.r + (color2.r - color1.r) * 0.5,
    color1.g + (color2.g - color1.g) * 0.5,
    color1.b + (color2.b - color1.b) * 0.5
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const skillPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const radius = 3.5;
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
    <group ref={groupRef}>
      {/* Main wireframe sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial
          color={wireframeColor}
          wireframe
          transparent
          opacity={0.3}
          emissive={wireframeColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshStandardMaterial
          color={wireframeColor}
          transparent
          opacity={0.1}
          emissive={wireframeColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Orbiting rings */}
      {[0, 1, 2].map((i) => {
        const ringColor = new THREE.Color(
          color1.r + (color2.r - color1.r) * (i / 3),
          color1.g + (color2.g - color1.g) * (i / 3),
          color1.b + (color2.b - color1.b) * (i / 3)
        );
        return (
          <mesh
            key={i}
            rotation={[Math.PI / 2 + i * 0.3, 0, 0]}
            position={[0, 0, 0]}
          >
            <torusGeometry args={[3.2 + i * 0.2, 0.02, 16, 100]} />
            <meshStandardMaterial
              color={ringColor}
              transparent
              opacity={0.4}
              emissive={ringColor}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}

      {/* Skill tags */}
      {skills.map((skill, i) => (
        <SkillTag
          key={skill}
          position={skillPositions[i]}
          skill={skill}
          index={i}
          total={skills.length}
          gradientFrom={gradientFrom}
          gradientTo={gradientTo}
        />
      ))}
    </group>
  );
}

interface SkillSphereProps {
  skills: string[];
  gradientFrom?: string;
  gradientTo?: string;
}

export default function SkillSphere({ 
  skills, 
  gradientFrom = '#6366f1', 
  gradientTo = '#ec4899' 
}: SkillSphereProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (skills.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-white/50">
        No skills to display
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-white/50">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-[400px]" style={{ background: 'transparent' }}>
      <Canvas 
        camera={{ position: [0, 0, 9], fov: 70 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <Sphere skills={skills} gradientFrom={gradientFrom} gradientTo={gradientTo} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

