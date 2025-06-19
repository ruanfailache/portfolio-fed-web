import { Metadata } from "next";

import { getHomeQuery } from "@/graphql/queries/home";

import { HomeBannerContent } from "./(components)/HomeBannerContent";
import { HomeBannerImage } from "./(components)/HomeBannerImage";

export const metadata: Metadata = {
    title: "Ruan Failache - Home",
};

export default async function Home() {
    const { profile } = await getHomeQuery();

    return (
        <div className="flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-stretch gap-8">
            <HomeBannerImage profileImageSrc={profile.image.responsiveImage.src} />
            <HomeBannerContent />
        </div>
    );
}
