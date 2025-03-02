import { Metadata } from "next";
import Image from "next/image";
import { FaAngular, FaJava, FaNodeJs, FaReact } from "react-icons/fa";
import { FaCode } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";

import { getHomeQuery } from "@/graphql/queries/home";

import { IconSize } from "@/components/IconButton";

export const metadata: Metadata = {
    title: "Ruan Failache - Home",
};

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

export default async function Home() {
    const { profile } = await getHomeQuery();

    return (
        <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-stretch gap-8">
                <HomeBannerImage profileImageSrc={profile.image.responsiveImage.src} />
                <HomeBannerContent />
            </div>
        </div>
    );
}

function HomeBannerContent() {
    return (
        <div className="flex-1 text-white">
            <strong className="block mb-2">{content.banner.title}</strong>
            <h1 className="text-primary">{content.banner.description}</h1>
            <p className="block my-4">{content.banner.body}</p>
            <button className="button">
                Download my CV
                <FiDownload />
            </button>
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

interface HomeBannerImageProps {
    profileImageSrc: string;
}

function HomeBannerImage(props: HomeBannerImageProps) {
    return (
        <div className="flex-1 place-items-center">
            <div className="relative">
                <div className="relative w-48 h-48 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                    <Image className="object-cover" src={props.profileImageSrc} alt="Myself" fill />
                </div>
                <div className="absolute bottom-1 right-1 lg:bottom-8 lg:right-8 bg-primary p-2 rounded-full">
                    <FaCode size={IconSize.XL} color="black" />
                </div>
            </div>
        </div>
    );
}
