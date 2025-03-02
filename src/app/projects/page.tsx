import { Metadata } from "next";
import Image from "next/image";
import { FiEye } from "react-icons/fi";

import { getProjectsQuery } from "@/graphql/queries/projects";

import Card from "@/components/Card";
import Tag from "@/components/Tag";

export const metadata: Metadata = {
    title: "Ruan Failache - Projects",
};

export default async function Projects() {
    const { allProjects } = await getProjectsQuery();

    return (
        <>
            <header className="p-4">
                <h1 className="text-2xl font-semibold text-white">My projects</h1>
            </header>

            <main className="flex flex-col justify-start gap-6 p-6 max-w-full">
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
