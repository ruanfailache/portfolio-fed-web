import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
    return <div className="bg-surface rounded-xl w-full sm:w-[360px] overflow-hidden">{children}</div>;
}

Card.HeaderImage = function CardHeaderImage({ children }: PropsWithChildren) {
    return <header className="relative object-cover w-full h-48">{children}</header>;
};

Card.Content = function CardContent({ children }: PropsWithChildren) {
    return <div className="flex flex-col gap-2 p-6 text-white">{children}</div>;
};

interface ActionProps {
    link: string;
    isExternalLink?: boolean;
}

Card.Action = function CardActions({ children, link, isExternalLink }: PropsWithChildren<ActionProps>) {
    return (
        <Link href={link} passHref={isExternalLink} className="button__flat p-6 border-t border-button">
            {children}
        </Link>
    );
};
