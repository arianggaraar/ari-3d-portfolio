"use client";

import { useEffect, useState } from "react";

export function useSystemTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => {
      setIsDark(media.matches);
      document.documentElement.classList.toggle("dark", media.matches);
    };

    syncTheme();
    media.addEventListener("change", syncTheme);
    return () => media.removeEventListener("change", syncTheme);
  }, []);

  return { isDark };
}
