import { IconSize } from "@/ui/atoms/IconButton";
import Image from "next/image";
import { FaCode } from "react-icons/fa6";

interface HomeBannerImageProps {
    profileImageSrc: string;
}

export function HomeBannerImage(props: HomeBannerImageProps) {
    return (
        <div className="flex-1 place-items-center">
            <div className="relative">
                <div className="relative w-48 h-48 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                    <Image className="object-cover" src={props.profileImageSrc} alt="Myself" fill />
                </div>
                <div className="absolute bottom-1 right-1 lg:bottom-8 lg:right-8 bg-primary p-2 rounded-full">
                    <FaCode size={IconSize.XL} color="black" />
                </div>
            </div>
        </div>
    );
}
