import { Suspense } from "react";
import PhotoGallery from "@/components/PhotoGallery";
import { getHomePhotos } from "@/lib/contentful";
import { Metadata } from "next";
import HomeEntrance from "@/components/HomeEntrance";
import GallerySkeleton from "@/components/GallerySkeleton";

export const metadata: Metadata = {
  title: "Photographies et regards sur le monde",
};

async function GalleryContent() {
  const photos = await getHomePhotos();

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
          fallback={<GallerySkeleton />}
        >
          <GalleryContent />
        </Suspense>
      </section>
    </main>
  );
}