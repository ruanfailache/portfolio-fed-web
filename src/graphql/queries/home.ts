import { cmsRequest } from "@/graphql/utils";
import { HomePageQuery } from "../interfaces/HomePageQuery";

export function getHomeQuery() {
    return cmsRequest<HomePageQuery>(`
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
            }

            allSocialNetworks {
                description
                link
            }
        }
    `);
}
