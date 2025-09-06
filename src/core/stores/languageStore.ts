import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@core/enums/Language';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: Language.EN,
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    }
  )
);
