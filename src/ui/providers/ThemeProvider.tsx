"use client";

import { useEffect } from "react";
import { useThemeStore } from "@core/stores/themeStore";
import { Theme } from "@core/enums/Theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, updateIsDark } = useThemeStore();

  useEffect(() => {
    updateIsDark();
    
    const root = document.documentElement;
    
    const applyTheme = () => {
      let currentTheme = theme;
      
      if (theme === Theme.SYSTEM) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? Theme.DARK 
          : Theme.LIGHT;
      }
      
      root.classList.remove('light', 'dark');
      root.classList.add(currentTheme);
    };

    applyTheme();

    if (theme === Theme.SYSTEM) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        updateIsDark();
        applyTheme();
      };
      
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, updateIsDark]);

  return <>{children}</>;
}
