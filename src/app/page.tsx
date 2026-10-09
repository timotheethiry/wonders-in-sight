import PhotoGallery from "@/components/PhotoGallery";
import { photos } from "@/data/photos";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <section id="galerie" aria-label="Sélection de photographies" className="px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
        <PhotoGallery photos={photos} />
      </section>

    </main>
  );
}