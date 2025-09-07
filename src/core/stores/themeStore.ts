import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme } from '@core/enums/Theme';

interface ThemeState {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  updateIsDark: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: Theme.SYSTEM,
      isDark: true,
      setTheme: (theme) => {
        set({ theme });
        get().updateIsDark();
      },
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        set({ theme: newTheme });
        get().updateIsDark();
      },
      updateIsDark: () => {
        const { theme } = get();
        let isDark = false;
        
        if (theme === Theme.DARK) {
          isDark = true;
        } else if (theme === Theme.LIGHT) {
          isDark = false;
        } else if (theme === Theme.SYSTEM) {
          isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        
        set({ isDark });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
