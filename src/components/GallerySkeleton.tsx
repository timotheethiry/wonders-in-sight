export default function GallerySkeleton() {
    return (
        <div
            aria-label="Chargement des photographies"
            role="status"
            className="mx-auto grid max-w-9/10 grid-cols-2 gap-3 md:max-w-5/6 md:grid-cols-3 md:gap-4 lg:max-w-6/7 lg:grid-cols-4 lg:gap-5"
        >
            {[0, 1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="animate-pulse bg-border/50 aspect-square"
                />
            ))}
        </div>
    );
}