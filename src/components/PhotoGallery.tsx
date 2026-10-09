"use client";

import { useEffect, useRef, useState } from "react";

export type Photo = {
    id: number;
    title: string;
    lieu: string;
    theme: string;
    image: string;
    alt: string;
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
            <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 lg:gap-5">
                {photos.map((photo) => (
                    <article
                        key={photo.id}
                        className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5"
                    >
                        <button
                            type="button"
                            onClick={() => openPhoto(photo)}
                            aria-label={`Agrandir : ${photo.title}`}
                            className="block w-full cursor-zoom-in"
                        >
                            <img
                                src={photo.image}
                                alt={photo.alt}
                                loading={photo.id <= 4 ? "eager" : "lazy"}
                                className="block h-auto w-full"
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
                            src={selectedPhoto.image}
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
                    </div>

                )}
            </dialog>
        </>
    );
}
