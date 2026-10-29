import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";
import "./globals.css";
import PageLoader from "@/components/PageLoader";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-me-eight-eta.vercel.app"),

  title: {
    default: "Portfolio",
    template: "%s | Muslim Portfolio",
  },

  description:
    "Muslim Ikromov — Junior Frontend Developer. React, Next.js va TypeScript yordamida zamonaviy web interfeyslar yarataman.",

  icons: {
    icon: "/icon.svg",
  },

  openGraph: {
    title: "Portfolio",
    description:
      "React, Next.js va TypeScript loyihalari. Muslim Ikromovning portfolio sayti.",
    url: "https://portfolio-me-eight-eta.vercel.app/",
    siteName: "Muslim Portfolio",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Muslim — Frontend Developer Portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Portfolio",
    description:
      "React va Next.js loyihalari — Muslim Ikromov portfolio sayti.",
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
          <div className="portfolio-background" aria-hidden="true">
            <div className="ambient-light" />
          </div>

          <div className="relative z-10 min-h-screen">{children}</div>
        </Providers>

        <PageLoader />
      </body>
    </html>
  );
}
