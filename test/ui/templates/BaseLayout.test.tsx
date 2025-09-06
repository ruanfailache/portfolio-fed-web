import { render, screen } from '@testing-library/react';
import BaseLayout from '@ui/templates/BaseLayout';

jest.mock('@ui/organisms/SideBar', () => {
  return function MockSideBar() {
    return <aside data-testid="sidebar">Sidebar Content</aside>;
  };
});

describe('BaseLayout', () => {
  describe('Given the BaseLayout component', () => {
    describe('When rendering with children', () => {
      it('Then should render the main container', () => {
        render(
          <BaseLayout>
            <div>Test Content</div>
          </BaseLayout>
        );
        
        const container = screen.getByText('Test Content').closest('div');
        expect(container).toHaveClass('overflow-x-hidden', 'flex', 'flex-col', 'lg:flex-row', 'h-screen');
      });

      it('Then should render the SideBar component', () => {
        render(
          <BaseLayout>
            <div>Test Content</div>
          </BaseLayout>
        );
        
        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toBeInTheDocument();
      });

      it('Then should render the main content area', () => {
        render(
          <BaseLayout>
            <div>Test Content</div>
          </BaseLayout>
        );
        
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
        expect(main).toHaveClass('flex-1', 'h-screen', 'w-full', 'overflow-x-hidden', 'overflow-y-auto');
      });

      it('Then should render children content inside main', () => {
        render(
          <BaseLayout>
            <div>Test Content</div>
          </BaseLayout>
        );
        
        expect(screen.getByText('Test Content')).toBeInTheDocument();
        expect(screen.getByText('Test Content').closest('main')).toBeInTheDocument();
      });
    });

    describe('When rendering with different children', () => {
      it('Then should render multiple children correctly', () => {
        render(
          <BaseLayout>
            <h1>Page Title</h1>
            <p>Page content</p>
            <button>Action Button</button>
          </BaseLayout>
        );
        
        expect(screen.getByText('Page Title')).toBeInTheDocument();
        expect(screen.getByText('Page content')).toBeInTheDocument();
        expect(screen.getByText('Action Button')).toBeInTheDocument();
      });

      it('Then should render complex nested children', () => {
        render(
          <BaseLayout>
            <div className="page-container">
              <header>
                <h1>Complex Page</h1>
              </header>
              <section>
                <p>Section content</p>
              </section>
            </div>
          </BaseLayout>
        );
        
        expect(screen.getByText('Complex Page')).toBeInTheDocument();
        expect(screen.getByText('Section content')).toBeInTheDocument();
      });
    });

    describe('When checking layout structure', () => {
      it('Then should have correct flex layout classes', () => {
        render(
          <BaseLayout>
            <div>Content</div>
          </BaseLayout>
        );
        
        const container = screen.getByText('Content').closest('div');
        expect(container).toHaveClass('flex', 'flex-col', 'lg:flex-row');
      });

      it('Then should have correct height and overflow classes', () => {
        render(
          <BaseLayout>
            <div>Content</div>
          </BaseLayout>
        );
        
        const container = screen.getByText('Content').closest('div');
        expect(container).toHaveClass('h-screen', 'overflow-x-hidden');
      });

      it('Then should have responsive layout classes', () => {
        render(
          <BaseLayout>
            <div>Content</div>
          </BaseLayout>
        );
        
        const container = screen.getByText('Content').closest('div');
        expect(container).toHaveClass('lg:flex-row');
      });
    });

    describe('When rendering without children', () => {
      it('Then should render empty main element', () => {
        render(<BaseLayout />);
        
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
        expect(main).toBeEmptyDOMElement();
      });

      it('Then should still render SideBar', () => {
        render(<BaseLayout />);
        
        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toBeInTheDocument();
      });
    });
  });
});
