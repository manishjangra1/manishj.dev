'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface About3DProps {
  gradientFrom?: string;
  gradientTo?: string;
}

function FloatingShape({ gradientFrom, gradientTo }: { gradientFrom: string; gradientTo: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    // Remove # if present
    const cleanHex = hex.replace('#', '');
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : { r: 0.39, g: 0.42, b: 0.95 }; // Default indigo
  };

  const color1 = hexToRgb(gradientFrom);
  const color2 = hexToRgb(gradientTo);

  return (
    <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Main octahedron */}
        <mesh scale={hovered ? 1.1 : 1}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial
            color={new THREE.Color(color1.r, color1.g, color1.b)}
            metalness={0.7}
            roughness={0.2}
            emissive={new THREE.Color(color1.r * 0.3, color1.g * 0.3, color1.b * 0.3)}
          />
        </mesh>

        {/* Inner sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color={new THREE.Color(color2.r, color2.g, color2.b)}
            metalness={0.5}
            roughness={0.3}
            transparent
            opacity={0.6}
            emissive={new THREE.Color(color2.r * 0.2, color2.g * 0.2, color2.b * 0.2)}
          />
        </mesh>

        {/* Orbiting rings */}
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            rotation={[Math.PI / 2, (i * Math.PI * 2) / 3, 0]}
            position={[0, 0, 0]}
          >
            <torusGeometry args={[2, 0.05, 16, 100]} />
            <meshStandardMaterial
              color={new THREE.Color(
                color1.r + (color2.r - color1.r) * (i / 3),
                color1.g + (color2.g - color1.g) * (i / 3),
                color1.b + (color2.b - color1.b) * (i / 3)
              )}
              metalness={0.8}
              roughness={0.1}
              emissive={new THREE.Color(
                (color1.r + (color2.r - color1.r) * (i / 3)) * 0.4,
                (color1.g + (color2.g - color1.g) * (i / 3)) * 0.4,
                (color1.b + (color2.b - color1.b) * (i / 3)) * 0.4
              )}
            />
          </mesh>
        ))}

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 2.5;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.5,
                Math.sin(angle) * radius,
              ]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial
                color={new THREE.Color(
                  color1.r + (color2.r - color1.r) * Math.random(),
                  color1.g + (color2.g - color1.g) * Math.random(),
                  color1.b + (color2.b - color1.b) * Math.random()
                )}
                emissive={new THREE.Color(color1.r * 0.5, color1.g * 0.5, color1.b * 0.5)}
              />
            </mesh>
          );
        })}

        {/* Code block wireframes */}
        {[
          { pos: [-2.2, 1.5, -1], rot: [0.2, 0.3, 0.1] },
          { pos: [2.2, -1.5, -1], rot: [-0.2, -0.3, 0.1] },
          { pos: [0, 2, 1.5], rot: [0.1, 0.2, -0.2] },
        ].map((block, i) => (
          <CodeBlock
            key={i}
            position={block.pos as [number, number, number]}
            rotation={block.rot as [number, number, number]}
            color1={color1}
            color2={color2}
            index={i}
          />
        ))}

        {/* Tech symbols floating */}
        {['{', '}', '<', '>', '[', ']', '()', '</>'].map((symbol, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 3;
          return (
            <TechSymbol
              key={symbol}
              symbol={symbol}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 1.5) * 0.8,
                Math.sin(angle) * radius,
              ]}
              color1={color1}
              color2={color2}
              index={i}
            />
          );
        })}
      </Float>
    </group>
  );
}

// Code block wireframe component
function CodeBlock({
  position,
  rotation,
  color1,
  color2,
  index,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color1: { r: number; g: number; b: number };
  color2: { r: number; g: number; b: number };
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = rotation[1] + state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.z = rotation[2];
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + index) * 0.1;
    }
  });

  const color = new THREE.Color(
    color1.r + (color2.r - color1.r) * (index / 3),
    color1.g + (color2.g - color1.g) * (index / 3),
    color1.b + (color2.b - color1.b) * (index / 3)
  );

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.6, 0.8, 0.3]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Tech symbol component
function TechSymbol({
  symbol,
  position,
  color1,
  color2,
  index,
}: {
  symbol: string;
  position: [number, number, number];
  color1: { r: number; g: number; b: number };
  color2: { r: number; g: number; b: number };
  index: number;
}) {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);
      textRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.8 + index) * 0.15;
    }
  });

  const color = new THREE.Color(
    color1.r + (color2.r - color1.r) * (index / 8),
    color1.g + (color2.g - color1.g) * (index / 8),
    color1.b + (color2.b - color1.b) * (index / 8)
  );

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.4}
      color={`rgb(${Math.floor(color.r * 255)}, ${Math.floor(color.g * 255)}, ${Math.floor(color.b * 255)})`}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {symbol}
    </Text>
  );
}

export default function About3D({ gradientFrom = '#6366f1', gradientTo = '#ec4899' }: About3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ minHeight: '400px' }}>
        <div className="text-white/50">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full" style={{ minHeight: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={0.8} />
        <FloatingShape gradientFrom={gradientFrom} gradientTo={gradientTo} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
        />
      </Canvas>
    </div>
  );
}

