"use client";

import { useTheme } from "next-themes";
import { FiMoon } from "react-icons/fi";

export function DarkModeButton() {
    const { resolvedTheme, setTheme } = useTheme();

    if (!resolvedTheme) return null; 

    const isDark = resolvedTheme === "dark";

    return (
        <FiMoon
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black"
        >
            {isDark ? "Light Mode" : "Dark Mode"}
        </FiMoon>
        
    );
}
