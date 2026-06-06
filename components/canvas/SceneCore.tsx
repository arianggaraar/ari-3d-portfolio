"use client";

import { Environment, Float, Grid, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type SceneCoreProps = {
  isDark: boolean;
};

function useGlobalPointer() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return pointer;
}

function AbstractBackgroundRig({ isDark }: { isDark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useGlobalPointer();
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const crystal = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 1.35 + pointer.current.x * 0.42, 0.06);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointer.current.y * 0.24, 0.06);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.current.x * 0.32, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.current.y * 0.16, 0.05);
    }

    if (ringA.current) ringA.current.rotation.z += delta * 0.16;
    if (ringB.current) ringB.current.rotation.x -= delta * 0.12;
    if (ringC.current) ringC.current.rotation.y += delta * 0.09;
    if (crystal.current) crystal.current.rotation.y += delta * 0.22;
  });

  const cyan = isDark ? "#67e8f9" : "#0284c7";
  const blue = isDark ? "#60a5fa" : "#2563eb";
  const violet = isDark ? "#a78bfa" : "#7c3aed";

  return (
    <Float speed={1.25} rotationIntensity={0.2} floatIntensity={0.28}>
      <group ref={group} position={[1.35, 0, -1.45]}>
        <mesh ref={ringA} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.1, 0.01, 10, 220]} />
          <meshBasicMaterial color={cyan} transparent opacity={isDark ? 0.34 : 0.22} />
        </mesh>
        <mesh ref={ringB} rotation={[0.82, 0.3, 0.16]}>
          <torusGeometry args={[2.62, 0.008, 10, 220]} />
          <meshBasicMaterial color={blue} transparent opacity={isDark ? 0.24 : 0.16} />
        </mesh>
        <mesh ref={ringC} rotation={[1.2, -0.22, 0.18]}>
          <torusGeometry args={[3.08, 0.006, 10, 220]} />
          <meshBasicMaterial color={violet} transparent opacity={isDark ? 0.17 : 0.12} />
        </mesh>
        <mesh ref={crystal} position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshStandardMaterial color={cyan} wireframe transparent opacity={isDark ? 0.46 : 0.28} metalness={0.8} roughness={0.18} />
        </mesh>
      </group>
    </Float>
  );
}

function CursorLight({ isDark }: { isDark: boolean }) {
  const light = useRef<THREE.DirectionalLight>(null);
  const pointer = useGlobalPointer();

  useFrame(() => {
    if (!light.current) return;
    light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, pointer.current.x * 5, 0.1);
    light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, 2.8 + pointer.current.y * 3, 0.1);
    light.current.position.z = THREE.MathUtils.lerp(light.current.position.z, 5, 0.1);
  });

  return <directionalLight ref={light} intensity={isDark ? 3.4 : 2.1} position={[2.5, 4.5, 5]} />;
}

export function SceneCore({ isDark }: SceneCoreProps) {
  const backgroundColor = useMemo(() => new THREE.Color(isDark ? "#020617" : "#eaf1ff"), [isDark]);

  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      <fog attach="fog" args={[isDark ? "#020617" : "#eaf1ff", 7, 17]} />
      <ambientLight intensity={isDark ? 0.82 : 1.15} />
      <CursorLight isDark={isDark} />
      <pointLight intensity={isDark ? 2.2 : 1.25} color="#22d3ee" position={[-3, 2.4, 3]} />

      <Grid
        position={[0, -3.2, -4.5]}
        args={[52, 34]}
        cellSize={0.6}
        cellThickness={0.35}
        cellColor={isDark ? "#0e7490" : "#bfdbfe"}
        sectionSize={4}
        sectionThickness={0.8}
        sectionColor={isDark ? "#22d3ee" : "#2563eb"}
        fadeDistance={38}
        fadeStrength={1.8}
        infiniteGrid
      />

      <AbstractBackgroundRig isDark={isDark} />
      <Sparkles count={92} speed={0.3} size={1.3} scale={[10, 5, 4]} position={[1.4, 0.15, -1.6]} color={isDark ? "#67e8f9" : "#2563eb"} />
      <Environment preset={isDark ? "city" : "studio"} />
    </>
  );
}
