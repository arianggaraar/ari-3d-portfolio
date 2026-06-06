"use client";

import { MonitorCog, MoonStar, SunMedium } from "lucide-react";
import { useThemeMode } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { mode, resolvedTheme, setTheme, toggleTheme } = useThemeMode();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/40 bg-white/55 p-1 shadow-lg shadow-slate-950/5 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/55">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle light dark mode"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white transition hover:scale-105 dark:bg-cyan-300 dark:text-slate-950"
      >
        {isDark ? <SunMedium size={16} /> : <MoonStar size={16} />}
      </button>

      <button
        type="button"
        onClick={() => setTheme(mode === "system" ? resolvedTheme : "system")}
        aria-label="Use system theme"
        title={mode === "system" ? "System theme aktif" : "Kembali ke system theme"}
        className={`hidden h-9 items-center gap-2 rounded-full px-3 text-[10px] font-black uppercase tracking-[0.16em] transition sm:inline-flex ${
          mode === "system"
            ? "bg-cyan-400/15 text-cyan-700 dark:text-cyan-200"
            : "text-slate-500 hover:bg-slate-950/5 dark:text-slate-400 dark:hover:bg-white/10"
        }`}
      >
        <MonitorCog size={14} /> System
      </button>
    </div>
  );
}
