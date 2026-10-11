import type { Metadata } from "next";
import "./globals.css";
import { themes } from "@/data/themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={` h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header themes={themes} />

        {children}

        <Footer />
      </body>
    </html>
  );
}
