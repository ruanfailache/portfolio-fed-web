export interface Profile {
  id: string;
  title: string;
  location: string;
  about: string;
  image: ProfileImage;
  curriculum: Curriculum;
  banner: BannerContent;
}

export interface ProfileImage {
  src: string;
  alt?: string;
}

export interface Curriculum {
  id: string;
  filename: string;
  mimeType: string;
  url: string;
}

export interface BannerContent {
  title: string;
  description: string;
  body: string;
  experience: string;
}
