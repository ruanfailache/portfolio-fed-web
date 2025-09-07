import { getProfile } from "@entrypoint/cms/profile";
import { HomeBannerContent } from "@/ui/molecules/HomeBannerContent";
import { HomeBannerImage } from "@/ui/molecules/HomeBannerImage";

export async function HomeBannerSection() {
    const profile = await getProfile();

    return (
        <section className="flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-stretch gap-8">
            <HomeBannerImage profileImageSrc={profile.image.src} />
            <HomeBannerContent 
                curriculum={profile.curriculum}
                title={profile.banner.title}
                description={profile.banner.description}
                body={profile.banner.body}
                experience={profile.banner.experience}
            />
        </section>
    );
}
