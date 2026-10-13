import { Suspense } from "react";
import PhotoGallery from "@/components/PhotoGallery";
import { getContentfulPhotos } from "@/lib/contentful";
import { Metadata } from "next";
import HomeEntrance from "@/components/HomeEntrance";

export const metadata: Metadata = {
  title: "Photographies et regards sur le monde",
};

async function GalleryContent() {
  const photos = await getContentfulPhotos();

  return <HomeEntrance>
    <PhotoGallery photos={photos} />
  </HomeEntrance>
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section
        id="galerie"
        aria-label="Sélection de photographies"
        className="px-3 py-5 sm:px-5 sm:py-7 lg:px-8"
      >
        <Suspense
          fallback={
            <p className="text-sm text-muted">
              Chargement des photographies…
            </p>
          }
        >
          <GalleryContent />
        </Suspense>
      </section>
    </main>
  );
}