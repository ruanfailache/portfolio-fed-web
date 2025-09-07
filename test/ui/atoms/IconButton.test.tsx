import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton, { IconSize } from '@ui/atoms/IconButton';
import { FaGithub } from 'react-icons/fa';

describe('IconButton', () => {
  const mockProps = {
    label: 'GitHub Profile',
    icon: FaGithub,
    href: 'https://github.com/username'
  };

  describe('ExternalLink', () => {
    describe('Given an external link with valid props', () => {
      describe('When rendering the component', () => {
        it('Then should render the link with correct href', () => {
          render(<IconButton.ExternalLink {...mockProps} />);
          
          const link = screen.getByRole('link');
          expect(link).toHaveAttribute('href', mockProps.href);
        });

        it('Then should have correct accessibility attributes', () => {
          render(<IconButton.ExternalLink {...mockProps} />);
          
          const link = screen.getByRole('link');
          expect(link).toHaveAttribute('target', '_blank');
          expect(link).toHaveAttribute('rel', 'noopener noreferrer');
          expect(link).toHaveAttribute('aria-label', mockProps.label);
        });

        it('Then should render the icon', () => {
          render(<IconButton.ExternalLink {...mockProps} />);
          
          const icon = screen.getByRole('link').querySelector('svg');
          expect(icon).toBeInTheDocument();
        });

        it('Then should apply correct CSS classes', () => {
          render(<IconButton.ExternalLink {...mockProps} />);
          
          const link = screen.getByRole('link');
          expect(link).toHaveClass('box-border', 'p-2', 'cursor-pointer', 'transition', 'duration-300', 'rounded', 'bg-theme-button', 'text-theme-button', 'hover:bg-primary', 'hover:text-on-primary');
        });
      });

      describe('When using default icon size', () => {
        it('Then should use medium size as default', () => {
          render(<IconButton.ExternalLink {...mockProps} />);
          
          const icon = screen.getByRole('link').querySelector('svg');
          expect(icon).toHaveAttribute('width', IconSize.MD.toString());
        });
      });

      describe('When providing custom icon size', () => {
        it('Then should use the provided size', () => {
          render(<IconButton.ExternalLink {...mockProps} size={IconSize.LG} />);
          
          const icon = screen.getByRole('link').querySelector('svg');
          expect(icon).toHaveAttribute('width', IconSize.LG.toString());
        });
      });

      describe('When user clicks the link', () => {
        it('Then should navigate to external URL', async () => {
          const user = userEvent.setup();
          render(<IconButton.ExternalLink {...mockProps} />);
          
          const link = screen.getByRole('link');
          await user.click(link);
          
          expect(link).toHaveAttribute('href', mockProps.href);
        });
      });
    });
  });

  describe('InternalLink', () => {
    describe('Given an internal link with valid props', () => {
      describe('When rendering the component', () => {
        it('Then should render the link with correct href', () => {
          render(<IconButton.InternalLink {...mockProps} />);
          
          const link = screen.getByRole('link');
          expect(link).toHaveAttribute('href', mockProps.href);
        });

        it('Then should have correct accessibility attributes', () => {
          render(<IconButton.InternalLink {...mockProps} />);
          
          const link = screen.getByRole('link');
          expect(link).toHaveAttribute('aria-label', mockProps.label);
          expect(link).not.toHaveAttribute('target');
          expect(link).not.toHaveAttribute('rel');
        });

        it('Then should render the icon', () => {
          render(<IconButton.InternalLink {...mockProps} />);
          
          const icon = screen.getByRole('link').querySelector('svg');
          expect(icon).toBeInTheDocument();
        });

        it('Then should apply correct CSS classes', () => {
          render(<IconButton.InternalLink {...mockProps} />);
          
          const link = screen.getByRole('link');
          expect(link).toHaveClass('box-border', 'p-2', 'cursor-pointer', 'transition', 'duration-300', 'rounded', 'bg-theme-button', 'text-theme-button', 'hover:bg-primary', 'hover:text-on-primary');
        });
      });

      describe('When using default icon size', () => {
        it('Then should use medium size as default', () => {
          render(<IconButton.InternalLink {...mockProps} />);
          
          const icon = screen.getByRole('link').querySelector('svg');
          expect(icon).toHaveAttribute('width', IconSize.MD.toString());
        });
      });

      describe('When providing custom icon size', () => {
        it('Then should use the provided size', () => {
          render(<IconButton.InternalLink {...mockProps} size={IconSize.SM} />);
          
          const icon = screen.getByRole('link').querySelector('svg');
          expect(icon).toHaveAttribute('width', IconSize.SM.toString());
        });
      });
    });
  });
});
