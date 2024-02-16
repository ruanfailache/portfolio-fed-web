import { PropsWithChildren } from "react";

export default function Tag({ children }: PropsWithChildren) {
    return (
        <div className="w-fit h-fit bg-button py-1 px-2 rounded-xl">
            <span className="text-xs font-medium text-white leading-none">{children}</span>
        </div>
    );
}
