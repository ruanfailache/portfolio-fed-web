import { renderHook, act } from '@testing-library/react';
import { useLanguageStore } from '@core/stores/languageStore';
import { Language } from '@core/enums/Language';

describe('Language Store', () => {
  beforeEach(() => {
    useLanguageStore.getState().setLanguage(Language.EN);
  });

  describe('Given the language store is initialized', () => {
    describe('When accessing the store', () => {
      it('Then should have default language as EN', () => {
        const { result } = renderHook(() => useLanguageStore());
        
        expect(result.current.language).toBe(Language.EN);
      });

      it('Then should have setLanguage function', () => {
        const { result } = renderHook(() => useLanguageStore());
        
        expect(typeof result.current.setLanguage).toBe('function');
      });
    });
  });

  describe('Given the store is in default state', () => {
    describe('When setting language to PT', () => {
      it('Then should update the language state', () => {
        const { result } = renderHook(() => useLanguageStore());
        
        act(() => {
          result.current.setLanguage(Language.PT);
        });
        
        expect(result.current.language).toBe(Language.PT);
      });
    });

    describe('When setting language to EN', () => {
      it('Then should update the language state', () => {
        const { result } = renderHook(() => useLanguageStore());
        
        act(() => {
          result.current.setLanguage(Language.EN);
        });
        
        expect(result.current.language).toBe(Language.EN);
      });
    });
  });

  describe('Given multiple language changes', () => {
    describe('When changing language multiple times', () => {
      it('Then should maintain the last set language', () => {
        const { result } = renderHook(() => useLanguageStore());
        
        act(() => {
          result.current.setLanguage(Language.PT);
        });
        
        act(() => {
          result.current.setLanguage(Language.EN);
        });
        
        act(() => {
          result.current.setLanguage(Language.PT);
        });
        
        expect(result.current.language).toBe(Language.PT);
      });
    });
  });

  describe('Given store persistence', () => {
    describe('When language is set', () => {
      it('Then should persist the language setting', () => {
        const { result } = renderHook(() => useLanguageStore());
        
        act(() => {
          result.current.setLanguage(Language.PT);
        });
        
        const persistedState = useLanguageStore.getState();
        expect(persistedState.language).toBe(Language.PT);
      });
    });
  });
});
