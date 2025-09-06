import { Profile } from '@core/models/Profile';
import { GetProfileResponse } from '@core/responses/ProfileResponses';
import { datocmsRequest } from '@entrypoint/adapter/datocms';

export async function getProfile(): Promise<Profile> {
  const response = await datocmsRequest<GetProfileResponse>(`
    query {
      profile {
        title
        location
        about
        image {
          responsiveImage(imgixParams: {auto: [compress, format]}) {
            src
          }
        }
        curriculum {
          id
          filename
          mimeType
          url
        }
        banner {
          title
          description
          body
          experience
        }
      }
    }
  `);

  return {
    id: 'profile',
    title: response.profile.title,
    location: response.profile.location,
    about: response.profile.about,
    image: {
      src: response.profile.image.responsiveImage.src,
      alt: response.profile.title
    },
    curriculum: {
      id: response.profile.curriculum.id,
      filename: response.profile.curriculum.filename,
      mimeType: response.profile.curriculum.mimeType,
      url: response.profile.curriculum.url
    },
    banner: {
      title: response.profile.banner.title,
      description: response.profile.banner.description,
      body: response.profile.banner.body,
      experience: response.profile.banner.experience
    }
  };
}
