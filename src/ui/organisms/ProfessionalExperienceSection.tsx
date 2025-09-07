"use client";

import { useState, useRef } from "react";
import { useProfessionalExperience } from "@core/hooks/useProfessionalExperience";
import { Accordion } from "@ui/molecules/Accordion";
import { ExperienceDetails } from "@ui/molecules/ExperienceDetails";

export function ProfessionalExperienceSection() {
    const { experiences } = useProfessionalExperience();
    const [selectedExperienceId, setSelectedExperienceId] = useState(experiences[0]?.id || "");
    const experienceDetailsRef = useRef<HTMLDivElement>(null);

    const selectedExperience = experiences.find(exp => exp.id === selectedExperienceId);

    if (!selectedExperience) {
        return null;
    }

    const accordionItems = experiences.map(experience => ({
        id: experience.id,
        title: experience.company,
        subtitle: experience.position,
        description: experience.period
    }));

    const handleExperienceSelect = (experienceId: string) => {
        setSelectedExperienceId(experienceId);
        
        if (window.innerWidth < 1024 && experienceDetailsRef.current) {
            setTimeout(() => {
                experienceDetailsRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    };

    return (
        <section>
            <div className="mb-4">
                <h2 className="text-theme-primary text-3xl font-bold mb-2">Trajetória Profissional</h2>
                <p className="text-theme-secondary">Conheça minha jornada e experiências no desenvolvimento</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
                <div className="flex-shrink-0">
                    <Accordion
                        title="Experiências"
                        items={accordionItems}
                        selectedItemId={selectedExperienceId}
                        onItemSelect={handleExperienceSelect}
                    />
                </div>
                <div ref={experienceDetailsRef} className="flex-1 min-w-0">
                    <ExperienceDetails experience={selectedExperience} />
                </div>
            </div>
        </section>
    );
}
