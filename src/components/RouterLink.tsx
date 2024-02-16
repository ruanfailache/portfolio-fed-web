import Link from "next/link";

interface ComponentProps {
    link: string;
    text: string;
    isExternalLink?: boolean;
}

export default function RouterLink({ link, text, isExternalLink }: ComponentProps) {
    return (
        <Link
            href={link}
            passHref={isExternalLink}
            className="flex items-center justify-center gap-4 transition duration-300 bg-button hover:bg-primary text-white hover:text-on-primary p-3 rounded-lg cursor-pointer">
            <span className="text-sm font-semibold">{text}</span>
        </Link>
    );
}
