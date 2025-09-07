import { render, screen } from '@testing-library/react';
import { HomeBannerSection } from '@ui/organisms/HomeBannerSection';

jest.mock('@entrypoint/cms/profile', () => ({
  getProfile: jest.fn()
}));

jest.mock('@ui/molecules/HomeBannerContent', () => ({
  HomeBannerContent: function MockHomeBannerContent({ 
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
  }
}));

jest.mock('@ui/molecules/HomeBannerImage', () => ({
  HomeBannerImage: function MockHomeBannerImage({ profileImageSrc }: { profileImageSrc: string }) {
    return (
      <div data-testid="home-banner-image">
        <img src={profileImageSrc} alt="Profile" />
      </div>
    );
  }
}));

describe('HomeBannerSection', () => {
  const mockGetProfile = require('@entrypoint/cms/profile').getProfile;

  const mockProfile = {
    image: {
      src: 'test-image.jpg'
    },
    curriculum: {
      filename: 'test-cv.pdf'
    },
    banner: {
      title: 'Test Title',
      description: 'Test Description',
      body: 'Test Body',
      experience: 'Test Experience'
    }
  };

  beforeEach(() => {
    mockGetProfile.mockResolvedValue(mockProfile);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Given the HomeBannerSection component', () => {
    describe('When rendering', () => {
      it('Then should render as a section element', async () => {
        render(await HomeBannerSection());
        
        const section = document.querySelector('section');
        expect(section).toBeInTheDocument();
        expect(section).toHaveClass('flex', 'flex-col', 'lg:flex-row-reverse', 'items-center', 'justify-center', 'lg:justify-stretch', 'gap-8');
      });

      it('Then should render HomeBannerImage with correct props', async () => {
        render(await HomeBannerSection());
        
        const imageComponent = screen.getByTestId('home-banner-image');
        expect(imageComponent).toBeInTheDocument();
        
        const image = imageComponent.querySelector('img');
        expect(image).toHaveAttribute('src', 'test-image.jpg');
        expect(image).toHaveAttribute('alt', 'Profile');
      });

      it('Then should render HomeBannerContent with correct props', async () => {
        render(await HomeBannerSection());
        
        const contentComponent = screen.getByTestId('home-banner-content');
        expect(contentComponent).toBeInTheDocument();
        
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Test Body')).toBeInTheDocument();
        expect(screen.getByText('Test Experience')).toBeInTheDocument();
        expect(screen.getByTestId('curriculum-filename')).toHaveTextContent('test-cv.pdf');
      });

      it('Then should call getProfile to fetch profile data', async () => {
        render(await HomeBannerSection());
        
        expect(mockGetProfile).toHaveBeenCalledTimes(1);
      });
    });
  });
});
