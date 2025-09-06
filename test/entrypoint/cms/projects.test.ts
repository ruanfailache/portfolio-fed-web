import { getProjects, getProjectById } from '@entrypoint/cms/projects';
import { datocmsRequest } from '@entrypoint/adapter/datocms';
import { GetProjectsResponse, GetProjectByIdResponse } from '@core/responses/ProjectResponses';
import { createDate } from '@core/utils/date';

jest.mock('@entrypoint/adapter/datocms');
jest.mock('@core/utils/date');

describe('Projects CMS', () => {
  const mockDatocmsRequest = datocmsRequest as jest.MockedFunction<typeof datocmsRequest>;
  const mockCreateDate = createDate as jest.MockedFunction<typeof createDate>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateDate.mockReturnValue(new Date('2024-01-15T10:00:00Z'));
  });

  describe('getProjects', () => {
    describe('Given a successful API response with projects', () => {
      const mockResponse: GetProjectsResponse = {
        allProjects: [
          {
            id: 'project-1',
            name: 'E-commerce Platform',
            link: 'https://ecommerce-demo.com',
            description: 'A modern e-commerce platform built with React',
            image: {
              responsiveImage: {
                src: 'https://example.com/project1.jpg'
              }
            },
            tags: [
              { id: 'tag-1', name: 'React' },
              { id: 'tag-2', name: 'Node.js' },
              { id: 'tag-3', name: 'TypeScript' }
            ]
          },
          {
            id: 'project-2',
            name: 'Task Management App',
            link: 'https://tasks-demo.com',
            description: 'A collaborative task management application',
            image: {
              responsiveImage: {
                src: 'https://example.com/project2.jpg'
              }
            },
            tags: [
              { id: 'tag-4', name: 'Vue.js' },
              { id: 'tag-5', name: 'MongoDB' }
            ]
          }
        ]
      };

      beforeEach(() => {
        mockDatocmsRequest.mockResolvedValue(mockResponse);
      });

      describe('When calling getProjects', () => {
        it('Then should return formatted projects array', async () => {
          const result = await getProjects();
          
          expect(result).toHaveLength(2);
          expect(result[0]).toEqual({
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
            createdAt: new Date('2024-01-15T10:00:00Z'),
            updatedAt: new Date('2024-01-15T10:00:00Z')
          });
        });

        it('Then should map project name to title', async () => {
          const result = await getProjects();
          
          expect(result[0].title).toBe('E-commerce Platform');
          expect(result[1].title).toBe('Task Management App');
        });

        it('Then should map tags to technologies', async () => {
          const result = await getProjects();
          
          expect(result[0].technologies).toEqual(['React', 'Node.js', 'TypeScript']);
          expect(result[1].technologies).toEqual(['Vue.js', 'MongoDB']);
        });

        it('Then should map image src and alt correctly', async () => {
          const result = await getProjects();
          
          expect(result[0].image.src).toBe('https://example.com/project1.jpg');
          expect(result[0].image.alt).toBe('E-commerce Platform');
        });

        it('Then should set demo link and undefined repository', async () => {
          const result = await getProjects();
          
          expect(result[0].links.demo).toBe('https://ecommerce-demo.com');
          expect(result[0].links.repository).toBeUndefined();
        });

        it('Then should call createDate for createdAt and updatedAt', async () => {
          await getProjects();
          
          expect(mockCreateDate).toHaveBeenCalledTimes(4);
        });

        it('Then should call datocmsRequest with correct query', async () => {
          await getProjects();
          
          expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('query {'));
          expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('allProjects {'));
          expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('id'));
          expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('name'));
          expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('link'));
          expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('description'));
          expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('image'));
          expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('tags'));
        });
      });
    });

    describe('Given an empty projects response', () => {
      const emptyResponse: GetProjectsResponse = {
        allProjects: []
      };

      beforeEach(() => {
        mockDatocmsRequest.mockResolvedValue(emptyResponse);
      });

      describe('When calling getProjects', () => {
        it('Then should return empty array', async () => {
          const result = await getProjects();
          
          expect(result).toEqual([]);
        });

        it('Then should not call createDate', async () => {
          await getProjects();
          
          expect(mockCreateDate).not.toHaveBeenCalled();
        });
      });
    });

    describe('Given an API error', () => {
      const mockError = new Error('Failed to fetch projects');

      beforeEach(() => {
        mockDatocmsRequest.mockRejectedValue(mockError);
      });

      describe('When calling getProjects', () => {
        it('Then should propagate the error', async () => {
          await expect(getProjects()).rejects.toThrow('Failed to fetch projects');
        });
      });
    });
  });

  describe('getProjectById', () => {
    const projectId = 'project-123';

    describe('Given a successful API response with project', () => {
      const mockResponse: GetProjectByIdResponse = {
        project: {
          id: 'project-123',
          name: 'Portfolio Website',
          link: 'https://portfolio-demo.com',
          description: 'A personal portfolio website showcasing my work',
          image: {
            responsiveImage: {
              src: 'https://example.com/portfolio.jpg'
            }
          },
          tags: [
            { id: 'tag-1', name: 'Next.js' },
            { id: 'tag-2', name: 'Tailwind CSS' },
            { id: 'tag-3', name: 'TypeScript' }
          ]
        }
      };

      beforeEach(() => {
        mockDatocmsRequest.mockResolvedValue(mockResponse);
      });

      describe('When calling getProjectById with valid ID', () => {
        it('Then should return formatted project data', async () => {
          const result = await getProjectById(projectId);
          
          expect(result).toEqual({
            id: 'project-123',
            title: 'Portfolio Website',
            description: 'A personal portfolio website showcasing my work',
            technologies: ['Next.js', 'Tailwind CSS', 'TypeScript'],
            image: {
              src: 'https://example.com/portfolio.jpg',
              alt: 'Portfolio Website'
            },
            links: {
              demo: 'https://portfolio-demo.com',
              repository: undefined
            },
            createdAt: new Date('2024-01-15T10:00:00Z'),
            updatedAt: new Date('2024-01-15T10:00:00Z')
          });
        });

        it('Then should call datocmsRequest with correct query and ID', async () => {
          await getProjectById(projectId);
          
          expect(mockDatocmsRequest).toHaveBeenCalledWith(
            expect.stringContaining(`project(filter: {id: {eq: "${projectId}"}})`)
          );
        });

        it('Then should call createDate for dates', async () => {
          await getProjectById(projectId);
          
          expect(mockCreateDate).toHaveBeenCalledTimes(2);
        });
      });
    });

    describe('Given a response with no project found', () => {
      const mockResponse: GetProjectByIdResponse = {
        project: null
      };

      beforeEach(() => {
        mockDatocmsRequest.mockResolvedValue(mockResponse);
      });

      describe('When calling getProjectById with non-existent ID', () => {
        it('Then should return null', async () => {
          const result = await getProjectById('non-existent-id');
          
          expect(result).toBeNull();
        });

        it('Then should not call createDate', async () => {
          await getProjectById('non-existent-id');
          
          expect(mockCreateDate).not.toHaveBeenCalled();
        });
      });
    });

    describe('Given an API error', () => {
      const mockError = new Error('Failed to fetch project');

      beforeEach(() => {
        mockDatocmsRequest.mockRejectedValue(mockError);
      });

      describe('When calling getProjectById', () => {
        it('Then should propagate the error', async () => {
          await expect(getProjectById(projectId)).rejects.toThrow('Failed to fetch project');
        });
      });
    });

    describe('Given different project IDs', () => {
      describe('When calling getProjectById with various IDs', () => {
        it('Then should include the correct ID in the query', async () => {
          const testId = 'test-project-456';
          mockDatocmsRequest.mockResolvedValue({ project: null });
          
          await getProjectById(testId);
          
          expect(mockDatocmsRequest).toHaveBeenCalledWith(
            expect.stringContaining(`project(filter: {id: {eq: "${testId}"}})`)
          );
        });

        it('Then should handle special characters in ID', async () => {
          const specialId = 'project-with-special-chars-123';
          mockDatocmsRequest.mockResolvedValue({ project: null });
          
          await getProjectById(specialId);
          
          expect(mockDatocmsRequest).toHaveBeenCalledWith(
            expect.stringContaining(`project(filter: {id: {eq: "${specialId}"}})`)
          );
        });
      });
    });
  });
});
