import PhotoGallery from "@/components/PhotoGallery";
import { photos } from "@/data/photos";
import { themes } from "@/data/themes";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type ThemePageProps = {
    params: Promise<{ slug: string }>;
}

async function ThemeContent({ params }: ThemePageProps) {
    const { slug } = await params;

    const theme = themes.find((theme) => theme.slug === slug);

    if (!theme) {
        notFound();
    }

    const themePhotos = photos.filter((photo) => photo.theme === slug);


    return (<main> <h1>{theme.label}</h1>
        <PhotoGallery photos={themePhotos} /> </main>
    );
}

export default function ThemePage({
    params
}: ThemePageProps) {
    return (
        <Suspense fallback={<p>Chargement de la galerie...</p>}>
            <ThemeContent params={params} />
        </Suspense>
    );
}
