import { renderHook, act } from '@testing-library/react';
import { useThemeStore } from '@core/stores/themeStore';
import { Theme } from '@core/enums/Theme';

describe('Theme Store', () => {
  beforeEach(() => {
    useThemeStore.getState().setTheme(Theme.SYSTEM);
  });

  describe('Given the theme store is initialized', () => {
    describe('When accessing the store', () => {
      it('Then should have default theme as SYSTEM', () => {
        const { result } = renderHook(() => useThemeStore());
        
        expect(result.current.theme).toBe(Theme.SYSTEM);
      });

      it('Then should have setTheme function', () => {
        const { result } = renderHook(() => useThemeStore());
        
        expect(typeof result.current.setTheme).toBe('function');
      });

      it('Then should have toggleTheme function', () => {
        const { result } = renderHook(() => useThemeStore());
        
        expect(typeof result.current.toggleTheme).toBe('function');
      });
    });
  });

  describe('Given the store is in default state', () => {
    describe('When setting theme to DARK', () => {
      it('Then should update the theme state', () => {
        const { result } = renderHook(() => useThemeStore());
        
        act(() => {
          result.current.setTheme(Theme.DARK);
        });
        
        expect(result.current.theme).toBe(Theme.DARK);
      });
    });

    describe('When setting theme to LIGHT', () => {
      it('Then should update the theme state', () => {
        const { result } = renderHook(() => useThemeStore());
        
        act(() => {
          result.current.setTheme(Theme.LIGHT);
        });
        
        expect(result.current.theme).toBe(Theme.LIGHT);
      });
    });

    describe('When setting theme to SYSTEM', () => {
      it('Then should update the theme state', () => {
        const { result } = renderHook(() => useThemeStore());
        
        act(() => {
          result.current.setTheme(Theme.SYSTEM);
        });
        
        expect(result.current.theme).toBe(Theme.SYSTEM);
      });
    });
  });

  describe('Given theme is set to DARK', () => {
    describe('When toggling theme', () => {
      it('Then should change to LIGHT', () => {
        const { result } = renderHook(() => useThemeStore());
        
        act(() => {
          result.current.setTheme(Theme.DARK);
        });
        
        act(() => {
          result.current.toggleTheme();
        });
        
        expect(result.current.theme).toBe(Theme.LIGHT);
      });
    });
  });

  describe('Given theme is set to LIGHT', () => {
    describe('When toggling theme', () => {
      it('Then should change to DARK', () => {
        const { result } = renderHook(() => useThemeStore());
        
        act(() => {
          result.current.setTheme(Theme.LIGHT);
        });
        
        act(() => {
          result.current.toggleTheme();
        });
        
        expect(result.current.theme).toBe(Theme.DARK);
      });
    });
  });

  describe('Given theme is set to SYSTEM', () => {
    describe('When toggling theme', () => {
      it('Then should change to DARK', () => {
        const { result } = renderHook(() => useThemeStore());
        
        act(() => {
          result.current.setTheme(Theme.SYSTEM);
        });
        
        act(() => {
          result.current.toggleTheme();
        });
        
        expect(result.current.theme).toBe(Theme.DARK);
      });
    });
  });

  describe('Given multiple theme changes', () => {
    describe('When changing theme multiple times', () => {
      it('Then should maintain the last set theme', () => {
        const { result } = renderHook(() => useThemeStore());
        
        act(() => {
          result.current.setTheme(Theme.DARK);
        });
        
        act(() => {
          result.current.setTheme(Theme.LIGHT);
        });
        
        act(() => {
          result.current.setTheme(Theme.SYSTEM);
        });
        
        expect(result.current.theme).toBe(Theme.SYSTEM);
      });
    });
  });

  describe('Given store persistence', () => {
    describe('When theme is set', () => {
      it('Then should persist the theme setting', () => {
        const { result } = renderHook(() => useThemeStore());
        
        act(() => {
          result.current.setTheme(Theme.DARK);
        });
        
        const persistedState = useThemeStore.getState();
        expect(persistedState.theme).toBe(Theme.DARK);
      });
    });
  });
});
