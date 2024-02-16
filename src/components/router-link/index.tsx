import Link from "next/link";
import styles from "./router-link.module.css";

interface ComponentProps {
    link: string;
    text: string;
    isExternalLink?: boolean;
}

export default function RouterLink({ link, text, isExternalLink }: ComponentProps) {
    return (
        <Link className={styles.button} href={link} passHref={isExternalLink}>
            {text}
        </Link>
    );
}
