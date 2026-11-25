import { Suspense } from 'react';
import PhotoGallery from '@/components/PhotoGallery';
import { getHomeHero, getHomePhotos } from '@/lib/contentful';
import { Metadata } from 'next';
import HomeEntrance from '@/components/HomeEntrance';
import GallerySkeleton from '@/components/GallerySkeleton';

export const metadata: Metadata = {
	title: 'Photographies et regards sur le monde',
};

async function GalleryContent() {
	const photos = await getHomePhotos();

	return (
		<HomeEntrance>
			<PhotoGallery photos={photos} />
		</HomeEntrance>
	);
}

async function HeroContent() {
	const photos = await getHomeHero();
	const heroPhoto = photos[0];

	return (
		<HomeEntrance>
			<div className="relative w-full overflow-hidden h-[62dvh] drop-shadow-lg/20 sm:h-auto sm:max-h-[82dvh]">
				<img
					src={heroPhoto.imageFull}
					alt={heroPhoto.alt}
					className="block h-full w-full object-cover object-center sm:h-auto sm:max-h-[82dvh]"
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
				/>
				<h2 className="font-serif text-4xl tracking-tight text-white/85 text-shadow-lg/40 absolute bottom-20 left-10 right-6 sm:bottom-30 sm:left-20 sm:text-5xl">
					Le monde, autrement<span className="text-muted">.</span>
				</h2>
			</div>
		</HomeEntrance>
	);
}

export default function Home() {
	return (
		<main className="min-h-screen bg-background text-foreground">
			<section className='w-full' aria-label="Photographie d'accueil mise en avant">
				<Suspense fallback={<GallerySkeleton />}>
					<HeroContent />
				</Suspense>
			</section>
			<section
				id="galerie"
				aria-label="Sélection de photographies"
				className="px-5 pt-10 sm:px-8 sm:pt-12 md:px-12"
			>
				<Suspense fallback={<GallerySkeleton />}>
					<GalleryContent />
				</Suspense>
			</section>
		</main>
	);
}
