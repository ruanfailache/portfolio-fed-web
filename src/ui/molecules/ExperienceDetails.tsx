import { ProfessionalExperience } from "@core/models/ProfessionalExperience";
import Tag from "@ui/atoms/Tag";

interface ExperienceDetailsProps {
  experience: ProfessionalExperience;
}

export function ExperienceDetails({ experience }: ExperienceDetailsProps) {
  return (
    <div className="h-full bg-theme-surface rounded-xl p-6 flex flex-col">
      <div className="mb-6">
        <h2 className="text-theme-primary text-2xl font-bold mb-2">{experience.company}</h2>
        <h3 className="text-primary text-lg font-semibold mb-2">{experience.position}</h3>
        <p className="text-theme-secondary text-sm">{experience.period}</p>
      </div>
      
      <div className="flex-1 mb-6">
        <p className="text-theme-primary leading-relaxed">{experience.description}</p>
      </div>
      
      <div className="mt-auto">
        <h4 className="text-theme-primary text-sm font-semibold mb-3">Tecnologias utilizadas:</h4>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
