import { Project } from '@core/models/Project';
import { GetProjectsResponse, GetProjectByIdResponse } from '@core/responses/ProjectResponses';
import { datocmsRequest } from '@entrypoint/adapter/datocms';
import { createDate } from '@core/utils/date';

export async function getProjects(): Promise<Project[]> {
  const response = await datocmsRequest<GetProjectsResponse>(`
    query {
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

  return response.allProjects.map(project => ({
    id: project.id,
    title: project.name,
    description: project.description,
    technologies: project.tags.map(tag => tag.name),
    image: {
      src: project.image.responsiveImage.src,
      alt: project.name
    },
    links: {
      demo: project.link,
      repository: undefined
    },
    createdAt: createDate(),
    updatedAt: createDate()
  }));
}

export async function getProjectById(id: string): Promise<Project | null> {
  const response = await datocmsRequest<GetProjectByIdResponse>(`
    query {
      project(filter: {id: {eq: "${id}"}}) {
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

  if (!response.project) {
    return null;
  }

  return {
    id: response.project.id,
    title: response.project.name,
    description: response.project.description,
    technologies: response.project.tags.map(tag => tag.name),
    image: {
      src: response.project.image.responsiveImage.src,
      alt: response.project.name
    },
    links: {
      demo: response.project.link,
      repository: undefined
    },
    createdAt: createDate(),
    updatedAt: createDate()
  };
}
