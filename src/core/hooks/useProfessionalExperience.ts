import { ProfessionalExperience } from "@core/models/ProfessionalExperience";

export function useProfessionalExperience() {
  const experiences: ProfessionalExperience[] = [
    {
      id: "1",
      company: "Empresa A",
      position: "Desenvolvedor Frontend Senior",
      period: "2022 - Presente",
      description: "Responsável pelo desenvolvimento e manutenção de aplicações web modernas utilizando React, TypeScript e Next.js. Liderança técnica de equipe de 5 desenvolvedores e implementação de boas práticas de desenvolvimento.",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Jest", "Storybook"]
    },
    {
      id: "2", 
      company: "Empresa B",
      position: "Desenvolvedor Full Stack",
      period: "2020 - 2022",
      description: "Desenvolvimento de aplicações web completas, desde o frontend até o backend. Trabalho com tecnologias como Angular, Node.js, MongoDB e implementação de APIs REST.",
      technologies: ["Angular", "Node.js", "MongoDB", "Express", "TypeScript", "Docker"]
    },
    {
      id: "3",
      company: "Empresa C", 
      position: "Desenvolvedor Frontend",
      period: "2018 - 2020",
      description: "Desenvolvimento de interfaces de usuário responsivas e interativas. Foco em experiência do usuário e performance, trabalhando com React e integração com APIs.",
      technologies: ["React", "JavaScript", "CSS3", "HTML5", "Redux", "Webpack"]
    },
    {
      id: "4",
      company: "Empresa D",
      position: "Desenvolvedor Full Stack",
      period: "2016 - 2018",
      description: "Desenvolvimento de aplicações web completas, desde o frontend até o backend. Trabalho com tecnologias como Angular, Node.js, MongoDB e implementação de APIs REST.",
      technologies: ["Angular", "Node.js", "MongoDB", "Express", "TypeScript", "Docker"]
    },
    {
      id: "5",
      company: "Empresa E",
      position: "Desenvolvedor Full Stack",
      period: "2014 - 2016",
      description: "Desenvolvimento de aplicações web completas, desde o frontend até o backend. Trabalho com tecnologias como Angular, Node.js, MongoDB e implementação de APIs REST.",
      technologies: ["Angular", "Node.js", "MongoDB", "Express", "TypeScript", "Docker"]
    },
    {
      id: "6",
      company: "Empresa F",
      position: "Desenvolvedor Full Stack",
      period: "2012 - 2014",
      description: "Desenvolvimento de aplicações web completas, desde o frontend até o backend. Trabalho com tecnologias como Angular, Node.js, MongoDB e implementação de APIs REST.",
      technologies: ["Angular", "Node.js", "MongoDB", "Express", "TypeScript", "Docker"]
    }
  ];

  return {
    experiences
  };
}
