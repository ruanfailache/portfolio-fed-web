import { HomeBannerSection } from "@/ui/organisms/HomeBannerSection";
import { ProfessionalExperienceSection } from "@/ui/organisms/ProfessionalExperienceSection";

export default function HomeScreen() {
    return (
        <div className="container m-auto p-4 lg:py-8 space-y-8 lg:space-y-16">
            <HomeBannerSection />
            <ProfessionalExperienceSection />
        </div>
    );
}
