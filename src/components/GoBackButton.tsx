"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export default function GoBackButton({ children }: PropsWithChildren) {
    const router = useRouter();
    return (
        <button onClick={router.back} className="w-fit flex items-center gap-2 text-sm text-primary hover:underline">
            {children}
        </button>
    );
}
