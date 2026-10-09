
const themes = [
  "Tout",
  "Paysages",
  "Architecture",
  "Voyages",
  "Noir et blanc",
];

const photos = [
  {
    id: 1,
    title: "Lumière du matin",
    theme: "Paysages",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    alt: "Montagnes reflétées dans un lac au lever du jour",
  },
  {
    id: 2,
    title: "Lignes urbaines",
    theme: "Architecture",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    alt: "Architecture contemporaine aux lignes épurées",
  },
  {
    id: 3,
    title: "Horizon lointain",
    theme: "Voyages",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    alt: "Crêtes montagneuses sous un ciel lumineux",
  },
  {
    id: 4,
    title: "Silence",
    theme: "Noir et blanc",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
    alt: "Vagues de l'océan",
  },
  {
    id: 5,
    title: "Reflets",
    theme: "Paysages",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    alt: "Cerfs dans un paysage naturel",
  },
    {
    id: 6,
    title: "Ailleurs",
    theme: "Voyages",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    alt: "Paysage naturel baigné de lumière",
  },
  {
    id: 7,
    title: "Perspective",
    theme: "Architecture",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
    alt: "Bâtiment contemporain photographié en contre-plongée",
  },
  {
    id: 8,
    title: "Matière",
    theme: "Noir et blanc",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
    alt: "Ciel nocturne et paysage sombre",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-8 lg:px-12">
        <a href="/" className="font-serif text-2xl tracking-tight"
          aria-label="Accueil de la galerie">
          Wonders In Sight<span className="text-muted">.</span>
        </a>

        <nav aria-label="Navigation principale" className="flex items-center gap-5 text-sm text-muted sm:gap-8">
          <a href="#galerie" className="transition-colors hover:text-foreground">Photographies</a>
          <a href="#a-propos" className="transition-colors hover:text-foreground">À propos</a>
        </nav>
      </header>

      
        <nav aria-label="Thèmes photographiques"  className="flex gap-6 overflow-x-auto border-b border-border px-5 py-4 text-sm whitespace-nowrap sm:px-8 lg:px-12">
          {themes.map((theme, index) => (
            <a
              key={theme}
              href={
                theme === "Tout"
                  ? "#galerie"
                  : `#theme-${theme.toLowerCase().replaceAll(" ", "-")}`
              }
               aria-current={index === 0 ? "page" : undefined}
            className={
              index === 0
                ? "shrink-0 text-foreground"
                : "shrink-0 text-muted transition-colors hover:text-foreground"
            }
            >
              {theme}
            </a>
          ))}
        </nav>

        <section id="galerie" aria-label="Sélection de photographies" className="px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
          <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 lg:gap-5">
            {photos.map((photo) => (
              <article key={photo.id} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5">
                 <img
                src={photo.image}
                alt={photo.alt}
                loading={photo.id <= 4 ? "eager" : "lazy"}
                className="block h-auto w-full"
              />
                {/* <div className="flex items-baseline justify-between gap-2 py-2">
                  
                <h2 className="text-sm">{photo.title}</h2>
                <span className="text-xs text-muted">{photo.theme}</span>
                </div> */}
              </article>
            ))}
          </div>
        </section>


      <footer id="a-propos" className="mt-8 border-t border-border px-5 py-8 text-sm text-muted sm:px-8 lg:px-12">
        <p>Une collection personnelle de photographies.</p>
      </footer>
    </main>
  );
}