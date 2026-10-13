"use client";

import { useEffect, useRef } from "react";

export default function HomeEntrance({
    children,
}: {
    children: React.ReactNode;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.classList.add("home-gallery-enter");
    }, []);

    return <div ref={containerRef}>{children}</div>;
}