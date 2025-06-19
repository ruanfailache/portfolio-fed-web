import { IconSize } from "@/components/IconButton";
import { HomeCurriculumQuery, HomePageQuery } from "@/graphql/interfaces/HomePageQuery";
import { FaAngular, FaJava, FaNodeJs, FaReact } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import HomeDownloadCurriculumButton from "./HomeDownloadCurriculumButton";

const content = {
    banner: {
        title: "👋 Hi there, I'm Ruan.",
        description: "Senior Full Stack Developer",
        body: `With expertise in building web applications, mobile applications, and APIs. I'm always looking for new challenges and opportunities to learn and grow. I'm currently working as a software engineer at CI&T and offer services as a consultant and developer.`,
        experience: `+3 years of experience developing software.`,
    },
};

const mainSkills = [
    { name: "Java", icon: FaJava },
    { name: "Angular", icon: FaAngular },
    { name: "React", icon: FaReact },
    { name: "Node", icon: FaNodeJs },
];

interface HomeBannerContentProps {
    curriculum: HomeCurriculumQuery;
}

export function HomeBannerContent({ curriculum }: HomeBannerContentProps) {
    return (
        <div className="flex-1 text-white">
            <strong className="block mb-2">{content.banner.title}</strong>
            <h1 className="text-primary">{content.banner.description}</h1>
            <p className="block my-4">{content.banner.body}</p>
            <HomeDownloadCurriculumButton curriculum={curriculum} />
            <div className="flex flex-col gap-4 mt-8">
                <strong>{content.banner.experience}</strong>
                <ul className="flex items-end gap-4">
                    {mainSkills.map((skill) => (
                        <li key={skill.name} className="flex items-center gap-2 p-2 border border-button rounded">
                            <skill.icon size={IconSize.LG} />
                        </li>
                    ))}
                    <li className="text-button">...and more</li>
                </ul>
            </div>
        </div>
    );
}
