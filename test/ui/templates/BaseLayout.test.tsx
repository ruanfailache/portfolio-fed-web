import { render, screen } from '@testing-library/react';
import BaseLayout from '@ui/templates/BaseLayout';

jest.mock('@ui/organisms/SideBar', () => {
  return function MockSideBar() {
    return <aside data-testid="sidebar">SideBar</aside>;
  };
});

jest.mock('@ui/providers/ThemeProvider', () => ({
  ThemeProvider: function MockThemeProvider({ children }: { children: React.ReactNode }) {
    return <div data-testid="theme-provider">{children}</div>;
  }
}));

describe('BaseLayout', () => {
  describe('Given the BaseLayout component', () => {
    describe('When rendering with children', () => {
      it('Then should render children in main element', () => {
        render(
          <BaseLayout>
            <div data-testid="test-content">Test Content</div>
          </BaseLayout>
        );

        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
        
        const content = screen.getByTestId('test-content');
        expect(content).toBeInTheDocument();
        expect(main).toContainElement(content);
      });

      it('Then should render SideBar component', () => {
        render(
          <BaseLayout>
            <div>Test Content</div>
          </BaseLayout>
        );

        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toBeInTheDocument();
      });

      it('Then should render ThemeProvider', () => {
        render(
          <BaseLayout>
            <div>Test Content</div>
          </BaseLayout>
        );

        const themeProvider = screen.getByTestId('theme-provider');
        expect(themeProvider).toBeInTheDocument();
      });

      it('Then should apply correct CSS classes to main container', () => {
        render(
          <BaseLayout>
            <div>Test Content</div>
          </BaseLayout>
        );

        const container = screen.getByTestId('theme-provider').firstChild as HTMLElement;
        expect(container).toHaveClass(
          'overflow-x-hidden', 'flex', 'flex-col', 'lg:flex-row', 'h-screen'
        );
      });

      it('Then should apply correct CSS classes to main element', () => {
        render(
          <BaseLayout>
            <div>Test Content</div>
          </BaseLayout>
        );

        const main = screen.getByRole('main');
        expect(main).toHaveClass(
          'flex-1', 'h-screen', 'w-full', 'overflow-x-hidden', 'overflow-y-auto'
        );
      });
    });

    describe('When rendering with multiple children', () => {
      it('Then should render all children', () => {
        render(
          <BaseLayout>
            <div data-testid="child-1">Child 1</div>
            <div data-testid="child-2">Child 2</div>
            <div data-testid="child-3">Child 3</div>
          </BaseLayout>
        );

        expect(screen.getByTestId('child-1')).toBeInTheDocument();
        expect(screen.getByTestId('child-2')).toBeInTheDocument();
        expect(screen.getByTestId('child-3')).toBeInTheDocument();
      });
    });

    describe('When checking component structure', () => {
      it('Then should have correct DOM hierarchy', () => {
        render(
          <BaseLayout>
            <div data-testid="content">Content</div>
          </BaseLayout>
        );

        const themeProvider = screen.getByTestId('theme-provider');
        const container = themeProvider.firstChild as HTMLElement;
        const sidebar = screen.getByTestId('sidebar');
        const main = screen.getByRole('main');
        const content = screen.getByTestId('content');

        expect(themeProvider).toContainElement(container);
        expect(container).toContainElement(sidebar);
        expect(container).toContainElement(main);
        expect(main).toContainElement(content);
      });
    });
  });
});