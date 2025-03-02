import Link from "next/link";
import { IconType } from "react-icons";

export enum IconSize {
    XS = 12,
    SM = 16,
    MD = 20,
    LG = 24,
    XL = 32,
}

const DEFAULT_ICON_SIZE = IconSize.MD;

interface BaseProps {
    label: string;
    icon: IconType;
    size?: IconSize;
}

interface IconLinkProps extends BaseProps {
    href: string;
}

function ExternalLink(props: IconLinkProps) {
    return (
        <Link
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={props.label}
            className="box-border p-2 cursor-pointer transition duration-300 rounded bg-button text-white hover:bg-primary hover:text-black">
            <props.icon size={props.size ?? DEFAULT_ICON_SIZE} aria-hidden="true" color="currentColor" />
        </Link>
    );
}

function InternalLink(props: IconLinkProps) {
    return (
        <Link
            href={props.href}
            aria-label={props.label}
            className="box-border p-2 cursor-pointer transition duration-300 rounded bg-button text-white hover:bg-primary hover:text-black">
            <props.icon size={props.size ?? DEFAULT_ICON_SIZE} aria-hidden="true" color="currentColor" />
        </Link>
    );
}

const IconButton = {
    ExternalLink,
    InternalLink,
};

export default IconButton;
