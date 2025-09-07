export interface ProfessionalExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface ProfessionalExperienceSection {
  title: string;
  experiences: ProfessionalExperience[];
}
