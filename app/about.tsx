import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-me-eight-eta.vercel.app"),

  title: "Muslim | Frontend Developer",
  description:
    "Muslimning portfolio sayti. React, Next.js va TypeScript yordamida zamonaviy web interfeyslar yarataman.",

  icons: {
    icon: "/icon.svg",
  },

  openGraph: {
    title: "Muslim | Frontend Developer",
    description:
      "Zamonaviy web interfeyslar, React va Next.js portfolio loyihalari.",
    url: "https://portfolio-me-eight-eta.vercel.app/",
    siteName: "Muslim Portfolio",
    images: [
      {
        url: "https://portfolio-me-eight-eta.vercel.app/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Muslim - Frontend Developer Portfolio",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Muslim | Frontend Developer",
    description: "React, Next.js va TypeScript portfolio loyihalari.",
    images: ["https://portfolio-me-eight-eta.vercel.app/portfolio.png"],
  },
};
