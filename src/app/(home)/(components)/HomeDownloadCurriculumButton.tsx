import { HomeCurriculumQuery } from "@/graphql/interfaces/HomePageQuery";
import { FiDownload } from "react-icons/fi";

interface HomeDownloadCurriculumButtonProps {
    curriculum: HomeCurriculumQuery;
}

export default function HomeDownloadCurriculumButton({ curriculum }: HomeDownloadCurriculumButtonProps) {
    const curriculumPath = `/api/download-pdf?url=${encodeURIComponent(curriculum.url)}&filename=${encodeURIComponent(curriculum.filename)}`;
    return (
        <a className="button" href={curriculumPath} rel="noopener noreferrer">
            Download my CV
            <FiDownload aria-hidden="true" />
        </a>
    );
}
