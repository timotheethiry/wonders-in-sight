
"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        setTheme(
            document.documentElement.classList.contains("light")
                ? "light"
                : "dark",
        );
    }, []);

    function toggleTheme() {
        const nextTheme: Theme = theme === "dark" ? "light" : "dark";

        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(nextTheme);

        try {
            localStorage.setItem("wis-theme", nextTheme);
        } catch {
            // Le thème reste utilisable si le stockage est indisponible.
        }

        setTheme(nextTheme);
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                theme === "dark"
                    ? "Activer le thème clair"
                    : "Activer le thème sombre"
            }
            title={theme === "dark" ? "Thème clair" : "Thème sombre"}
            className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
            {theme === "dark" ? (
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="size-5"
                >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                </svg>
            ) : (
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="size-5"
                >
                    <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
                </svg>
            )}
        </button>
    );
}
