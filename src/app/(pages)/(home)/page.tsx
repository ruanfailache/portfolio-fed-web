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
        <main className="flex-1 h-full w-full overflow-x-hidden">
            <div className="container m-auto p-4 lg:py-8 flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-stretch gap-8">
                <HomeBannerImage profileImageSrc={profile.image.responsiveImage.src} />
                <HomeBannerContent curriculum={profile.curriculum} />
            </div>
        </main>
    );
}
