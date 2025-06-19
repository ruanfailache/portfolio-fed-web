import { ImageQuery } from "./ImageQuery";

export interface ProjectTagQuery {
    id: string;
    name: string;
}

export interface ProjectCardQuery {
    id: string;
    name: string;
    link: string;
    description: string;
    image: ImageQuery;
    tags: Array<ProjectTagQuery>;
}

export interface ProjectPageQuery {
    profile: {
        title: string;
    };
    allProjects: Array<ProjectCardQuery>;
}
