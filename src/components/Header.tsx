
import Link from "next/link";

type Theme = {
    slug: string;
    label: string;
};

type HeaderProps = {
    themes: Theme[];
};

export default function Header({ themes }: HeaderProps) {
    return (
        <>
            <header className="site-enter flex items-center justify-between border-b border-border px-5 py-5 sm:px-8 lg:px-12">
                <Link
                    href="/"
                    className="font-serif text-2xl tracking-tight"
                    aria-label="Accueil de la galerie">
                    Wonders In Sight<span className="text-muted">.</span>
                </Link>

                <nav
                    aria-label="Navigation principale"
                    className="flex items-center gap-5 text-sm text-muted sm:gap-8">
                    <Link href="/#galerie" className="transition-colors hover:text-foreground">Photographies</Link>
                    <Link href="/#a-propos" className="transition-colors hover:text-foreground">À propos</Link>
                </nav>
            </header>


            <nav aria-label="Thèmes photographiques"
                className="site-enter flex gap-6 overflow-x-auto border-b border-border px-5 py-4 text-sm whitespace-nowrap sm:px-8 lg:px-12">
                {themes.map((theme) => (
                    <Link
                        key={theme.slug}
                        href={`/theme/${theme.slug}`
                        }
                        className="shrink-0 text-muted transition-colors hover:text-foreground"

                    >
                        {theme.label}
                    </Link>
                ))}
            </nav>
        </>
    );
}