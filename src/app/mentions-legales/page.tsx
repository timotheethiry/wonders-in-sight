export default function MentionsLegalesPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12 text-muted">
            <h1 className="font-serif text-3xl my-8 tracking-tight text-foreground">Mentions Légales</h1>

            <h2 className="my-4 text-xl text-foreground">1. Éditeur du site</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Le présent site est une galerie photographique personnelle éditée par un indépendant (micro-entrepreneur).<br />
                <strong>Nom / Enseigne :</strong> Timothée Thiry<br />
                <strong>Statut :</strong> Micro-entreprise<br />
                <strong>Contact :</strong> timothee.thiry@gmail.com
            </p>

            <h2 className="my-4 text-xl text-foreground">2. Hébergement</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Le site est hébergé par :<br />
                <strong>Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789, USA<br />
                Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Les contenus dynamiques et médias (photographies) sont gérés via le CMS headless :<br />
                <strong>Contentful Inc.</strong><br />
                Berliner Allee 65, 10405 Berlin, Allemagne
            </p>

            <h2 className="my-4 text-xl text-foreground">3. Propriété intellectuelle</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                L&apos;ensemble des photographies, textes et éléments visuels présents sur ce site sont la propriété exclusive de leur auteur (sauf mention contraire).
                Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable, est strictement interdite
                conformément aux dispositions du Code de la propriété intellectuelle.
            </p>

            <h2 className="my-4 text-xl text-foreground">4. Données personnelles et Cookies</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Ce site personnel n&apos;a pas vocation à collecter des données personnelles à des fins commerciales.
                Aucun traceur publicitaire (cookie tiers) n&apos;est utilisé.
            </p>
        </main>
    );
}