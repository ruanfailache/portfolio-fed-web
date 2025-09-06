import Image from "next/image";
import { FiEye } from "react-icons/fi";

import Card from "@/ui/molecules/Card";
import Tag from "@/ui/atoms/Tag";
import { Project } from "@core/models/Project";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card>
            <Card.HeaderImage>
                <Image src={project.image.src} alt={project.title} fill />
            </Card.HeaderImage>

            <Card.Content>
                <strong className="text-lg font-semibold">{project.title}</strong>

                <p className="text-sm font-light">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                        <Tag key={technology}>{technology}</Tag>
                    ))}
                </div>
            </Card.Content>

            <Card.ExternalAction href={project.links.demo || project.links.repository || '#'}>
                <FiEye size={20} />
                <span>Preview</span>
            </Card.ExternalAction>
        </Card>
    );
}
