import { cacheLife } from "next/cache";
import Link from "next/link";

async function getCurrentYear() {
  'use cache';
  cacheLife('max');
  return new Date().getFullYear();
}

export default async function Footer() {
  return (
    <footer
      id="a-propos"
      className="mt-8 border-t border-border px-5 py-8 text-sm text-center text-muted sm:px-8 lg:px-12"
    >
      <p>Wonders In Sight, {await getCurrentYear()} | Timothée Thiry | {" "}
        <Link
          className="text-muted transition-colors hover:text-foreground"
          href="/mentions-legales"
        >
          Mentions Légales
        </Link>
      </p>
    </footer>
  );
}