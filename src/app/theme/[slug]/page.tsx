import PhotoGallery from "@/components/PhotoGallery";
import { getContentfulPhotos } from "@/lib/contentful";
import { themes } from "@/data/themes";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";
import GallerySkeleton from "@/components/GallerySkeleton";

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

async function ThemeGallery({ slug }: { slug: string }) {
    const photos = await getContentfulPhotos();
    const themePhotos = photos.filter((photo) => photo.theme === slug);

    return <PhotoGallery photos={themePhotos} />;
}

async function ThemeContent({ params }: ThemePageProps) {
    const { slug } = await params;
    const theme = themes.find((theme) => theme.slug === slug);

    if (!theme) {
        notFound();
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
            <section className="page-enter mb-10 max-w-2xl sm:mb-14">
                <h1 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    {theme.label}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                    {theme.description}
                </p>
            </section>
            <Suspense fallback={<GallerySkeleton />}>
                <ThemeGallery slug={slug} />
            </Suspense>
        </main>
    );
}

export default function ThemePage({
    params
}: ThemePageProps) {
    return (
        <Suspense
            fallback={
                <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
                    <section className="mb-10 max-w-2xl sm:mb-14">
                        <div className="h-10 w-2/3 animate-pulse bg-border/50 sm:h-14" />
                        <div className="mt-5 h-5 w-full max-w-xl animate-pulse bg-border/50" />
                        <div className="mt-2 h-5 w-4/5 max-w-lg animate-pulse bg-border/50" />
                    </section>

                    <GallerySkeleton />
                </main>
            }
        >
            <ThemeContent params={params} />
        </Suspense>
    );
}
