import { cmsRequest } from "@/graphql/utils";

interface ProjectQuery {
    profile: {
        title: string;
    };
    allProjects: Array<{
        id: string;
        name: string;
        link: string;
        description: string;
        image: {
            responsiveImage: {
                src: string;
            };
        };
        tags: Array<{
            id: string;
            name: string;
        }>;
    }>;
}

export function getProjectsQuery() {
    return cmsRequest<ProjectQuery>(`
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
