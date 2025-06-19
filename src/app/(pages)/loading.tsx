export default function Loading() {
    return (
        <div className="flex-1 h-full grid place-items-center">
            <div className="relative w-28 h-28 animate-spin">
                {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 360) / 12;
                    const radius = 40;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);
                    const colorClass = i < 8 ? "bg-primary" : "bg-surface";

                    return (
                        <span
                            key={i}
                            className={`absolute w-3 h-3 rounded-full ${colorClass}`}
                            style={{
                                top: `calc(50% + ${y}px - 0.375rem)`,
                                left: `calc(50% + ${x}px - 0.375rem)`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
