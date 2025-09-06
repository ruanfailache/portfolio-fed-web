import { SocialNetwork } from '@core/models/SocialNetwork';
import { GetSocialNetworksResponse } from '@core/responses/SocialNetworkResponses';
import { datocmsRequest } from '@entrypoint/adapter/datocms';
import { extractNameFromUrl, getIconFromUrl } from '@core/utils/url';

export async function getSocialNetworks(): Promise<SocialNetwork[]> {
  const response = await datocmsRequest<GetSocialNetworksResponse>(`
    query {
      allSocialNetworks {
        description
        link
      }
    }
  `);

  return response.allSocialNetworks.map((social, index) => ({
    id: `social-${index}`,
    name: extractNameFromUrl(social.link),
    description: social.description,
    link: social.link,
    icon: getIconFromUrl(social.link)
  }));
}
