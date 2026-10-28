
"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Space_Grotesk, Inter } from "next/font/google";
import BorderGlow from "./BorderGlow";
import { MarqueeDemo } from "./MarqueeDemo";

const headingFont = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-about-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-about-body",
  display: "swap",
});

type Language = "uz" | "en" | "ru";

type AboutProps = {
  lang: Language;
};

const translations = {
  uz: {
    label: "MEN HAQIMDA / 01",
    badge: "O‘rganishda va rivojlanishda davom etaman",
    heading1: "G‘oyalarni",
    heading2: "haqiqiy",
    heading3: "mahsulotlarga aylantiraman.",
    introStart: "Men ",
    name: "Muslim Ikromov",
    introEnd:
      ", Toshkent, O‘zbekistonda yashovchi Junior Frontend dasturchisiman. PDP Academy’da Frontend Development yo‘nalishida tahsil olganman.",
    descriptionStart: "Men ",
    descriptionMiddle: "React.js, TypeScript, Next.js va Tailwind CSS",
    descriptionEnd:
      " yordamida zamonaviy va moslashuvchan interfeyslar yarataman. Amaliy ishlarim admin panellar, CRM tizimlari, dashboardlar va REST API integratsiyasini o‘z ichiga oladi.",
    viewProjects: "Loyihalarni ko‘rish",
    contact: "Bog‘lanish",
    education: "TA’LIM",
    frontend: "Frontend dasturlash",
    educationDescription:
      "JavaScript, React va zamonaviy frontend texnologiyalari yordamida web-interfeyslar yaratishni o‘rganish.",
    handsOn: "AMALIY RIVOJLANISH",
    inProgress: "JARAYONDA",
    practicalProjects: "Amaliy loyihalar",
    projectsDescription:
      "API integratsiyasi va moslashuvchan interfeyslar bilan admin panellar, Education CRM va Bizda Users loyihalarini yaratish.",
    myGoal: "MAQSADIM",
    goalDescription: "Professional jamoada ishlash orqali rivojlanish.",
    reusable: "Qayta ishlatiladigan komponentlar",
    restApi: "REST API",
    responsive: "Moslashuvchan UI",
    git: "Git va GitHub",
    moreAbout: "Men haqimda batafsil",
    whatIDo: "Nima qilaman",
    howIGrow: "va qanday rivojlanaman",
  },
  en: {
    label: "ABOUT ME / 01",
    badge: "Still learning and growing",
    heading1: "I turn ideas",
    heading2: "into real",
    heading3: "products.",
    introStart: "I'm ",
    name: "Muslim Ikromov",
    introEnd:
      ", a Junior Frontend Developer based in Tashkent, Uzbekistan. I studied Frontend Development at PDP Academy.",
    descriptionStart: "I build modern, responsive interfaces with ",
    descriptionMiddle: "React.js, TypeScript, Next.js, and Tailwind CSS.",
    descriptionEnd:
      " My practical work includes admin panels, CRM systems, dashboards, and REST API integration.",
    viewProjects: "View projects",
    contact: "Get in touch",
    education: "EDUCATION",
    frontend: "Frontend Development",
    educationDescription:
      "Learning to build modern web interfaces using JavaScript, React, and modern frontend technologies.",
    handsOn: "HANDS-ON GROWTH",
    inProgress: "IN PROGRESS",
    practicalProjects: "Practical Projects",
    projectsDescription:
      "Building admin panels, an Education CRM, and Bizda Users with API integration and responsive interfaces.",
    myGoal: "MY GOAL",
    goalDescription: "Grow by working in a professional team.",
    reusable: "Reusable components",
    restApi: "REST API",
    responsive: "Responsive UI",
    git: "Git & GitHub",
    moreAbout: "A little more about me",
    whatIDo: "What I do",
    howIGrow: "& how I grow",
  },
  ru: {
    label: "ОБО МНЕ / 01",
    badge: "Продолжаю учиться и развиваться",
    heading1: "Превращаю идеи",
    heading2: "в реальные",
    heading3: "продукты.",
    introStart: "Я ",
    name: "Muslim Ikromov",
    introEnd:
      ", Junior Frontend-разработчик из Ташкента, Узбекистан. Изучал Frontend Development в PDP Academy.",
    descriptionStart: "Я создаю современные адаптивные интерфейсы с помощью ",
    descriptionMiddle: "React.js, TypeScript, Next.js и Tailwind CSS.",
    descriptionEnd:
      " Мой практический опыт включает административные панели, CRM-системы, дашборды и интеграцию REST API.",
    viewProjects: "Мои проекты",
    contact: "Связаться",
    education: "ОБРАЗОВАНИЕ",
    frontend: "Frontend-разработка",
    educationDescription:
      "Изучение создания современных веб-интерфейсов с использованием JavaScript, React и современных frontend-технологий.",
    handsOn: "ПРАКТИЧЕСКОЕ РАЗВИТИЕ",
    inProgress: "В ПРОЦЕССЕ",
    practicalProjects: "Практические проекты",
    projectsDescription:
      "Разработка административных панелей, Education CRM и Bizda Users с интеграцией API и адаптивными интерфейсами.",
    myGoal: "МОЯ ЦЕЛЬ",
    goalDescription: "Развиваться, работая в профессиональной команде.",
    reusable: "Переиспользуемые компоненты",
    restApi: "REST API",
    responsive: "Адаптивный интерфейс",
    git: "Git и GitHub",
    moreAbout: "Немного обо мне",
    whatIDo: "Что я делаю",
    howIGrow: "и как развиваюсь",
  },
};

const technologies = [
  "HTML & CSS",
  "JavaScript",
  "React.js",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
];

export default function About({ lang }: AboutProps) {
  const t = translations[lang];

  return (
    <section
      className={`${headingFont.variable} ${bodyFont.variable} about-fonts`}
    >
      <style jsx>{`
        .about-fonts {
          font-family: var(--font-about-body), sans-serif;
        }

        .about-fonts h2,
        .about-fonts h3 {
          font-family: var(--font-about-heading), sans-serif;
        }

        .about-divider {
          position: relative;
          width: 100%;
          height: 1px;
          overflow: hidden;
          background: rgba(156, 163, 175, 0.18);
        }

        .about-divider::after {
          content: "";
          position: absolute;
          top: 0;
          left: -30%;
          width: 30%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            #4f46e5,
            #818cf8,
            transparent
          );
          box-shadow: 0 0 12px rgba(79, 70, 229, 0.65);
          animation: about-line-move 3s ease-in-out infinite;
        }

        @keyframes about-line-move {
          0% {
            left: -30%;
          }

          100% {
            left: 100%;
          }
        }

        .about-button {
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease;
        }

        .about-button:hover {
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .about-divider::after {
            animation: none;
            left: 35%;
          }

          .about-button {
            transition: none;
          }
        }
      `}</style>

      <div
        id="about"
        className="relative mx-auto grid min-h-[calc(100svh-76px)] max-w-7xl grid-cols-1 items-center gap-12 overflow-hidden px-5 py-12 sm:px-8 md:grid-cols-2 md:gap-10 md:px-10 md:py-16 lg:gap-16 lg:px-16"
      >
        {/* LEFT SIDE — ABOUT ME */}
        <div className="relative z-10 min-w-0">
          {/* Section label */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="h-px w-8 bg-[#4f46e5]" />

            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
              {t.label}
            </span>

            <span className="rounded-full border border-[#4f46e5]/25 bg-[#4f46e5]/[0.07] px-3 py-1.5 text-[11px] font-medium text-indigo-300">
              {t.badge}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.055em] text-foreground sm:text-5xl lg:text-6xl">
            {t.heading1}
            <br />
            {t.heading2}
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
              {t.heading3}
            </span>
          </h2>

          {/* Animated divider */}
          <div className="my-7">
            <div className="about-divider" />
          </div>

          {/* Description */}
          <div className="max-w-md space-y-4 text-sm leading-7 text-muted-foreground sm:text-[15px]">
            <p>
              {t.introStart}
              <span className="font-semibold text-foreground">{t.name}</span>
              {t.introEnd}
            </p>

            <p>
              {t.descriptionStart}
              <span className="font-semibold text-foreground">
                {t.descriptionMiddle}
              </span>
              {t.descriptionEnd}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="about-button group inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 hover:shadow-indigo-500/30"
            >
              {t.viewProjects}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href="#contact"
              className="about-button group inline-flex items-center gap-2 rounded-xl border border-indigo-500/25 bg-indigo-500/[0.07] px-5 py-3 text-sm font-semibold text-indigo-600 shadow-md shadow-indigo-500/10 hover:border-indigo-500/40 hover:bg-indigo-500/15 hover:shadow-lg hover:shadow-indigo-500/20 dark:text-indigo-300"
            >
              {t.contact}
              <ArrowDownRight
                size={16}
                className="text-violet-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 dark:text-violet-300"
              />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE — BORDER GLOW CARDS */}
        <div className="relative z-10 flex min-w-0 flex-col gap-4">
          {/* EDUCATION CARD */}
          <BorderGlow
            animated={true}
            colors={["#c084fc", "#f472b6", "#38bdf8"]}
            glowIntensity={1}
            className="w-full"
          >
            <div className="p-4 sm:p-[18px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-purple-300">
                  2026
                </span>

                <span className="rounded-full border border-purple-400/30 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-purple-200">
                  {t.education}
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
                PDP Academy
              </h3>

              <p className="mt-1 text-sm font-medium text-purple-300">
                {t.frontend}
              </p>

              <p className="mt-2 text-xs leading-6 text-gray-400 sm:text-[13px]">
                {t.educationDescription}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5 text-xs text-gray-300 transition hover:border-purple-400/40 hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </BorderGlow>

          {/* PRACTICAL PROJECTS CARD */}
          <BorderGlow
            animated={true}
            colors={["#38bdf8", "#8b5cf6", "#c084fc"]}
            glowIntensity={1}
            className="w-full"
          >
            <div className="p-4 sm:p-[18px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold tracking-wider text-sky-300">
                  {t.handsOn}
                </span>

                <span className="rounded-full border border-sky-400/30 px-2.5 py-1 text-[10px] font-medium text-sky-300">
                  {t.inProgress}
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
                {t.practicalProjects}
              </h3>

              <p className="mt-1 text-sm font-medium text-sky-300">
                {t.frontend}
              </p>

              <p className="mt-2 text-xs leading-6 text-gray-400 sm:text-[13px]">
                {t.projectsDescription}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {[t.reusable, t.restApi, t.responsive, t.git].map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5 text-xs text-gray-300 transition hover:border-sky-400/40 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
                <p className="text-[10px] font-semibold tracking-wider text-gray-500">
                  {t.myGoal}
                </p>

                <p className="mt-1 text-xs leading-6 text-gray-300">
                  {t.goalDescription}
                </p>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>

      {/* MARQUEE INTRO */}
      <div className="mx-auto mb-6 w-full max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16">
        <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400 sm:text-left">
          {t.moreAbout}
        </p>

        <h3 className="text-center text-2xl font-bold tracking-[-0.04em] text-black dark:text-white sm:text-left sm:text-3xl md:text-4xl">
          {t.whatIDo}{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {t.howIGrow}
          </span>
        </h3>
      </div>

      <MarqueeDemo lang={lang} />
    </section>
  );
}
