import { PropsWithChildren } from "react";
import SideBar from "@/ui/organisms/SideBar";

export default function BaseLayout({ children }: PropsWithChildren) {
    return (
        <div className="overflow-x-hidden flex flex-col lg:flex-row h-screen">
            <SideBar />
            <main className="flex-1 h-screen w-full overflow-x-hidden overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
