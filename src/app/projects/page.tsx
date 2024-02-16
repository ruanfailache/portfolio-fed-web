import Image from "next/image";
import { FiEye } from "react-icons/fi";

import { getProjectsQuery } from "@/graphql/queries/projects";

import Card from "@/components/Card";
import GoBackButton from "@/components/GoBackButton";
import Tag from "@/components/Tag";

export default async function Projects() {
    const { profile, allProjects } = await getProjectsQuery();

    return (
        <>
            <header className="bg-surface p-6">
                <h1 className="text-2xl font-semibold text-white">{profile.title}</h1>
                <span className="text-sm font-medium text-primary">My projects</span>
            </header>

            <main className="flex flex-col justify-start gap-6 p-6 max-w-full">
                <GoBackButton />

                <div className="flex flex-wrap gap-6">
                    {allProjects.map((project) => (
                        <Card key={project.id}>
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
                    ))}
                </div>
            </main>
        </>
    );
}
