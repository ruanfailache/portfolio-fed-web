import { FaAngular, FaJava, FaNodeJs, FaReact } from "react-icons/fa";

export function useSkills() {
  const mainSkills = [
    { name: "Java", icon: FaJava },
    { name: "Angular", icon: FaAngular },
    { name: "React", icon: FaReact },
    { name: "Node", icon: FaNodeJs },
  ];

  return {
    mainSkills
  };
}
