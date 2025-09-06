export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: ProjectImage;
  links: ProjectLinks;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectImage {
  src: string;
  alt?: string;
}

export interface ProjectLinks {
  demo?: string;
  repository?: string;
}
