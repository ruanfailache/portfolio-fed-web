import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@ui/atoms/ThemeToggle';
import { useThemeStore } from '@core/stores/themeStore';
import { IconSize } from '@ui/atoms/IconButton';

jest.mock('@core/stores/themeStore');

const mockUseThemeStore = useThemeStore as jest.MockedFunction<typeof useThemeStore>;

describe('ThemeToggle', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    mockUseThemeStore.mockReturnValue({
      isDark: false,
      toggleTheme: mockToggleTheme,
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Given the ThemeToggle component', () => {
    describe('When rendering in light mode', () => {
      it('Then should display moon icon', () => {
        render(<ThemeToggle />);
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        
        const moonIcon = button.querySelector('svg');
        expect(moonIcon).toBeInTheDocument();
      });

      it('Then should have correct aria-label for light mode', () => {
        render(<ThemeToggle />);
        
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
      });

      it('Then should apply correct CSS classes', () => {
        render(<ThemeToggle />);
        
        const button = screen.getByRole('button');
        expect(button).toHaveClass(
          'box-border', 'p-2', 'cursor-pointer', 'transition', 
          'duration-300', 'rounded', 'bg-theme-button', 
          'text-theme-button', 'hover:bg-primary', 'hover:text-on-primary'
        );
      });
    });

    describe('When rendering in dark mode', () => {
      beforeEach(() => {
        mockUseThemeStore.mockReturnValue({
          isDark: true,
          toggleTheme: mockToggleTheme,
        } as any);
      });

      it('Then should display sun icon', () => {
        render(<ThemeToggle />);
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        
        const sunIcon = button.querySelector('svg');
        expect(sunIcon).toBeInTheDocument();
      });

      it('Then should have correct aria-label for dark mode', () => {
        render(<ThemeToggle />);
        
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
      });
    });

    describe('When clicking the toggle button', () => {
      it('Then should call toggleTheme function', () => {
        render(<ThemeToggle />);
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
      });
    });

    describe('When using different icon sizes', () => {
      it('Then should use default size when no size prop provided', () => {
        render(<ThemeToggle />);
        
        const button = screen.getByRole('button');
        const icon = button.querySelector('svg');
        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('width', IconSize.MD.toString());
        expect(icon).toHaveAttribute('height', IconSize.MD.toString());
      });

      it('Then should use provided size prop', () => {
        render(<ThemeToggle size={IconSize.LG} />);
        
        const button = screen.getByRole('button');
        const icon = button.querySelector('svg');
        expect(icon).toHaveAttribute('width', IconSize.LG.toString());
        expect(icon).toHaveAttribute('height', IconSize.LG.toString());
      });

      it('Then should use small size when specified', () => {
        render(<ThemeToggle size={IconSize.SM} />);
        
        const button = screen.getByRole('button');
        const icon = button.querySelector('svg');
        expect(icon).toHaveAttribute('width', IconSize.SM.toString());
        expect(icon).toHaveAttribute('height', IconSize.SM.toString());
      });
    });

    describe('When checking accessibility', () => {
      it('Then should have aria-hidden on icon', () => {
        render(<ThemeToggle />);
        
        const button = screen.getByRole('button');
        const icon = button.querySelector('svg');
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });

      it('Then should be focusable', () => {
        render(<ThemeToggle />);
        
        const button = screen.getByRole('button');
        button.focus();
        expect(button).toHaveFocus();
      });
    });
  });
});
