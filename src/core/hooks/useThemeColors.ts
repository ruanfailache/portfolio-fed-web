import { useThemeStore } from "@core/stores/themeStore";
import { Theme } from "@core/enums/Theme";

export function useThemeColors() {
  const { theme, isDark } = useThemeStore();
  
  const getCurrentTheme = () => {
    if (theme === Theme.SYSTEM) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
    }
    return theme;
  };

  const currentTheme = getCurrentTheme();
  
  return {
    // Primary colors (same for both themes)
    primary: "primary",
    "primary-dark": "primary-dark", 
    "primary-light": "primary-light",
    "on-primary": "on-primary",
    
    // Theme-specific colors
    screen: isDark ? "dark-screen" : "light-screen",
    surface: isDark ? "dark-surface" : "light-surface",
    "surface-light": isDark ? "dark-surface-light" : "light-surface-light",
    "surface-dark": isDark ? "dark-surface-dark" : "light-surface-dark",
    button: isDark ? "dark-button" : "light-button",
    "button-hover": isDark ? "dark-button-hover" : "light-button-hover",
    "button-active": isDark ? "dark-button-active" : "light-button-active",
    "on-surface": isDark ? "dark-on-surface" : "light-on-surface",
    "on-button": isDark ? "dark-on-button" : "light-on-button",
    "text-primary": isDark ? "dark-text-primary" : "light-text-primary",
    "text-secondary": isDark ? "dark-text-secondary" : "light-text-secondary",
    "text-muted": isDark ? "dark-text-muted" : "light-text-muted",
    border: isDark ? "dark-border" : "light-border",
    "border-light": isDark ? "dark-border-light" : "light-border-light",
    "border-dark": isDark ? "dark-border-dark" : "light-border-dark",
    scrollbar: isDark ? "dark-scrollbar" : "light-scrollbar",
    "scrollbar-hover": isDark ? "dark-scrollbar-hover" : "light-scrollbar-hover",
    "scrollbar-track": isDark ? "dark-scrollbar-track" : "light-scrollbar-track",
    
    // Status colors (same for both themes)
    success: "success",
    warning: "warning", 
    error: "error",
    info: "info",
    
    // Theme info
    isDark,
    currentTheme,
  };
}
