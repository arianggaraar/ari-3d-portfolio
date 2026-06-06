"use client";

import { Float, Grid, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type FuturisticBackdropProps = {
  darkMode: boolean;
  compact?: boolean;
};

function PointerLockedLight({ darkMode }: { darkMode: boolean }) {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;

    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, state.pointer.x * 5, 0.1);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, 3.2 + state.pointer.y * 2.8, 0.1);
    lightRef.current.position.z = THREE.MathUtils.lerp(lightRef.current.position.z, 5.2, 0.1);
  });

  return <directionalLight ref={lightRef} intensity={darkMode ? 3.6 : 2.4} position={[2.5, 3.2, 5]} castShadow />;
}

function HologramRings({ darkMode }: { darkMode: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.18, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.1, 0.04);
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.18;
    if (ringB.current) ringB.current.rotation.x -= delta * 0.14;
    if (ringC.current) ringC.current.rotation.y += delta * 0.12;
  });

  const cyan = darkMode ? "#67e8f9" : "#0284c7";
  const blue = darkMode ? "#60a5fa" : "#2563eb";
  const violet = darkMode ? "#a78bfa" : "#7c3aed";

  return (
    <group ref={groupRef} position={[0, 0.1, -2.2]}>
      <Float speed={1.15} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh ref={ringA} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.15, 0.014, 12, 220]} />
          <meshBasicMaterial color={cyan} transparent opacity={darkMode ? 0.54 : 0.34} />
        </mesh>
        <mesh ref={ringB} rotation={[0.82, 0.3, 0.12]}>
          <torusGeometry args={[2.62, 0.011, 12, 220]} />
          <meshBasicMaterial color={blue} transparent opacity={darkMode ? 0.32 : 0.24} />
        </mesh>
        <mesh ref={ringC} rotation={[1.2, -0.22, 0.18]}>
          <torusGeometry args={[3.08, 0.008, 12, 220]} />
          <meshBasicMaterial color={violet} transparent opacity={darkMode ? 0.22 : 0.18} />
        </mesh>
      </Float>
    </group>
  );
}

function FloatingWireObjects({ darkMode }: { darkMode: boolean }) {
  const colorA = darkMode ? "#22d3ee" : "#2563eb";
  const colorB = darkMode ? "#8b5cf6" : "#06b6d4";

  return (
    <>
      <Float speed={1.35} rotationIntensity={0.35} floatIntensity={0.65}>
        <mesh position={[-2.6, 1.05, -2.8]} rotation={[0.45, 0.6, 0.2]}>
          <icosahedronGeometry args={[0.46, 1]} />
          <meshStandardMaterial color={colorA} wireframe transparent opacity={0.55} metalness={0.7} roughness={0.25} />
        </mesh>
      </Float>

      <Float speed={1.05} rotationIntensity={0.45} floatIntensity={0.7}>
        <mesh position={[2.7, -0.55, -2.6]} rotation={[0.3, 0.2, 0.9]}>
          <octahedronGeometry args={[0.58, 0]} />
          <meshStandardMaterial color={colorB} wireframe transparent opacity={0.42} metalness={0.8} roughness={0.18} />
        </mesh>
      </Float>

      <Float speed={1.55} rotationIntensity={0.35} floatIntensity={0.45}>
        <mesh position={[2.35, 1.55, -3.4]} rotation={[0.2, 0.9, 0.3]}>
          <torusKnotGeometry args={[0.26, 0.012, 96, 10]} />
          <meshBasicMaterial color={colorA} transparent opacity={0.5} />
        </mesh>
      </Float>
    </>
  );
}

export function FuturisticBackdrop({ darkMode, compact = false }: FuturisticBackdropProps) {
  return (
    <>
      <ambientLight intensity={darkMode ? 0.78 : 1.15} />
      <PointerLockedLight darkMode={darkMode} />

      <Grid
        position={[0, compact ? -2.95 : -3.25, -5.5]}
        args={[compact ? 26 : 44, compact ? 18 : 30]}
        cellSize={0.55}
        cellThickness={0.42}
        cellColor={darkMode ? "#164e63" : "#bfdbfe"}
        sectionSize={3.3}
        sectionThickness={1.05}
        sectionColor={darkMode ? "#22d3ee" : "#2563eb"}
        fadeDistance={compact ? 24 : 36}
        fadeStrength={1.65}
        infiniteGrid
      />

      <HologramRings darkMode={darkMode} />
      <FloatingWireObjects darkMode={darkMode} />

      <Sparkles
        count={compact ? 95 : 150}
        scale={compact ? [7, 4, 5] : [13, 7, 8]}
        size={compact ? 1.45 : 1.8}
        speed={0.28}
        opacity={darkMode ? 0.78 : 0.45}
        color={darkMode ? "#67e8f9" : "#2563eb"}
      />
    </>
  );
}
