import PhotoGallery from "@/components/PhotoGallery";

const photos = [
  {
    id: 1,
    title: "Lumière du matin",
    theme: "Paysages",
    lieu: "lieu",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    alt: "Montagnes reflétées dans un lac au lever du jour",
  },
  {
    id: 2,
    title: "Lignes urbaines",
    theme: "Architecture",
    lieu: "lieu",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    alt: "Architecture contemporaine aux lignes épurées",
  },
  {
    id: 3,
    title: "Horizon lointain",
    theme: "Voyages",
    lieu: "lieu",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    alt: "Crêtes montagneuses sous un ciel lumineux",
  },
  {
    id: 4,
    title: "Silence",
    theme: "Noir et blanc",
    lieu: "lieu",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
    alt: "Vagues de l'océan",
  },
  {
    id: 5,
    title: "Reflets",
    theme: "Paysages",
    lieu: "lieu",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    alt: "Cerfs dans un paysage naturel",
  },
  {
    id: 6,
    title: "Ailleurs",
    theme: "Voyages",
    lieu: "lieu",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    alt: "Paysage naturel baigné de lumière",
  },
  {
    id: 7,
    title: "Perspective",
    theme: "Architecture",
    lieu: "lieu",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
    alt: "Bâtiment contemporain photographié en contre-plongée",
  },
  {
    id: 8,
    title: "Matière",
    theme: "Noir et blanc",
    lieu: "lieu",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
    alt: "Ciel nocturne et paysage sombre",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <section id="galerie" aria-label="Sélection de photographies" className="px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
        <PhotoGallery photos={photos} />
      </section>

    </main>
  );
}