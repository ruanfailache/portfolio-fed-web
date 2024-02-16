"use client";

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function GoBackButton() {
    const router = useRouter();
    return (
        <button onClick={router.back} className="w-fit flex items-center gap-2 text-sm text-primary hover:underline">
            <FiChevronLeft size={20} />
            <span>Go back</span>
        </button>
    );
}
