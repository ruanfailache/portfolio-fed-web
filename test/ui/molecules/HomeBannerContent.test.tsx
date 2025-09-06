import { render, screen } from '@testing-library/react';
import { HomeBannerContent } from '@ui/molecules/HomeBannerContent';
import { Curriculum } from '@core/models/Profile';

jest.mock('@core/hooks/useSkills', () => ({
  useSkills: () => ({
    mainSkills: [
      { name: 'Java', icon: jest.fn() },
      { name: 'Angular', icon: jest.fn() },
      { name: 'React', icon: jest.fn() },
      { name: 'Node', icon: jest.fn() }
    ]
  })
}));

jest.mock('@ui/molecules/HomeDownloadCurriculumButton', () => {
  return function MockHomeDownloadCurriculumButton({ curriculum }: { curriculum: Curriculum }) {
    return <button data-testid="download-button">Download {curriculum.filename}</button>;
  };
});

describe('HomeBannerContent', () => {
  const mockProps = {
    curriculum: {
      url: 'https://example.com/curriculum.pdf',
      filename: 'curriculum-ruan.pdf'
    },
    title: 'Software Developer',
    description: 'Ruan Ferreira',
    body: 'Passionate about creating amazing web experiences',
    experience: '5+ years of experience'
  };

  describe('Given valid props', () => {
    describe('When rendering the component', () => {
      it('Then should display the title', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        expect(screen.getByText(mockProps.title)).toBeInTheDocument();
      });

      it('Then should display the description', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        expect(screen.getByText(mockProps.description)).toBeInTheDocument();
      });

      it('Then should display the body text', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        expect(screen.getByText(mockProps.body)).toBeInTheDocument();
      });

      it('Then should display the experience text', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        expect(screen.getByText(mockProps.experience)).toBeInTheDocument();
      });

      it('Then should render the download button', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        expect(screen.getByTestId('download-button')).toBeInTheDocument();
      });

      it('Then should display the "and more" text', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        expect(screen.getByText('...and more')).toBeInTheDocument();
      });
    });

    describe('When rendering skills section', () => {
      it('Then should render all main skills', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        expect(screen.getByText('Java')).toBeInTheDocument();
        expect(screen.getByText('Angular')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('Node')).toBeInTheDocument();
      });

      it('Then should render skills as list items', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        const skillItems = screen.getAllByRole('listitem');
        expect(skillItems).toHaveLength(5);
      });

      it('Then should apply correct CSS classes to skills container', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        const skillsList = screen.getByRole('list');
        expect(skillsList).toHaveClass('flex', 'items-end', 'gap-4');
      });
    });

    describe('When checking component structure', () => {
      it('Then should apply correct CSS classes to main container', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        const container = screen.getByText(mockProps.title).closest('div');
        expect(container).toHaveClass('flex-1', 'text-white');
      });

      it('Then should render title as strong element', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        const title = screen.getByText(mockProps.title);
        expect(title.tagName).toBe('STRONG');
      });

      it('Then should render description as h1 element', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        const description = screen.getByText(mockProps.description);
        expect(description.tagName).toBe('H1');
      });

      it('Then should render body as paragraph element', () => {
        render(<HomeBannerContent {...mockProps} />);
        
        const body = screen.getByText(mockProps.body);
        expect(body.tagName).toBe('P');
      });
    });
  });

  describe('Given different prop values', () => {
    describe('When rendering with different content', () => {
      it('Then should display updated title', () => {
        const customProps = { ...mockProps, title: 'Senior Developer' };
        render(<HomeBannerContent {...customProps} />);
        
        expect(screen.getByText('Senior Developer')).toBeInTheDocument();
      });

      it('Then should display updated description', () => {
        const customProps = { ...mockProps, description: 'John Doe' };
        render(<HomeBannerContent {...customProps} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      });

      it('Then should display updated body', () => {
        const customProps = { ...mockProps, body: 'Creating innovative solutions' };
        render(<HomeBannerContent {...customProps} />);
        
        expect(screen.getByText('Creating innovative solutions')).toBeInTheDocument();
      });

      it('Then should display updated experience', () => {
        const customProps = { ...mockProps, experience: '10+ years of experience' };
        render(<HomeBannerContent {...customProps} />);
        
        expect(screen.getByText('10+ years of experience')).toBeInTheDocument();
      });
    });
  });
});
