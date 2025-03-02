"use client";

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function GoBackButton() {
    const router = useRouter();
    return (
        <button onClick={router.back} className="button__flat w-fit">
            <FiChevronLeft size={20} />
            <span>Go back</span>
        </button>
    );
}
