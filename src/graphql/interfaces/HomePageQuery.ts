import { ImageQuery } from "./ImageQuery";

export interface HomeCurriculumQuery {
    id: string;
    filename: string;
    mimeType: string;
    url: string;
}

export interface HomePageQuery {
    profile: {
        title: string;
        location: string;
        about: string;
        image: ImageQuery;
        curriculum: HomeCurriculumQuery;
    };
    allSocialNetworks: Array<{
        description: string;
        link: string;
    }>;
}
