import { render, screen } from '@testing-library/react';
import HomeScreen from '@ui/screens/HomeScreen';

jest.mock('@entrypoint/cms/profile', () => ({
  getProfile: jest.fn()
}));

jest.mock('@ui/molecules/HomeBannerContent', () => {
  return function MockHomeBannerContent({ 
    curriculum, 
    title, 
    description, 
    body, 
    experience 
  }: {
    curriculum: any;
    title: string;
    description: string;
    body: string;
    experience: string;
  }) {
    return (
      <div data-testid="home-banner-content">
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{body}</p>
        <p>{experience}</p>
        <span data-testid="curriculum-filename">{curriculum.filename}</span>
      </div>
    );
  };
});

jest.mock('@ui/molecules/HomeBannerImage', () => {
  return function MockHomeBannerImage({ profileImageSrc }: { profileImageSrc: string }) {
    return (
      <div data-testid="home-banner-image">
        <img src={profileImageSrc} alt="Profile" />
      </div>
    );
  };
});

describe('HomeScreen', () => {
  const mockGetProfile = require('@entrypoint/cms/profile').getProfile;

  const mockProfile = {
    id: 'profile',
    title: 'Software Developer',
    location: 'São Paulo, Brazil',
    about: 'Passionate developer with 5+ years of experience',
    image: {
      src: 'https://example.com/profile.jpg',
      alt: 'Software Developer'
    },
    curriculum: {
      id: 'curriculum-123',
      filename: 'curriculum-ruan.pdf',
      mimeType: 'application/pdf',
      url: 'https://example.com/curriculum.pdf'
    },
    banner: {
      title: 'Software Developer',
      description: 'Ruan Ferreira',
      body: 'Creating amazing web experiences',
      experience: '5+ years of experience'
    }
  };

  beforeEach(() => {
    mockGetProfile.mockResolvedValue(mockProfile);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Given a successful profile fetch', () => {
    describe('When rendering the HomeScreen', () => {
      it('Then should render the main container', async () => {
        const component = await HomeScreen();
        render(component);
        
        const container = screen.getByRole('main').parentElement;
        expect(container).toHaveClass('container', 'm-auto', 'p-4', 'lg:py-8', 'flex', 'flex-col', 'lg:flex-row-reverse', 'items-center', 'justify-center', 'lg:justify-stretch', 'gap-8');
      });

      it('Then should render HomeBannerImage with correct props', async () => {
        const component = await HomeScreen();
        render(component);
        
        const bannerImage = screen.getByTestId('home-banner-image');
        expect(bannerImage).toBeInTheDocument();
        
        const image = bannerImage.querySelector('img');
        expect(image).toHaveAttribute('src', mockProfile.image.src);
        expect(image).toHaveAttribute('alt', 'Profile');
      });

      it('Then should render HomeBannerContent with correct props', async () => {
        const component = await HomeScreen();
        render(component);
        
        const bannerContent = screen.getByTestId('home-banner-content');
        expect(bannerContent).toBeInTheDocument();
        
        expect(screen.getByText(mockProfile.banner.title)).toBeInTheDocument();
        expect(screen.getByText(mockProfile.banner.description)).toBeInTheDocument();
        expect(screen.getByText(mockProfile.banner.body)).toBeInTheDocument();
        expect(screen.getByText(mockProfile.banner.experience)).toBeInTheDocument();
        expect(screen.getByTestId('curriculum-filename')).toHaveTextContent(mockProfile.curriculum.filename);
      });

      it('Then should call getProfile function', async () => {
        await HomeScreen();
        
        expect(mockGetProfile).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Given different profile data', () => {
    describe('When rendering with different profile', () => {
      it('Then should render updated content', async () => {
        const customProfile = {
          ...mockProfile,
          banner: {
            title: 'Senior Developer',
            description: 'John Doe',
            body: 'Building scalable applications',
            experience: '10+ years of experience'
          },
          curriculum: {
            ...mockProfile.curriculum,
            filename: 'senior-dev-cv.pdf'
          }
        };

        mockGetProfile.mockResolvedValue(customProfile);

        const component = await HomeScreen();
        render(component);
        
        expect(screen.getByText('Senior Developer')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Building scalable applications')).toBeInTheDocument();
        expect(screen.getByText('10+ years of experience')).toBeInTheDocument();
        expect(screen.getByTestId('curriculum-filename')).toHaveTextContent('senior-dev-cv.pdf');
      });
    });
  });

  describe('Given profile fetch error', () => {
    describe('When getProfile throws an error', () => {
      it('Then should propagate the error', async () => {
        const error = new Error('Failed to fetch profile');
        mockGetProfile.mockRejectedValue(error);

        await expect(HomeScreen()).rejects.toThrow('Failed to fetch profile');
      });
    });
  });
});
