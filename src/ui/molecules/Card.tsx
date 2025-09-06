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

interface InternalActionProps {
    href: string;
}

Card.InternalAction = function CardInternalAction({ children, href }: PropsWithChildren<InternalActionProps>) {
    return (
        <Link href={href} className="button__flat p-6 border-t border-button">
            {children}
        </Link>
    );
};

interface ExternalActionProps {
    href: string;
}

Card.ExternalAction = function CardExternalAction({ children, href }: PropsWithChildren<ExternalActionProps>) {
    return (
        <Link 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="button__flat p-6 border-t border-button"
        >
            {children}
        </Link>
    );
};
