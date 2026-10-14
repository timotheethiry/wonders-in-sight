import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "À propos",
    description:
        "Découvrez l'origine de Wonders In Sight et la démarche derrière cette galerie photographique personnelle.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
                <h1 className="mb-10 font-serif text-3xl tracking-tight sm:text-4xl">
                    À propos
                </h1>

                <section className="grid gap-8 sm:grid-cols-[250px_1fr] sm:gap-12">
                    <Image
                        src="/images/about/portrait.JPG"
                        alt="Portrait de l'auteur de Wonders In Sight"
                        width={440}
                        height={550}
                        className="mx-auto h-auto w-full max-w-[270px] object-cover sm:mx-0 sm:max-w-[250px]"
                        priority
                    />

                    <div className="space-y-5 leading-relaxed text-muted">
                        <p>
                            Je suis un amateur de belles et bonnes choses. J’aime prendre
                            des photos, saisir ce qui attire mon attention et garder une
                            trace des lieux, des moments et des expériences que je rencontre.
                        </p>

                        <p>
                            Avec Wonders In Sight, je rassemble ces images et les partage
                            ici. L’idée est simple : faire découvrir ce que j’ai aimé,
                            conserver des souvenirs et laisser chacun libre d’apprécier les
                            photographies à sa manière.
                        </p>

                        <h2 className="pt-4 font-serif text-2xl text-foreground">
                            À l’origine du projet
                        </h2>

                        <p>
                            En 2020, j’ai entamé une reconversion en développement web.
                            Créer ma propre galerie photo s’est naturellement imposé comme
                            une idée de projet personnel : une occasion de réunir mon goût
                            pour la photographie et mon envie d’apprendre, d’expérimenter
                            et de développer.
                        </p>

                        <p>
                            L’idée a mûri pendant plusieurs années avant de devenir le site
                            que vous parcourez aujourd’hui.
                        </p>
                    </div>
                </section>
            </article>
        </main>
    );
}