import { cmsRequest } from "@/graphql/utils";

interface HomeQuery {
    profile: {
        title: string;
        location: string;
        about: string;
        image: {
            responsiveImage: {
                src: string;
            };
        };
    };
    allSocialNetworks: Array<{
        description: string;
        link: string;
    }>;
}

export function getHomeQuery() {
    return cmsRequest<HomeQuery>(`
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
            }
            allSocialNetworks {
                description
                link
            }
        }
    `);
}
