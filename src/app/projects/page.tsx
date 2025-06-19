import { Metadata } from "next";

import { getProjectsQuery } from "@/graphql/queries/projects";

import ProjectCard from "./(components)/ProjectCard";

export const metadata: Metadata = {
    title: "Ruan Failache - Projects",
};

export default async function Projects() {
    const { allProjects } = await getProjectsQuery();

    return (
        <main className="flex-1 h-full w-full overflow-x-hidden">
            <div className="container m-auto p-4 lg:py-8 flex flex-col gap-4">
                <header>
                    <h1 className="text-2xl font-semibold text-white">My projects</h1>
                </header>

                <section className="flex flex-col justify-start gap-6 max-w-full">
                    <div className="flex flex-wrap gap-6">
                        {allProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
