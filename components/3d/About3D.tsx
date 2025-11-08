'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface About3DProps {
  gradientFrom?: string;
  gradientTo?: string;
  techStack?: string[];
}

interface TechTagProps {
  position: [number, number, number];
  tech: string;
  index: number;
  total: number;
  color: string;
}

function TechTag({ position, tech, index, total, color }: TechTagProps) {
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
      fontSize={0.2}
      color={hovered ? color : '#ffffff'}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {tech}
    </Text>
  );
}

interface CategorySphereProps {
  position: [number, number, number];
  items: string[];
  categoryName: string;
  color: THREE.Color;
  index: number;
}

function CategorySphere({ position, items, categoryName, color, index }: CategorySphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * (0.1 + index * 0.05);
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 0.2;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  const itemPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const radius = 1.5;
    items.forEach((item, i) => {
      const phi = Math.acos(-1 + (2 * i) / items.length);
      const theta = Math.sqrt(items.length * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      positions.push([x, y, z]);
    });
    return positions;
  }, [items]);

  return (
    <Float speed={1 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef} position={position}>
        {/* Category label */}
        <Text
          position={[0, -2.2, 0]}
          fontSize={0.3}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {categoryName}
        </Text>

        {/* Wireframe sphere */}
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1.5, 24, 24]} />
          <meshStandardMaterial
            color={color}
            wireframe
            transparent
            opacity={0.4}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Tech items */}
        {items.map((item, i) => (
          <TechTag
            key={item}
            position={itemPositions[i]}
            tech={item}
            index={i}
            total={items.length}
            color={`rgb(${Math.floor(color.r * 255)}, ${Math.floor(color.g * 255)}, ${Math.floor(color.b * 255)})`}
          />
        ))}
      </group>
    </Float>
  );
}

// Connecting lines between spheres
function ConnectingLines({ positions, color }: { positions: [number, number, number][]; color: THREE.Color }) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const points = useMemo(() => {
    const points: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      const next = (i + 1) % positions.length;
      points.push(...positions[i], ...positions[next]);
    }
    return new Float32Array(points);
  }, [positions]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </lineSegments>
  );
}

function CategorySpheres({ techStack, gradientFrom, gradientTo }: { techStack: string[]; gradientFrom: string; gradientTo: string }) {
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

  // Categorize tech stack (simple categorization)
  const categorizeTech = (tech: string) => {
    const lower = tech.toLowerCase();
    if (lower.includes('react') || lower.includes('vue') || lower.includes('angular') || lower.includes('html') || lower.includes('css') || lower.includes('tailwind') || lower.includes('three')) {
      return 'frontend';
    }
    if (lower.includes('node') || lower.includes('express') || lower.includes('python') || lower.includes('django') || lower.includes('mongodb') || lower.includes('postgres') || lower.includes('api')) {
      return 'backend';
    }
    if (lower.includes('git') || lower.includes('docker') || lower.includes('aws') || lower.includes('webpack') || lower.includes('jest')) {
      return 'tools';
    }
    return 'other';
  };

  const categories = useMemo(() => {
    const cats: { [key: string]: string[] } = {
      frontend: [],
      backend: [],
      tools: [],
      other: [],
    };

    techStack.forEach((tech) => {
      const category = categorizeTech(tech);
      cats[category].push(tech);
    });

    // Remove empty categories
    return Object.entries(cats).filter(([_, items]) => items.length > 0);
  }, [techStack]);

  // Calculate positions in a circle
  const categoryPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const radius = 2.5;
    categories.forEach((_, i) => {
      const angle = (i / categories.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push([x, 0, z]);
    });
    return positions;
  }, [categories]);

  // Create colors for each category
  const categoryColors = useMemo(() => {
    return categories.map((_, i) => {
      const mix = i / Math.max(categories.length - 1, 1);
      return new THREE.Color(
        color1.r + (color2.r - color1.r) * mix,
        color1.g + (color2.g - color1.g) * mix,
        color1.b + (color2.b - color1.b) * mix
      );
    });
  }, [categories, color1, color2]);

  const centerColor = new THREE.Color(
    color1.r + (color2.r - color1.r) * 0.5,
    color1.g + (color2.g - color1.g) * 0.5,
    color1.b + (color2.b - color1.b) * 0.5
  );

  return (
    <>
      {/* Connecting lines */}
      {categoryPositions.length > 1 && (
        <ConnectingLines positions={categoryPositions} color={centerColor} />
      )}

      {/* Center sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshStandardMaterial
          color={centerColor}
          wireframe
          transparent
          opacity={0.3}
          emissive={centerColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Category spheres */}
      {categories.map(([category, items], i) => (
        <CategorySphere
          key={category}
          position={categoryPositions[i]}
          items={items}
          categoryName={category.charAt(0).toUpperCase() + category.slice(1)}
          color={categoryColors[i]}
          index={i}
        />
      ))}
    </>
  );
}

export default function About3D({ 
  gradientFrom = '#6366f1', 
  gradientTo = '#ec4899',
  techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Three.js', 'Tailwind', 'Git', 'Express', 'Python', 'Docker', 'AWS']
}: About3DProps) {
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

  if (techStack.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ minHeight: '400px' }}>
        <div className="text-white/50">No tech stack to display</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full" style={{ minHeight: '400px', background: 'transparent' }}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <CategorySpheres techStack={techStack} gradientFrom={gradientFrom} gradientTo={gradientTo} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
    </div>
  );
}
