import { getProfile } from "@entrypoint/cms/profile";

import { HomeBannerContent } from "@/ui/molecules/HomeBannerContent";
import { HomeBannerImage } from "@/ui/molecules/HomeBannerImage";

export default async function HomeScreen() {
    const profile = await getProfile();

    return (
        <div className="container m-auto p-4 lg:py-8 flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-stretch gap-8">
            <HomeBannerImage profileImageSrc={profile.image.src} />
            <HomeBannerContent 
                curriculum={profile.curriculum}
                title={profile.banner.title}
                description={profile.banner.description}
                body={profile.banner.body}
                experience={profile.banner.experience}
            />
        </div>
    );
}
