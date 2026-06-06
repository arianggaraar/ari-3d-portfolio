"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { FuturisticBackdrop } from "@/components/canvas/FuturisticBackdrop";
import { HeadTrackedAvatar } from "@/components/canvas/HeadTrackedAvatar";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useThemeMode } from "@/components/providers/ThemeProvider";

export function ModelStage() {
  const { profile } = useProfile();
  const { resolvedTheme } = useThemeMode();
  const [dpr, setDpr] = useState<[number, number]>([1, 1]);

  const darkMode = resolvedTheme === "dark";
  const modelUrl = profile.modelUrl || "/models/model-web.glb";

  useEffect(() => {
    setDpr([1, Math.min(2, window.devicePixelRatio || 1)]);
  }, []);

  return (
    <div className="relative h-full min-h-[360px] overflow-hidden bg-[#020617] lg:min-h-0">
      {/* Background dibuat lebih gelap agar model putih/metal lebih jelas */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.10),transparent_22%),radial-gradient(circle_at_80%_12%,rgba(59,130,246,0.12),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.00),rgba(2,6,23,0.18))]" />

      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.055)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Rim glow bawah */}
      <div className="pointer-events-none absolute bottom-[9%] left-1/2 z-10 h-16 w-56 -translate-x-1/2 rounded-full bg-cyan-300/25 blur-2xl" />

      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.34, 6.05], fov: 31 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.18;
        }}
        className="absolute inset-0 z-0 cursor-ew-resize touch-none"
      >
        <color attach="background" args={[darkMode ? "#020617" : "#07111f"]} />
        <fog attach="fog" args={[darkMode ? "#020617" : "#07111f", 9, 18]} />

        {/* Lighting dibuat lebih natural agar warna asli model tidak washed-out */}
        <ambientLight intensity={darkMode ? 0.85 : 0.75} />

        <hemisphereLight
          intensity={darkMode ? 1.35 : 1.1}
          color="#f8fafc"
          groundColor="#0f172a"
        />

        {/* Key light utama */}
        <directionalLight
          position={[4.5, 5.8, 5.2]}
          intensity={darkMode ? 2.4 : 2.0}
          color="#ffffff"
        />

        {/* Fill light lembut dari kiri */}
        <directionalLight
          position={[-4.2, 3.2, 3.8]}
          intensity={darkMode ? 1.15 : 0.95}
          color="#bfefff"
        />

        {/* Rim light tipis agar outline tetap muncul */}
        <directionalLight
          position={[0, 3.2, -5.5]}
          intensity={darkMode ? 1.35 : 1.1}
          color="#38bdf8"
        />

        <pointLight
          position={[0, 1.2, 3.2]}
          intensity={darkMode ? 1.25 : 1.0}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <FuturisticBackdrop darkMode={darkMode} compact />

          <HeadTrackedAvatar modelUrl={modelUrl} />

          <Environment preset="studio" />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-cyan-300/20 bg-slate-950/50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-md">
        3D Preview
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2">
        {["360 yaw", "left / right", profile.modelFileName || "model-web.glb"].map((item) => (
          <div
            key={item}
            className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/90 backdrop-blur-md"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}