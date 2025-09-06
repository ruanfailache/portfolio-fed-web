export interface GetProjectsResponse {
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

export interface GetProjectByIdResponse {
  project: {
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
  } | null;
}
