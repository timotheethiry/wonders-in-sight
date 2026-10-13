"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        if (isFirstRender.current) {
            isFirstRender.current = false;

            // L'accueil possède sa propre animation d'entrée.
            if (pathname === "/") return;
        }

        container.classList.remove("page-enter");

        // Force le navigateur à réinitialiser l'animation.
        void container.offsetWidth;

        container.classList.add("page-enter");
    }, [pathname]);

    return (
        <div ref={containerRef}>
            {children}
        </div>
    );
}