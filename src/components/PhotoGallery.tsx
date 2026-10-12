"use client";

import { useEffect, useRef, useState } from "react";

export type Photo = {
    id: string;
    title: string;
    lieu: string;
    theme: string;
    image: string;
    imageFull: string;
    alt: string;
    narrative: string;
};

type PhotoGalleryProps = {
    photos: Photo[];
};

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [isClosing, setIsClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    function openPhoto(photo: Photo) {
        setSelectedPhoto(photo);
        setIsClosing(false);

        setIsVisible(false);

        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsVisible(true);
            });
        });
    }

    function closePhoto() {
        if (isClosing) return;

        setIsVisible(false);
        setIsClosing(true);
    }

    function handleDialogClose() {
        setSelectedPhoto(null);
        setIsVisible(false);
        setIsClosing(false);
    }

    useEffect(() => {
        if (!isClosing) return;

        const timeout = window.setTimeout(() => {
            dialogRef.current?.close();
        }, 300);

        return () => window.clearTimeout(timeout);
    }, [isClosing]);

    return (
        <>
            <div className="columns-2 gap-3 max-w-9/10 mx-auto md:columns-3 md:gap-4 md:max-w-5/6 lg:columns-4 lg:gap-5 lg:max-w-6/7">
                {photos.map((photo) => (
                    <article
                        key={photo.id}
                        className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5"
                    >
                        <button
                            type="button"
                            onClick={() => openPhoto(photo)}
                            aria-label={`Agrandir : ${photo.title}`}
                            className="block w-full cursor-pointer"
                        >
                            <img
                                src={photo.image}
                                alt={photo.alt}
                                loading={photos.indexOf(photo) <= 4 ? "eager" : "lazy"}
                                className="block h-auto w-full transition-[filter] duration-300 ease-in-out hover:brightness-85 focus-visible:brightness-85"
                            />
                        </button>
                    </article>
                ))}
            </div>

            <dialog
                ref={dialogRef}
                onClose={handleDialogClose}
                onClick={(event) => {
                    if (event.target === dialogRef.current) closePhoto();
                }}
                onCancel={(event) => {
                    event.preventDefault();
                    closePhoto();
                }}
                className={`m-auto max-h-[90dvh] max-w-[95vw] bg-transparent p-0 text-white ${isVisible ? "is-visible" : ""} ${isClosing ? "is-closing" : ""}`}
                aria-label="Photographie agrandie"
            >
                {selectedPhoto && (
                    <div className="flex flex-col">
                        <button
                            type="button"
                            onClick={closePhoto}
                            aria-label="Fermer la photographie"
                            className="mb-2 self-end px-3 py-2 text-sm text-white/40 hover:opacity-70"
                        >
                            Fermer ✕
                        </button>

                        <img
                            src={selectedPhoto.imageFull}
                            alt={selectedPhoto.alt}
                            className="block max-h-[75dvh] max-w-[95vw] object-contain"
                        />

                        <div className="px-1 py-3">
                            <h2 className="font-serif text-lg">
                                {selectedPhoto.title}
                                <span className="text-white/70">
                                    {selectedPhoto.lieu && `, ${selectedPhoto.lieu}`}
                                </span>
                            </h2>
                        </div>
                        {selectedPhoto.narrative && (<p className="mt-2 max-w-prose text-sm leading-6 text-white/70">
                            {selectedPhoto.narrative}
                        </p>)}
                    </div>

                )}
            </dialog>
        </>
    );
}
