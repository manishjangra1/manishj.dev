'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface ProjectCard3DProps {
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

function Card3D({ title, description, image, technologies, liveUrl, githubUrl }: ProjectCard3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      if (active) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, Math.PI, 0.1);
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1);
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1,
          0.1
        );
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, hovered ? 1.05 : 1, 0.1);
      }
      meshRef.current.scale.y = meshRef.current.scale.x;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
    >
      <boxGeometry args={[4, 3, 0.2]} />
      <meshStandardMaterial
        color={hovered ? '#6366f1' : '#3b82f6'}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function ProjectCard3D(props: ProjectCard3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full h-[400px] relative"
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <Card3D {...props} />
      </Canvas>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm rounded-b-lg">
        <h3 className="text-white font-bold text-lg mb-1">{props.title}</h3>
        <p className="text-white/80 text-sm line-clamp-2">{props.description}</p>
      </div>
    </motion.div>
  );
}

