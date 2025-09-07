export const mockUseSkills = () => ({
  mainSkills: [
    { name: 'Java', icon: () => <span data-testid="java-icon">Java</span> },
    { name: 'Angular', icon: () => <span data-testid="angular-icon">Angular</span> },
    { name: 'React', icon: () => <span data-testid="react-icon">React</span> },
    { name: 'Node', icon: () => <span data-testid="node-icon">Node</span> }
  ]
});

export const mockUseThemeStore = (overrides = {}) => ({
  theme: 'system',
  isDark: false,
  setTheme: jest.fn(),
  updateIsDark: jest.fn(),
  toggleTheme: jest.fn(),
  ...overrides
});

export const mockUseProfile = () => ({
  profile: {
    banner: {
      title: 'Test Title',
      description: 'Test Description',
      body: 'Test Body',
      experience: 'Test Experience',
      profileImageSrc: 'test-image.jpg',
      curriculum: { filename: 'test-cv.pdf' }
    }
  },
  isLoading: false,
  error: null
});

export const mockUseProjects = () => ({
  projects: [
    {
      id: '1',
      title: 'Project 1',
      description: 'Description 1',
      technologies: ['React', 'TypeScript'],
      repositoryUrl: 'https://github.com/test/project1',
      liveUrl: 'https://project1.com',
      image: { url: 'project1.jpg' }
    },
    {
      id: '2',
      title: 'Project 2',
      description: 'Description 2',
      technologies: ['Vue', 'JavaScript'],
      repositoryUrl: 'https://github.com/test/project2',
      liveUrl: 'https://project2.com',
      image: { url: 'project2.jpg' }
    }
  ],
  isLoading: false,
  error: null
});
