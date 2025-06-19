import { cmsRequest } from "@/graphql/utils";
import { ProjectPageQuery } from "../interfaces/ProjectPageQuery";

export function getProjectsQuery() {
    return cmsRequest<ProjectPageQuery>(`
        query {
            profile {
                title
            }

            allProjects {
                id
                name
                link
                description

                image {
                  responsiveImage(imgixParams: {auto: [compress, format]}) {
                    src
                  }
                }

                tags {
                    id
                    name
                }
            }
        }
    `);
}
