import { ImageQuery } from "./ImageQuery";

export interface HomePageQuery {
    profile: {
        title: string;
        location: string;
        about: string;
        image: ImageQuery;
    };
    allSocialNetworks: Array<{
        description: string;
        link: string;
    }>;
}
