import { IconSize } from "@/ui/atoms/IconButton";
import { Curriculum } from "@core/models/Profile";
import { useSkills } from "@core/hooks/useSkills";
import HomeDownloadCurriculumButton from "./HomeDownloadCurriculumButton";

interface HomeBannerContentProps {
    curriculum: Curriculum;
    title: string;
    description: string;
    body: string;
    experience: string;
}

export function HomeBannerContent({ 
    curriculum, 
    title, 
    description, 
    body, 
    experience 
}: HomeBannerContentProps) {
    const { mainSkills } = useSkills();
    
    return (
        <div className="flex-1 text-theme-primary">
            <strong className="block mb-2">{title}</strong>
            <h1 className="text-primary">{description}</h1>
            <p className="block my-4">{body}</p>
            <HomeDownloadCurriculumButton curriculum={curriculum} />
            <div className="flex flex-col gap-4 mt-8">
                <strong>{experience}</strong>
                <ul className="flex items-end gap-4">
                    {mainSkills.map((skill) => (
                        <li key={skill.name} className="flex items-center gap-2 p-2 border border-theme rounded">
                            <skill.icon size={IconSize.LG} />
                        </li>
                    ))}
                    <li className="text-theme-secondary">...and more</li>
                </ul>
            </div>
        </div>
    );
}
