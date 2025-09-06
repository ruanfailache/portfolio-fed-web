import { Metadata } from "next";
import ProjectsScreen from "@/ui/screens/ProjectsScreen";

export const metadata: Metadata = {
    title: "Ruan Failache - Projects",
};

export default function Projects() {
    return <ProjectsScreen />;
}