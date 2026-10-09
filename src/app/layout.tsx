import type { Metadata } from "next";
import "./globals.css";
import { themes } from "@/data/themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wonders In Sight",
  description: "Une collection personnelle de photographies.",
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
