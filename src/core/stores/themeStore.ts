import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme } from '@core/enums/Theme';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: Theme.SYSTEM,
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        set({ theme: newTheme });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
