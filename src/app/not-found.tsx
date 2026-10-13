import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center bg-background px-5 py-16 text-center text-foreground sm:py-24">
            <p className="text-sm text-muted">Erreur 404</p>

            <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
                Cette page n'existe pas
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-muted">
                La page recherchée est introuvable. Les photographies, elles,
                sont toujours là.
            </p>

            <Link
                href="/"
                className="mt-8 border-b border-foreground pb-1 text-sm transition-colors hover:text-muted"
            >
                Retour à l'accueil
            </Link>
        </main>
    );
}