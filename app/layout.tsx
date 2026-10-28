import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-me-eight-eta.vercel.app"),

  title: "Portfolio",
  description: "Muslimning portfolio sayti. React va Next.js loyihalari.",

  openGraph: {
    title: "Muslim | Frontend Developer",
    description: "Zamonaviy web interfeyslar, React va Next.js loyihalari.",
    url: "https://portfolio-me-eight-eta.vercel.app/",
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
