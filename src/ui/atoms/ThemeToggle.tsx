"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useThemeStore } from "@core/stores/themeStore";
import { IconSize } from "./IconButton";

interface ThemeToggleProps {
    size?: IconSize;
}

export function ThemeToggle({ size = IconSize.MD }: ThemeToggleProps) {
    const { isDark, toggleTheme } = useThemeStore();
    
    return (
        <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="box-border p-2 cursor-pointer transition duration-300 rounded bg-theme-button text-theme-button hover:bg-primary hover:text-on-primary"
        >
            {isDark ? (
                <FiSun size={size} aria-hidden="true" color="currentColor" />
            ) : (
                <FiMoon size={size} aria-hidden="true" color="currentColor" />
            )}
        </button>
    );
}
