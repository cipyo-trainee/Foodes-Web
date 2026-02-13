"use client";

import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();


  if (!resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-4">
      <span>Theme: {resolvedTheme}</span>
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black"
      >
        Toggle Theme
      </button>
    </div>
  );
}
