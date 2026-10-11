import PhotoGallery from "@/components/PhotoGallery";
import { getContentfulPhotos } from "@/lib/contentful";
import { themes } from "@/data/themes";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";

type ThemePageProps = {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: ThemePageProps): Promise<Metadata> {
    const { slug } = await params;
    const theme = themes.find((theme) => theme.slug === slug);

    if (!theme) {
        notFound();
    }

    return {
        title: `Photographies : ${theme.label.toLowerCase()}`,
        description: theme.description,
        openGraph: {
            title: `Photographies : ${theme.label.toLowerCase()}`,
            description: theme.description,
        },
    };
}

async function ThemeContent({ params }: ThemePageProps) {
    const photos = await getContentfulPhotos();
    const { slug } = await params;

    const theme = themes.find((theme) => theme.slug === slug);

    if (!theme) {
        notFound();
    }

    const themePhotos = photos.filter((photo) => photo.theme === slug);


    return (<main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <section className="mb-10 max-w-2xl sm:mb-14">
            <h1 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl lg:text-6xl">{theme.label}</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                {theme.description}
            </p>
        </section>
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
