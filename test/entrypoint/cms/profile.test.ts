import { getProfile } from '@entrypoint/cms/profile';
import { datocmsRequest } from '@entrypoint/adapter/datocms';
import { GetProfileResponse } from '@core/responses/ProfileResponses';

jest.mock('@entrypoint/adapter/datocms');

describe('getProfile', () => {
  const mockDatocmsRequest = datocmsRequest as jest.MockedFunction<typeof datocmsRequest>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Given a successful API response', () => {
    const mockResponse: GetProfileResponse = {
      profile: {
        title: 'Software Developer',
        location: 'São Paulo, Brazil',
        about: 'Passionate developer with 5+ years of experience',
        image: {
          responsiveImage: {
            src: 'https://example.com/profile.jpg'
          }
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
      },
      allSocialNetworks: []
    };

    beforeEach(() => {
      mockDatocmsRequest.mockResolvedValue(mockResponse);
    });

    describe('When calling getProfile', () => {
      it('Then should return formatted profile data', async () => {
        const result = await getProfile();
        
        expect(result).toEqual({
          id: 'profile',
          title: mockResponse.profile.title,
          location: mockResponse.profile.location,
          about: mockResponse.profile.about,
          image: {
            src: mockResponse.profile.image.responsiveImage.src,
            alt: mockResponse.profile.title
          },
          curriculum: {
            id: mockResponse.profile.curriculum.id,
            filename: mockResponse.profile.curriculum.filename,
            mimeType: mockResponse.profile.curriculum.mimeType,
            url: mockResponse.profile.curriculum.url
          },
          banner: {
            title: mockResponse.profile.banner.title,
            description: mockResponse.profile.banner.description,
            body: mockResponse.profile.banner.body,
            experience: mockResponse.profile.banner.experience
          }
        });
      });

      it('Then should call datocmsRequest with correct query', async () => {
        await getProfile();
        
        expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('query {'));
        expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('profile {'));
        expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('title'));
        expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('location'));
        expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('about'));
        expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('image'));
        expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('curriculum'));
        expect(mockDatocmsRequest).toHaveBeenCalledWith(expect.stringContaining('banner'));
      });

      it('Then should call datocmsRequest only once', async () => {
        await getProfile();
        
        expect(mockDatocmsRequest).toHaveBeenCalledTimes(1);
      });

      it('Then should set profile id as "profile"', async () => {
        const result = await getProfile();
        
        expect(result.id).toBe('profile');
      });

      it('Then should map image alt to profile title', async () => {
        const result = await getProfile();
        
        expect(result.image.alt).toBe(mockResponse.profile.title);
      });
    });
  });

  describe('Given an API error', () => {
    const mockError = new Error('API request failed');

    beforeEach(() => {
      mockDatocmsRequest.mockRejectedValue(mockError);
    });

    describe('When calling getProfile', () => {
      it('Then should propagate the error', async () => {
        await expect(getProfile()).rejects.toThrow('API request failed');
      });
    });
  });

  describe('Given different response data', () => {
    describe('When profile has different values', () => {
      it('Then should handle different title values', async () => {
        const customResponse = {
          profile: {
            title: 'Senior Full Stack Developer',
            location: 'Remote',
            about: 'Expert in modern web technologies',
            image: {
              responsiveImage: {
                src: 'https://example.com/senior-dev.jpg'
              }
            },
            curriculum: {
              id: 'curriculum-456',
              filename: 'senior-dev-cv.pdf',
              mimeType: 'application/pdf',
              url: 'https://example.com/senior-cv.pdf'
            },
            banner: {
              title: 'Senior Developer',
              description: 'John Doe',
              body: 'Building scalable applications',
              experience: '10+ years of experience'
            }
          }
        };

        mockDatocmsRequest.mockResolvedValue(customResponse);

        const result = await getProfile();
        
        expect(result.title).toBe('Senior Full Stack Developer');
        expect(result.location).toBe('Remote');
        expect(result.about).toBe('Expert in modern web technologies');
        expect(result.image.src).toBe('https://example.com/senior-dev.jpg');
        expect(result.image.alt).toBe('Senior Full Stack Developer');
        expect(result.curriculum.filename).toBe('senior-dev-cv.pdf');
        expect(result.banner.title).toBe('Senior Developer');
        expect(result.banner.description).toBe('John Doe');
      });
    });
  });

  describe('Given malformed response data', () => {
    describe('When response is missing required fields', () => {
      it('Then should handle missing profile data gracefully', async () => {
        const incompleteResponse = {
          profile: {
            title: 'Developer',
            location: 'Brazil',
            about: 'Developer',
            image: {
              responsiveImage: {
                src: 'https://example.com/image.jpg'
              }
            },
            curriculum: {
              id: 'curriculum-789',
              filename: 'cv.pdf',
              mimeType: 'application/pdf',
              url: 'https://example.com/cv.pdf'
            },
            banner: {
              title: 'Developer',
              description: 'Developer',
              body: 'Developer',
              experience: '5 years'
            }
          }
        };

        mockDatocmsRequest.mockResolvedValue(incompleteResponse);

        const result = await getProfile();
        
        expect(result).toBeDefined();
        expect(result.id).toBe('profile');
        expect(result.title).toBe('Developer');
      });
    });
  });
});
