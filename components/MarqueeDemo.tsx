
"use client";

import { Space_Grotesk, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import {
  Code2,
  MapPin,
  GraduationCap,
  Layers3,
  Workflow,
  Rocket,
} from "lucide-react";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-marquee-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-marquee-body",
  display: "swap",
});

type Language = "uz" | "en" | "ru";

type MarqueeDemoProps = {
  lang: Language;
};

const translations = {
  uz: [
    {
      id: "stack",
      label: "TEXNOLOGIYALAR",
      title: "Zamonaviy frontend",
      description:
        "Zamonaviy frontend texnologiyalari yordamida moslashuvchan web-interfeyslar yarataman.",
      tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
      icon: Code2,
      className: "md:col-span-2",
    },
    {
      id: "location",
      label: "JOYLASHUV",
      title: "Toshkent, O‘zbekiston",
      description:
        "Toshkentda yashayman va frontend dasturchi sifatida rivojlanish imkoniyatlariga ochiqman.",
      tags: ["O‘zbekiston", "Frontend"],
      icon: MapPin,
      className: "",
    },
    {
      id: "education",
      label: "TA'LIM",
      title: "PDP Academy",
      description:
        "Frontend Development yo‘nalishida tahsil olganman va amaliy ko‘nikmalarimni rivojlantirishda davom etaman.",
      tags: ["JavaScript", "React", "Web dasturlash"],
      icon: GraduationCap,
      className: "",
    },
    {
      id: "projects",
      label: "LOYIHALARIM",
      title: "Amaliy interfeyslar",
      description:
        "Admin panellar, CRM tizimlari, dashboardlar va onlayn do‘kon interfeyslarini yaratish bo‘yicha amaliy tajribam bor.",
      tags: ["Admin panellar", "CRM", "Dashboardlar"],
      icon: Layers3,
      className: "md:col-span-2",
    },
    {
      id: "workflow",
      label: "ISHLASH JARAYONI",
      title: "UI dan API gacha",
      description:
        "Qayta ishlatiladigan komponentlar, API ma'lumotlari, moslashuvchan maketlar va versiyalar nazorati bilan ishlayman.",
      tags: ["REST API", "Responsive UI", "Git va GitHub"],
      icon: Workflow,
      className: "",
    },
    {
      id: "mindset",
      label: "YONDASHUVIM",
      title: "O‘rganaman va yarataman",
      description:
        "Amaliy loyihalar orqali rivojlanaman, tushunarli kod yozaman va tajribali dasturchilardan o‘rganaman.",
      tags: ["O‘rganish", "Yaratish", "Rivojlanish"],
      icon: Rocket,
      className: "",
    },
  ],

  en: [
    {
      id: "stack",
      label: "TECH STACK",
      title: "Modern frontend",
      description:
        "Building responsive web interfaces with modern frontend technologies.",
      tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
      icon: Code2,
      className: "md:col-span-2",
    },
    {
      id: "location",
      label: "LOCATION",
      title: "Tashkent, Uzbekistan",
      description:
        "Based in Tashkent and open to opportunities to grow as a frontend developer.",
      tags: ["Uzbekistan", "Frontend"],
      icon: MapPin,
      className: "",
    },
    {
      id: "education",
      label: "EDUCATION",
      title: "PDP Academy",
      description:
        "Studied Frontend Development and continue to strengthen my practical skills.",
      tags: ["JavaScript", "React", "Web Development"],
      icon: GraduationCap,
      className: "",
    },
    {
      id: "projects",
      label: "WHAT I BUILD",
      title: "Interfaces that work",
      description:
        "Practical experience building admin panels, CRM systems, dashboards, and online shop interfaces.",
      tags: ["Admin Panels", "CRM", "Dashboards"],
      icon: Layers3,
      className: "md:col-span-2",
    },
    {
      id: "workflow",
      label: "DEVELOPMENT",
      title: "From UI to API",
      description:
        "Working with reusable components, API data, responsive layouts, and version control.",
      tags: ["REST API", "Responsive UI", "Git & GitHub"],
      icon: Workflow,
      className: "",
    },
    {
      id: "mindset",
      label: "MY MINDSET",
      title: "Still learning. Always building.",
      description:
        "Improving through real projects, writing maintainable code, and learning from experienced developers.",
      tags: ["Learn", "Build", "Improve"],
      icon: Rocket,
      className: "",
    },
  ],

  ru: [
    {
      id: "stack",
      label: "ТЕХНОЛОГИИ",
      title: "Современный frontend",
      description:
        "Создаю адаптивные веб-интерфейсы с использованием современных frontend-технологий.",
      tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
      icon: Code2,
      className: "md:col-span-2",
    },
    {
      id: "location",
      label: "МЕСТОПОЛОЖЕНИЕ",
      title: "Ташкент, Узбекистан",
      description:
        "Живу в Ташкенте и открыт к возможностям профессионального роста во frontend-разработке.",
      tags: ["Узбекистан", "Frontend"],
      icon: MapPin,
      className: "",
    },
    {
      id: "education",
      label: "ОБРАЗОВАНИЕ",
      title: "PDP Academy",
      description:
        "Изучал Frontend Development и продолжаю развивать практические навыки.",
      tags: ["JavaScript", "React", "Веб-разработка"],
      icon: GraduationCap,
      className: "",
    },
    {
      id: "projects",
      label: "МОИ ПРОЕКТЫ",
      title: "Практичные интерфейсы",
      description:
        "Имею практический опыт создания административных панелей, CRM-систем, дашбордов и интерфейсов интернет-магазинов.",
      tags: ["Админ-панели", "CRM", "Дашборды"],
      icon: Layers3,
      className: "md:col-span-2",
    },
    {
      id: "workflow",
      label: "РАЗРАБОТКА",
      title: "От UI до API",
      description:
        "Работаю с переиспользуемыми компонентами, данными API, адаптивными макетами и контролем версий.",
      tags: ["REST API", "Адаптивный UI", "Git и GitHub"],
      icon: Workflow,
      className: "",
    },
    {
      id: "mindset",
      label: "МОЙ ПОДХОД",
      title: "Учусь и создаю",
      description:
        "Развиваюсь на практических проектах, пишу поддерживаемый код и учусь у опытных разработчиков.",
      tags: ["Учиться", "Создавать", "Развиваться"],
      icon: Rocket,
      className: "",
    },
  ],
};

type Review = (typeof translations)["en"][number];

const ReviewCard = ({
  label,
  title,
  description,
  tags,
  icon: Icon,
}: Review) => {
  return (
    <figure
      className={cn(
        "group relative flex h-full w-72 cursor-pointer flex-col overflow-hidden rounded-2xl border p-5 sm:w-80 sm:p-6",
        "border-gray-950/[.1] bg-gray-950/[.01] transition-colors duration-300 hover:bg-gray-950/[.05]",
        "dark:border-white/[.10] dark:bg-white/[.04] dark:hover:bg-white/[.08]",
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p
          className={cn(
            headingFont.className,
            "text-[10px] font-bold uppercase leading-relaxed tracking-[0.17em] text-gray-500 dark:text-white/50",
          )}
        >
          {label}
        </p>

        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/[.07] text-cyan-400 transition-all duration-300 group-hover:border-violet-400/30 group-hover:bg-violet-400/[.10] group-hover:text-violet-300">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
      </div>

      <figcaption
        className={cn(
          headingFont.className,
          "text-lg font-bold leading-snug tracking-[-0.045em] text-gray-900 dark:text-white sm:text-xl",
        )}
      >
        {title}
      </figcaption>

      <blockquote
        className={cn(
          bodyFont.className,
          "mt-3 flex-1 text-[12px] font-normal leading-[1.9] tracking-[-0.01em] text-gray-600 dark:text-white/65 sm:text-[13px]",
        )}
      >
        {description}
      </blockquote>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              bodyFont.className,
              "rounded-full border border-gray-500/20 bg-gray-500/[.04] px-2.5 py-1.5 text-[10px] font-medium leading-none tracking-[-0.01em] text-gray-600 dark:text-white/70",
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inset-x-6" />
    </figure>
  );
};

export function MarqueeDemo({ lang }: MarqueeDemoProps) {
  const reviews = translations[lang] ?? translations.uz;
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <div
      className={cn(
        headingFont.variable,
        bodyFont.variable,
        "relative flex w-full flex-col items-center justify-center overflow-hidden",
      )}
    >
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />
    </div>
  );
}

export default MarqueeDemo;
