import { render, screen } from '@testing-library/react';
import ProjectsScreen from '@ui/screens/ProjectsScreen';

jest.mock('@entrypoint/cms/projects', () => ({
  getProjects: jest.fn()
}));

jest.mock('@ui/molecules/ProjectCard', () => {
  return function MockProjectCard({ project }: { project: any }) {
    return (
      <div data-testid={`project-card-${project.id}`}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <span data-testid="project-technologies">{project.technologies.join(', ')}</span>
      </div>
    );
  };
});

describe('ProjectsScreen', () => {
  const mockGetProjects = require('@entrypoint/cms/projects').getProjects;

  const mockProjects = [
    {
      id: 'project-1',
      title: 'E-commerce Platform',
      description: 'A modern e-commerce platform built with React',
      technologies: ['React', 'Node.js', 'TypeScript'],
      image: {
        src: 'https://example.com/project1.jpg',
        alt: 'E-commerce Platform'
      },
      links: {
        demo: 'https://ecommerce-demo.com',
        repository: undefined
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: 'project-2',
      title: 'Task Management App',
      description: 'A collaborative task management application',
      technologies: ['Vue.js', 'MongoDB', 'Express'],
      image: {
        src: 'https://example.com/project2.jpg',
        alt: 'Task Management App'
      },
      links: {
        demo: 'https://tasks-demo.com',
        repository: undefined
      },
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-15')
    }
  ];

  beforeEach(() => {
    mockGetProjects.mockResolvedValue(mockProjects);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Given a successful projects fetch', () => {
    describe('When rendering the ProjectsScreen', () => {
      it('Then should render the main container', async () => {
        const component = await ProjectsScreen();
        render(component);
        
        const container = screen.getByText('My projects').closest('div');
        expect(container).toHaveClass('container', 'm-auto', 'p-4', 'lg:py-8', 'flex', 'flex-col', 'gap-4');
      });

      it('Then should render the page header', async () => {
        const component = await ProjectsScreen();
        render(component);
        
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
        
        const title = screen.getByRole('heading', { level: 1 });
        expect(title).toHaveTextContent('My projects');
        expect(title).toHaveClass('text-2xl', 'font-semibold', 'text-white');
      });

      it('Then should render the projects section', async () => {
        const component = await ProjectsScreen();
        render(component);
        
        const section = screen.getByText('E-commerce Platform').closest('section');
        expect(section).toHaveClass('flex', 'flex-col', 'justify-start', 'gap-6', 'max-w-full');
      });

      it('Then should render all project cards', async () => {
        const component = await ProjectsScreen();
        render(component);
        
        expect(screen.getByTestId('project-card-project-1')).toBeInTheDocument();
        expect(screen.getByTestId('project-card-project-2')).toBeInTheDocument();
      });

      it('Then should render project details correctly', async () => {
        const component = await ProjectsScreen();
        render(component);
        
        expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
        expect(screen.getByText('A modern e-commerce platform built with React')).toBeInTheDocument();
        expect(screen.getByText('React, Node.js, TypeScript')).toBeInTheDocument();
        
        expect(screen.getByText('Task Management App')).toBeInTheDocument();
        expect(screen.getByText('A collaborative task management application')).toBeInTheDocument();
        expect(screen.getByText('Vue.js, MongoDB, Express')).toBeInTheDocument();
      });

      it('Then should call getProjects function', async () => {
        await ProjectsScreen();
        
        expect(mockGetProjects).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Given an empty projects list', () => {
    describe('When rendering with no projects', () => {
      it('Then should render empty projects section', async () => {
        mockGetProjects.mockResolvedValue([]);

        const component = await ProjectsScreen();
        render(component);
        
        const section = screen.getByText('My projects').closest('div')?.querySelector('section');
        expect(section).toBeInTheDocument();
        
        const projectCards = screen.queryAllByTestId(/project-card-/);
        expect(projectCards).toHaveLength(0);
      });

      it('Then should still render the header', async () => {
        mockGetProjects.mockResolvedValue([]);

        const component = await ProjectsScreen();
        render(component);
        
        expect(screen.getByText('My projects')).toBeInTheDocument();
      });
    });
  });

  describe('Given different projects data', () => {
    describe('When rendering with different projects', () => {
      it('Then should render updated project content', async () => {
        const customProjects = [
          {
            id: 'custom-project',
            title: 'Portfolio Website',
            description: 'A personal portfolio website',
            technologies: ['Next.js', 'Tailwind CSS'],
            image: {
              src: 'https://example.com/portfolio.jpg',
              alt: 'Portfolio Website'
            },
            links: {
              demo: 'https://portfolio-demo.com',
              repository: undefined
            },
            createdAt: new Date('2024-03-01'),
            updatedAt: new Date('2024-03-05')
          }
        ];

        mockGetProjects.mockResolvedValue(customProjects);

        const component = await ProjectsScreen();
        render(component);
        
        expect(screen.getByText('Portfolio Website')).toBeInTheDocument();
        expect(screen.getByText('A personal portfolio website')).toBeInTheDocument();
        expect(screen.getByText('Next.js, Tailwind CSS')).toBeInTheDocument();
      });
    });
  });

  describe('Given projects fetch error', () => {
    describe('When getProjects throws an error', () => {
      it('Then should propagate the error', async () => {
        const error = new Error('Failed to fetch projects');
        mockGetProjects.mockRejectedValue(error);

        await expect(ProjectsScreen()).rejects.toThrow('Failed to fetch projects');
      });
    });
  });

  describe('Given many projects', () => {
    describe('When rendering with multiple projects', () => {
      it('Then should render all projects in flex wrap layout', async () => {
        const manyProjects = Array.from({ length: 5 }, (_, index) => ({
          id: `project-${index + 1}`,
          title: `Project ${index + 1}`,
          description: `Description for project ${index + 1}`,
          technologies: ['React', 'TypeScript'],
          image: {
            src: `https://example.com/project${index + 1}.jpg`,
            alt: `Project ${index + 1}`
          },
          links: {
            demo: `https://project${index + 1}-demo.com`,
            repository: undefined
          },
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        }));

        mockGetProjects.mockResolvedValue(manyProjects);

        const component = await ProjectsScreen();
        render(component);
        
        const projectsContainer = screen.getByText('Project 1').closest('section')?.querySelector('div');
        expect(projectsContainer).toHaveClass('flex', 'flex-wrap', 'gap-6');
        
        const projectCards = screen.getAllByTestId(/project-card-/);
        expect(projectCards).toHaveLength(5);
      });
    });
  });
});
