"use client";

import { useEffect, useRef, useState } from "react";

export type Photo = {
    id: string;
    title: string;
    location: string;
    locationName: string;
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
                className={`m-auto h-fit max-h-[90dvh] max-w-[95vw] overflow-hidden bg-transparent p-0 text-white ${isVisible ? "is-visible" : ""} ${isClosing ? "is-closing" : ""}`}
                aria-label="Photographie agrandie"
            >


                {selectedPhoto && (
                    <div className="flex max-h-[90dvh] w-[95vw] flex-col md:w-fit">

                        <button
                            type="button"
                            onClick={closePhoto}
                            aria-label="Fermer la photographie"
                            className="mb-2 shrink-0 self-end px-3 py-2 text-sm text-white/40 hover:opacity-70"
                        >
                            Fermer ✕
                        </button>


                        <div className={`flex min-h-0 flex-1 flex-col gap-4 overflow-hidden ${selectedPhoto.narrative
                            ? "md:flex-row md:gap-8"
                            : "md:items-start"
                            }`}>

                            <div className="flex min-h-0 shrink-0 items-center justify-center md:flex-1">
                                <img
                                    src={selectedPhoto.imageFull}
                                    alt={selectedPhoto.alt}
                                    className="block max-h-[60dvh] max-w-full object-contain md:max-h-[75dvh]"
                                />
                            </div>


                            <div className={`flex min-h-0 flex-1 flex-col ${selectedPhoto.narrative
                                ? "md:w-[22rem] md:flex-none"
                                : ""
                                }`}>
                                <div className="mb-4 shrink-0">
                                    <h2 className="font-serif text-lg italic">
                                        {selectedPhoto.title}
                                        {selectedPhoto.locationName && (
                                            <span className="text-base text-white/70 not-italic">
                                                {`, ${selectedPhoto.locationName}`}
                                            </span>
                                        )}
                                    </h2>
                                </div>

                                {selectedPhoto.narrative && (
                                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2">
                                        <p className="max-w-pros text-left text-sm leading-7 text-white/70">
                                            {selectedPhoto.narrative}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}


            </dialog>
        </>
    );
}
