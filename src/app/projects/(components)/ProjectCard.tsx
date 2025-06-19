import Image from "next/image";
import { FiEye } from "react-icons/fi";

import Card from "@/components/Card";
import Tag from "@/components/Tag";
import { ProjectCardQuery } from "@/graphql/interfaces/ProjectPageQuery";

interface ProjectCardProps {
    project: ProjectCardQuery;
}

export default async function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card>
            <Card.HeaderImage>
                <Image src={project.image.responsiveImage.src} alt={project.name} fill />
            </Card.HeaderImage>

            <Card.Content>
                <strong className="text-lg font-semibold">{project.name}</strong>

                <p className="text-sm font-light">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <Tag key={tag.id}>{tag.name}</Tag>
                    ))}
                </div>
            </Card.Content>

            <Card.Action link={project.link}>
                <FiEye size={20} />
                <span>Preview</span>
            </Card.Action>
        </Card>
    );
}
