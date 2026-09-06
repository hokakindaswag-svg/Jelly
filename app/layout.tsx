import type { Metadata, Viewport } from "next";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import Chrome from "@/components/Chrome";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://doudoumimi.fr"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fff7ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Polices rondes et lisibles ; fallback système défini dans globals.css */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cocoa-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        <CartProvider>
          <Chrome>
            <AnnouncementBar />
            <Header />
          </Chrome>
          <main id="contenu">{children}</main>
          <Chrome>
            <Footer />
          </Chrome>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
