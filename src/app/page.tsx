import { getHomeQuery } from "@/graphql/queries/home";
import RouterLink from "../components/router-link";
import Image from "next/image";

export default async function Home() {
    const { profile, allSocialNetworks } = await getHomeQuery();

    return (
        <main className="h-full p-6 grid place-items-center">
            <div className="w-full sm:w-fit bg-surface p-10 rounded-xl">
                <div className="flex flex-col gap-6 items-center">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden">
                        <Image className="object-cover" src={profile.image.responsiveImage.src} alt="Myself" fill />
                    </div>

                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-white">{profile.title}</h1>
                        <span className="text-sm font-medium text-primary">{profile.location}</span>
                    </div>

                    <p className="text-sm text-white">{profile.about}</p>

                    <div className="w-full sm:w-[300px] flex flex-col gap-4">
                        <RouterLink link="projects" text="My projects" />
                        {allSocialNetworks.map((socialNetwork) => (
                            <RouterLink
                                key={socialNetwork.description}
                                link={socialNetwork.link}
                                text={socialNetwork.description}
                                isExternalLink
                            />
                        ))}
                        <RouterLink link="blog" text="Blog" />
                    </div>
                </div>
            </div>
        </main>
    );
}
