import { getProjects } from "@entrypoint/cms/projects";

import ProjectCard from "@/ui/molecules/ProjectCard";

export default async function ProjectsScreen() {
    const projects = await getProjects();

    return (
        <div className="container m-auto p-4 lg:py-8 flex flex-col gap-4">
            <header>
                <h1 className="text-2xl font-semibold text-white">My projects</h1>
            </header>

            <section className="flex flex-col justify-start gap-6 max-w-full">
                <div className="flex flex-wrap gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>
        </div>
    );
}
