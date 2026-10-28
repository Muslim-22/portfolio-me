
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-ten-two-o0ktysswsv.vercel.app"),

  title: "Portfolio",
  description:
    "Muslimning portfolio sayti. React, Next.js va TypeScript bilan zamonaviy web interfeyslar yarataman.",

  icons: {
    icon: "/icon.svg",
  },

  openGraph: {
    title: "Muslim | Frontend Developer",
    description:
      "Zamonaviy web interfeyslar, React va Next.js loyihalari.",
    url: "https://portfolio-ten-two-o0ktysswsv.vercel.app",
    siteName: "Muslim Portfolio",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Muslim - Frontend Developer Portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Muslim | Frontend Developer",
    description: "React va Next.js portfolio loyihalari.",
    images: ["/portfolio.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {/* Animatsiyali fon */}
          <div className="portfolio-background" aria-hidden="true">
            <div className="ambient-light" />
          </div>

          {/* Sahifa kontenti */}
          <div className="relative z-10 min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
