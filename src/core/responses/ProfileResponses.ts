export interface GetProfileResponse {
  profile: {
    title: string;
    location: string;
    about: string;
    image: {
      responsiveImage: {
        src: string;
      };
    };
    curriculum: {
      id: string;
      filename: string;
      mimeType: string;
      url: string;
    };
    banner: {
      title: string;
      description: string;
      body: string;
      experience: string;
    };
  };
  allSocialNetworks: Array<{
    description: string;
    link: string;
  }>;
}
