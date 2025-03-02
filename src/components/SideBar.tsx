import { FiFolder, FiGithub, FiLinkedin, FiMail, FiUser } from "react-icons/fi";

import IconButton, { IconSize } from "@/components/IconButton";

const sections = [
    { icon: FiUser, label: "About me", href: "/" },
    { icon: FiFolder, label: "Projects", href: "/projects" },
    { icon: FiMail, label: "Contact me", href: "/" },
];

const socialNetworks = [
    { icon: FiGithub, label: "Github", link: "https://github.com/RuanFailache" },
    { icon: FiLinkedin, label: "Linkedin", link: "https://www.linkedin.com/in/ruanfailache/" },
];

export default function SideBar() {
    return (
        <aside className="flex flex-col justify-between p-2 bg-surface">
            <nav>
                <ul className="flex flex-col gap-2">
                    {sections.map((section) => (
                        <IconButton.InternalLink
                            key={section.label}
                            label={section.label}
                            icon={section.icon}
                            href={section.href}
                        />
                    ))}
                </ul>
            </nav>
            <nav>
                <ul className="flex flex-col gap-2">
                    {socialNetworks.map((socialNetwork) => (
                        <IconButton.ExternalLink
                            key={socialNetwork.label}
                            label={socialNetwork.label}
                            href={socialNetwork.link}
                            icon={socialNetwork.icon}
                            size={IconSize.SM}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
