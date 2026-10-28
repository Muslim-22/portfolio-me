"use client";

import StaggeredMenu from "./StaggeredMenu";
import { Space_Grotesk, Inter } from "next/font/google";
import {
  FaHouse,
  FaUser,
  FaCode,
  FaFolderOpen,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";

type Language = "uz" | "ru" | "en";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: Language;
}

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const translations = {
  uz: [
    {
      label: "Bosh sahifa",
      ariaLabel: "Bosh sahifaga o'tish",
      link: "#home",
      icon: FaHouse,
    },
    {
      label: "Men haqimda",
      ariaLabel: "Men haqimda bo'limi",
      link: "#about",
      icon: FaUser,
    },
    {
      label: "Ko'nikmalar",
      ariaLabel: "Ko'nikmalar bo'limi",
      link: "#skills",
      icon: FaCode,
    },
    {
      label: "Loyihalar",
      ariaLabel: "Loyihalar bo'limi",
      link: "#projects",
      icon: FaFolderOpen,
    },
    {
      label: "Bog'lanish",
      ariaLabel: "Bog'lanish bo'limi",
      link: "#contact",
      icon: FaEnvelope,
    },
  ],
  ru: [
    {
      label: "Главная",
      ariaLabel: "Перейти на главную",
      link: "#home",
      icon: FaHouse,
    },
    {
      label: "Обо мне",
      ariaLabel: "Раздел обо мне",
      link: "#about",
      icon: FaUser,
    },
    {
      label: "Навыки",
      ariaLabel: "Раздел навыков",
      link: "#skills",
      icon: FaCode,
    },
    {
      label: "Проекты",
      ariaLabel: "Раздел проектов",
      link: "#projects",
      icon: FaFolderOpen,
    },
    {
      label: "Контакты",
      ariaLabel: "Раздел контактов",
      link: "#contact",
      icon: FaEnvelope,
    },
  ],
  en: [
    {
      label: "Home",
      ariaLabel: "Go to Home",
      link: "#home",
      icon: FaHouse,
    },
    {
      label: "About Me",
      ariaLabel: "Go to About Me",
      link: "#about",
      icon: FaUser,
    },
    {
      label: "Skills",
      ariaLabel: "Go to Skills",
      link: "#skills",
      icon: FaCode,
    },
    {
      label: "Projects",
      ariaLabel: "Go to Projects",
      link: "#projects",
      icon: FaFolderOpen,
    },
    {
      label: "Contact",
      ariaLabel: "Go to Contact",
      link: "#contact",
      icon: FaEnvelope,
    },
  ],
};

const socialItems = [
  {
    label: "GitHub",
    icon: FaGithub,
    link: "https://github.com/Muslim-22",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedin,
    link: "https://linkedin.com",
  },
];

export default function MobileNav({
  open,
  onOpenChange,
  lang,
}: MobileNavProps) {
  return (
    <div
      className={`${headingFont.className} ${bodyFont.className}`}
      style={
        {
          "--mobile-nav-heading-font": headingFont.style.fontFamily,
          "--mobile-nav-body-font": bodyFont.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <StaggeredMenu
        position="right"
        isFixed={true}
        open={open}
        onOpenChange={onOpenChange}
        showToggle={false}
        lang={lang}
        items={translations[lang]}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={false}
        menuButtonColor="#818cf8"
        openMenuButtonColor="#a5b4fc"
        changeMenuColorOnOpen={true}
        colors={["#080b19", "#312e81"]}
        accentColor="#818cf8"
      />
    </div>
  );
}
