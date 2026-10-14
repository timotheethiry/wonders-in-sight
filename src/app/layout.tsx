import type { Metadata } from "next";
import "./globals.css";
import { themes } from "@/data/themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Photographies et regards sur le monde | Wonders In Sight",
    template: "%s | Wonders In Sight",
  },
  description:
    "Une galerie photographique personnelle, entre paysages, architecture, voyages et noir et blanc.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Wonders In Sight",
    title: "Photographies et regards sur le monde | Wonders In Sight",
    description:
      "Une galerie photographique personnelle, entre paysages, architecture, voyages et noir et blanc.",
  },
  icons: {
    icon: "/images/favicon-dark.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={` h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="wis-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          try {
            const savedTheme = localStorage.getItem("wis-theme");
            const theme = savedTheme === "light" ? "light" : "dark";
            document.documentElement.classList.add(theme);
          } catch {
            document.documentElement.classList.add("dark");
          }
        `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Header themes={themes} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
