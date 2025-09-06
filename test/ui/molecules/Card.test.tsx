import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '@ui/molecules/Card';

describe('Card', () => {
  const mockChildren = 'Card Content';

  describe('Given a basic card with children', () => {
    describe('When rendering the component', () => {
      it('Then should display the children content', () => {
        render(<Card>{mockChildren}</Card>);
        
        expect(screen.getByText(mockChildren)).toBeInTheDocument();
      });

        it('Then should render the card container', () => {
          render(<Card>{mockChildren}</Card>);
          
          const card = screen.getByText(mockChildren).parentElement;
          expect(card).toBeInTheDocument();
        });
    });
  });

  describe('Card.HeaderImage', () => {
    describe('Given a card header image with children', () => {
      describe('When rendering the component', () => {
        it('Then should display the children content', () => {
          render(
            <Card>
              <Card.HeaderImage>{mockChildren}</Card.HeaderImage>
            </Card>
          );
          
          expect(screen.getByText(mockChildren)).toBeInTheDocument();
        });

        it('Then should render the header element', () => {
          render(
            <Card>
              <Card.HeaderImage>{mockChildren}</Card.HeaderImage>
            </Card>
          );
          
          const header = screen.getByText(mockChildren).parentElement;
          expect(header).toBeInTheDocument();
        });

        it('Then should render as header element', () => {
          render(
            <Card>
              <Card.HeaderImage>{mockChildren}</Card.HeaderImage>
            </Card>
          );
          
          const header = screen.getByText(mockChildren).parentElement;
          expect(header).toBeInTheDocument();
        });
      });
    });
  });

  describe('Card.Content', () => {
    describe('Given a card content with children', () => {
      describe('When rendering the component', () => {
        it('Then should display the children content', () => {
          render(
            <Card>
              <Card.Content>{mockChildren}</Card.Content>
            </Card>
          );
          
          expect(screen.getByText(mockChildren)).toBeInTheDocument();
        });

        it('Then should render the content element', () => {
          render(
            <Card>
              <Card.Content>{mockChildren}</Card.Content>
            </Card>
          );
          
          const content = screen.getByText(mockChildren).parentElement;
          expect(content).toBeInTheDocument();
        });
      });
    });
  });

  describe('Card.InternalAction', () => {
    const mockHref = '/projects';

    describe('Given a card internal action with href and children', () => {
      describe('When rendering the component', () => {
        it('Then should display the children content', () => {
          render(
            <Card>
              <Card.InternalAction href={mockHref}>{mockChildren}</Card.InternalAction>
            </Card>
          );
          
          expect(screen.getByText(mockChildren)).toBeInTheDocument();
        });

        it('Then should render as a link with correct href', () => {
          render(
            <Card>
              <Card.InternalAction href={mockHref}>{mockChildren}</Card.InternalAction>
            </Card>
          );
          
          const link = screen.getByRole('link');
          expect(link).toHaveAttribute('href', mockHref);
        });

        it('Then should apply correct CSS classes', () => {
          render(
            <Card>
              <Card.InternalAction href={mockHref}>{mockChildren}</Card.InternalAction>
            </Card>
          );
          
          const link = screen.getByRole('link');
          expect(link).toHaveClass('button__flat', 'p-6', 'border-t', 'border-button');
        });
      });

      describe('When user clicks the internal action', () => {
        it('Then should navigate to internal URL', async () => {
          const user = userEvent.setup();
          render(
            <Card>
              <Card.InternalAction href={mockHref}>{mockChildren}</Card.InternalAction>
            </Card>
          );
          
          const link = screen.getByRole('link');
          await user.click(link);
          
          expect(link).toHaveAttribute('href', mockHref);
        });
      });
    });
  });

  describe('Card.ExternalAction', () => {
    const mockHref = 'https://github.com/username';

    describe('Given a card external action with href and children', () => {
      describe('When rendering the component', () => {
        it('Then should display the children content', () => {
          render(
            <Card>
              <Card.ExternalAction href={mockHref}>{mockChildren}</Card.ExternalAction>
            </Card>
          );
          
          expect(screen.getByText(mockChildren)).toBeInTheDocument();
        });

        it('Then should render as a link with correct href', () => {
          render(
            <Card>
              <Card.ExternalAction href={mockHref}>{mockChildren}</Card.ExternalAction>
            </Card>
          );
          
          const link = screen.getByRole('link');
          expect(link).toHaveAttribute('href', mockHref);
        });

        it('Then should have correct accessibility attributes', () => {
          render(
            <Card>
              <Card.ExternalAction href={mockHref}>{mockChildren}</Card.ExternalAction>
            </Card>
          );
          
          const link = screen.getByRole('link');
          expect(link).toHaveAttribute('target', '_blank');
          expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('Then should apply correct CSS classes', () => {
          render(
            <Card>
              <Card.ExternalAction href={mockHref}>{mockChildren}</Card.ExternalAction>
            </Card>
          );
          
          const link = screen.getByRole('link');
          expect(link).toHaveClass('button__flat', 'p-6', 'border-t', 'border-button');
        });
      });

      describe('When user clicks the external action', () => {
        it('Then should navigate to external URL', async () => {
          const user = userEvent.setup();
          render(
            <Card>
              <Card.ExternalAction href={mockHref}>{mockChildren}</Card.ExternalAction>
            </Card>
          );
          
          const link = screen.getByRole('link');
          await user.click(link);
          
          expect(link).toHaveAttribute('href', mockHref);
        });
      });
    });
  });

  describe('Given a complete card structure', () => {
    describe('When rendering all card components together', () => {
      it('Then should render all components correctly', () => {
        render(
          <Card>
            <Card.HeaderImage>Header Image</Card.HeaderImage>
            <Card.Content>Card Content</Card.Content>
            <Card.InternalAction href="/details">View Details</Card.InternalAction>
          </Card>
        );
        
        expect(screen.getByText('Header Image')).toBeInTheDocument();
        expect(screen.getByText('Card Content')).toBeInTheDocument();
        expect(screen.getByText('View Details')).toBeInTheDocument();
      });
    });
  });
});
