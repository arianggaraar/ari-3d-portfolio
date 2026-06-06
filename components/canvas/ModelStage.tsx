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
  const modelUrl = profile.modelUrl || "/models/humanoid.glb";

  useEffect(() => {
    setDpr([1, Math.min(2, window.devicePixelRatio || 1)]);
  }, []);

  return (
    <div className="relative h-full min-h-[360px] overflow-hidden bg-slate-950 lg:min-h-0">
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.08),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,0.08),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.00),rgba(2,6,23,0.26))]" />
      <div className="pointer-events-none absolute inset-0 z-10 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="pointer-events-none absolute bottom-[8%] left-1/2 z-10 h-12 w-48 -translate-x-1/2 rounded-full bg-cyan-200/20 blur-2xl" />

      <Canvas
        dpr={dpr}
        camera={{ position: [0, -0.4, 7.4], fov: 35 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.95;
        }}
        className="absolute inset-0 z-0 cursor-ew-resize touch-none"
      >
        <color attach="background" args={[darkMode ? "#06111f" : "#eff6ff"]} />
        <fog attach="fog" args={[darkMode ? "#06111f" : "#eff6ff", 8, 16]} />

        <ambientLight intensity={darkMode ? 2.8 : 2.1} />

        <hemisphereLight
          intensity={darkMode ? 3.0 : 2.2}
          color="#ffffff"
          groundColor="#334155"
        />

        <directionalLight
          position={[4.5, 6.5, 6]}
          intensity={darkMode ? 4.9 : 3.6}
        />

        <directionalLight
          position={[-4.5, 4, 4.5]}
          intensity={darkMode ? 3.3 : 2.4}
          color="#67e8f9"
        />

        <pointLight
          position={[0, 2.1, 4.2]}
          intensity={darkMode ? 4.2 : 2.8}
          color="#ffffff"
        />

        <pointLight
          position={[0, 0.4, -3]}
          intensity={darkMode ? 1.8 : 1.2}
          color="#38bdf8"
        />

        <Suspense fallback={null}>
          <FuturisticBackdrop darkMode={darkMode} compact />

          <HeadTrackedAvatar modelUrl={modelUrl} />

          <Environment preset="studio" />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-cyan-300/20 bg-slate-950/45 px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-md">
        3D Preview
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2">
        {["360 yaw", "left / right", profile.modelFileName || "humanoid.glb"].map((item) => (
          <div
            key={item}
            className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/85 backdrop-blur-md"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}