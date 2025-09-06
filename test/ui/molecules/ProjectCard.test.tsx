import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectCard from '@ui/molecules/ProjectCard';
import { Project } from '@core/models/Project';

jest.mock('next/image', () => {
  return function MockImage({ src, alt, fill }: { src: string; alt: string; fill?: boolean }) {
    return <img src={src} alt={alt} data-testid="project-image" />;
  };
});

describe('ProjectCard', () => {
  const mockProject: Project = {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform built with React and Node.js',
    image: {
      src: 'https://example.com/project-image.jpg',
      alt: 'E-commerce Platform'
    },
    technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    links: {
      repository: 'https://github.com/username/ecommerce',
      demo: 'https://ecommerce-demo.com'
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  };

  describe('Given a project with complete data', () => {
    describe('When rendering the component', () => {
      it('Then should display the project title', () => {
        render(<ProjectCard project={mockProject} />);
        
        expect(screen.getByText(mockProject.title)).toBeInTheDocument();
      });

      it('Then should display the project description', () => {
        render(<ProjectCard project={mockProject} />);
        
        expect(screen.getByText(mockProject.description)).toBeInTheDocument();
      });

      it('Then should render the project image', () => {
        render(<ProjectCard project={mockProject} />);
        
        const image = screen.getByTestId('project-image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', mockProject.image.src);
        expect(image).toHaveAttribute('alt', mockProject.title);
      });

      it('Then should display all technologies as tags', () => {
        render(<ProjectCard project={mockProject} />);
        
        mockProject.technologies.forEach(tech => {
          expect(screen.getByText(tech)).toBeInTheDocument();
        });
      });

      it('Then should render the preview button', () => {
        render(<ProjectCard project={mockProject} />);
        
        expect(screen.getByText('Preview')).toBeInTheDocument();
      });

      it('Then should render the eye icon', () => {
        render(<ProjectCard project={mockProject} />);
        
        const previewButton = screen.getByText('Preview').closest('a');
        expect(previewButton).toBeInTheDocument();
      });
    });

    describe('When checking external action link', () => {
      it('Then should link to demo URL when available', () => {
        render(<ProjectCard project={mockProject} />);
        
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', mockProject.links.demo);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });

      it('Then should link to repository when demo is not available', () => {
        const projectWithoutDemo = {
          ...mockProject,
          links: {
            repository: 'https://github.com/username/project',
            demo: undefined
          }
        };
        
        render(<ProjectCard project={projectWithoutDemo} />);
        
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', projectWithoutDemo.links.repository);
      });

      it('Then should link to fallback when no links are available', () => {
        const projectWithoutLinks = {
          ...mockProject,
          links: {
            repository: undefined,
            demo: undefined
          }
        };
        
        render(<ProjectCard project={projectWithoutLinks} />);
        
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '#');
      });
    });

    describe('When user interacts with the card', () => {
      it('Then should navigate to external URL when clicked', async () => {
        const user = userEvent.setup();
        render(<ProjectCard project={mockProject} />);
        
        const link = screen.getByRole('link');
        await user.click(link);
        
        expect(link).toHaveAttribute('href', mockProject.links.demo);
      });
    });
  });

  describe('Given a project with minimal data', () => {
    const minimalProject: Project = {
      id: '2',
      title: 'Simple Project',
      description: 'A simple project',
      image: {
        src: 'https://example.com/simple.jpg',
        alt: 'Simple Project'
      },
      technologies: ['JavaScript'],
      links: {
        repository: undefined,
        demo: undefined
      },
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    };

    describe('When rendering the component', () => {
      it('Then should display basic project information', () => {
        render(<ProjectCard project={minimalProject} />);
        
        expect(screen.getByText(minimalProject.title)).toBeInTheDocument();
        expect(screen.getByText(minimalProject.description)).toBeInTheDocument();
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
      });

      it('Then should handle single technology correctly', () => {
        render(<ProjectCard project={minimalProject} />);
        
        const technologyTags = screen.getAllByText('JavaScript');
        expect(technologyTags).toHaveLength(1);
      });
    });
  });

  describe('Given a project with many technologies', () => {
    const projectWithManyTechs: Project = {
      ...mockProject,
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Jest', 'Docker', 'AWS']
    };

    describe('When rendering the component', () => {
      it('Then should display all technologies', () => {
        render(<ProjectCard project={projectWithManyTechs} />);
        
        projectWithManyTechs.technologies.forEach(tech => {
          expect(screen.getByText(tech)).toBeInTheDocument();
        });
      });

      it('Then should render technologies container', () => {
        render(<ProjectCard project={projectWithManyTechs} />);
        
        const technologiesContainer = screen.getByText('React').closest('div');
        expect(technologiesContainer).toBeInTheDocument();
      });
    });
  });
});
