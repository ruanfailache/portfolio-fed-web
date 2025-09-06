import { useCurriculumDownload } from "@core/hooks/useCurriculumDownload";
import { Curriculum } from "@core/models/Profile";
import { FiDownload } from "react-icons/fi";

interface HomeDownloadCurriculumButtonProps {
    curriculum: Curriculum;
}

export default function HomeDownloadCurriculumButton({ curriculum }: HomeDownloadCurriculumButtonProps) {
    const { downloadUrl } = useCurriculumDownload(curriculum);
    
    return (
        <a className="button" href={downloadUrl} rel="noopener noreferrer">
            Download my CV
            <FiDownload aria-hidden="true" />
        </a>
    );
}
