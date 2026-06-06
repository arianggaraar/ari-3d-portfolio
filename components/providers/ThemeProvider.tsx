"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

type ThemeMode = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "ari-3d-portfolio-theme:v3";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? getSystemTheme() : mode;
}

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const savedMode = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (savedMode === "light" || savedMode === "dark" || savedMode === "system") {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const syncTheme = () => {
      const nextTheme = resolveTheme(mode);
      setResolvedTheme(nextTheme);
      applyTheme(nextTheme);
    };

    syncTheme();
    window.localStorage.setItem(STORAGE_KEY, mode);
    media.addEventListener("change", syncTheme);
    return () => media.removeEventListener("change", syncTheme);
  }, [mode]);

  const setTheme = useCallback((nextMode: ThemeMode) => {
    setMode(nextMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((current) => {
      const currentResolved = resolveTheme(current);
      return currentResolved === "dark" ? "light" : "dark";
    });
  }, []);

  const value = useMemo(
    () => ({ mode, resolvedTheme, setTheme, toggleTheme }),
    [mode, resolvedTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used inside ThemeProvider");
  }
  return context;
}
