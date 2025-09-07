import { render } from '@testing-library/react';
import { ThemeProvider } from '@ui/providers/ThemeProvider';
import { useThemeStore } from '@core/stores/themeStore';
import { Theme } from '@core/enums/Theme';
import { mockNextNavigation } from '../../mocks/nextMocks';

jest.mock('@core/stores/themeStore');
jest.mock('next/navigation', () => mockNextNavigation());

const mockUseThemeStore = useThemeStore as jest.MockedFunction<typeof useThemeStore>;

describe('ThemeProvider', () => {
  const mockUpdateIsDark = jest.fn();
  
  beforeEach(() => {
    mockUseThemeStore.mockReturnValue({
      theme: Theme.SYSTEM,
      isDark: false,
      setTheme: jest.fn(),
      updateIsDark: mockUpdateIsDark,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.documentElement.className = '';
  });

  describe('Given the ThemeProvider component', () => {
    describe('When rendering with children', () => {
      it('Then should render children', () => {
        const { getByText } = render(
          <ThemeProvider>
            <div>Test Child</div>
          </ThemeProvider>
        );

        expect(getByText('Test Child')).toBeInTheDocument();
      });

      it('Then should call updateIsDark on mount', () => {
        render(
          <ThemeProvider>
            <div>Test Child</div>
          </ThemeProvider>
        );

        expect(mockUpdateIsDark).toHaveBeenCalledTimes(1);
      });
    });

    describe('When theme is SYSTEM', () => {
      beforeEach(() => {
        mockUseThemeStore.mockReturnValue({
          theme: Theme.SYSTEM,
          isDark: false,
          setTheme: jest.fn(),
          updateIsDark: mockUpdateIsDark,
        } as any);
      });

      it('Then should apply light theme when system prefers light', () => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }));

        render(
          <ThemeProvider>
            <div>Test Child</div>
          </ThemeProvider>
        );

        expect(document.documentElement.classList.add).toHaveBeenCalledWith('light');
        expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
      });

      it('Then should apply dark theme when system prefers dark', () => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
          matches: true,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }));

        render(
          <ThemeProvider>
            <div>Test Child</div>
          </ThemeProvider>
        );

        expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
        expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
      });

      it('Then should add media query listener for system theme changes', () => {
        const mockAddEventListener = jest.fn();
        window.matchMedia = jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: mockAddEventListener,
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }));

        const { unmount } = render(
          <ThemeProvider>
            <div>Test Child</div>
          </ThemeProvider>
        );

        expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function));
        
        unmount();
      });
    });

    describe('When theme is DARK', () => {
      beforeEach(() => {
        mockUseThemeStore.mockReturnValue({
          theme: Theme.DARK,
          isDark: true,
          setTheme: jest.fn(),
          updateIsDark: mockUpdateIsDark,
        } as any);
      });

      it('Then should apply dark theme', () => {
        render(
          <ThemeProvider>
            <div>Test Child</div>
          </ThemeProvider>
        );

        expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
        expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
      });
    });

    describe('When theme is LIGHT', () => {
      beforeEach(() => {
        mockUseThemeStore.mockReturnValue({
          theme: Theme.LIGHT,
          isDark: false,
          setTheme: jest.fn(),
          updateIsDark: mockUpdateIsDark,
        } as any);
      });

      it('Then should apply light theme', () => {
        render(
          <ThemeProvider>
            <div>Test Child</div>
          </ThemeProvider>
        );

        expect(document.documentElement.classList.add).toHaveBeenCalledWith('light');
        expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
      });
    });

    describe('When theme changes', () => {
      it('Then should update document classes when theme prop changes', () => {
        const { rerender } = render(
          <ThemeProvider>
            <div>Test Child</div>
          </ThemeProvider>
        );

        expect(document.documentElement.classList.add).toHaveBeenCalledWith('light');

        mockUseThemeStore.mockReturnValue({
          theme: Theme.DARK,
          isDark: true,
          setTheme: jest.fn(),
          updateIsDark: mockUpdateIsDark,
        } as any);

        rerender(
          <ThemeProvider>
            <div>Test Child</div>
          </ThemeProvider>
        );

        expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
        expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
      });
    });

    describe('When cleaning up', () => {
      it('Then should remove media query listener on unmount for SYSTEM theme', () => {
        const mockRemoveEventListener = jest.fn();
        window.matchMedia = jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: mockRemoveEventListener,
          dispatchEvent: jest.fn(),
        }));

        const { unmount } = render(
          <ThemeProvider>
            <div>Test Child</div>
          </ThemeProvider>
        );

        unmount();

        expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function));
      });
    });
  });
});
