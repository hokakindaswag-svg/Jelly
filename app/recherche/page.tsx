import type { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Recherche",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <section className="bg-cream py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <Suspense
          fallback={
            <p className="text-center text-sm font-bold text-cocoa-600/70">Recherche en cours… 🔍</p>
          }
        >
          <SearchClient />
        </Suspense>
      </div>
    </section>
  );
}
