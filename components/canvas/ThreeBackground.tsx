"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { SceneCore } from "@/components/canvas/SceneCore";
import { useThemeMode } from "@/components/providers/ThemeProvider";

export default function ThreeBackground() {
  const { resolvedTheme } = useThemeMode();
  const [dpr, setDpr] = useState<[number, number]>([1, 1]);

  useEffect(() => {
    setDpr([1, Math.min(1.5, window.devicePixelRatio || 1)]);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 opacity-[0.45] dark:opacity-[0.55]">
        <Canvas
          dpr={dpr}
          shadows={false}
          camera={{ position: [0, 0.15, 6.8], fov: 38 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        >
          <SceneCore isDark={resolvedTheme === "dark"} />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(34,211,238,0.13),transparent_28rem),radial-gradient(circle_at_18%_72%,rgba(59,130,246,0.1),transparent_24rem)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent dark:from-slate-950 dark:via-slate-950/80" />
    </div>
  );
}
