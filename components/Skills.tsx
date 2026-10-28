"use client";

import { Space_Grotesk, Inter } from "next/font/google";

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiCssmodules,
  SiAntdesign,
  SiAxios,
  SiReactquery,
  SiGit,
  SiGithub,
  SiVite,
  SiNpm,
} from "react-icons/si";

import {
  Globe,
  Database,
  Palette,
  Wrench,
  Code2,
  Workflow,
  Monitor,
} from "lucide-react";

import { VscCode } from "react-icons/vsc";
import type { IconType } from "react-icons";
import BorderGlow from "./BorderGlow";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
});

type Language = "uz" | "en" | "ru";

type SkillsProps = {
  lang: Language;
};

type Skill = {
  name: string;
  short: string;
  icon: IconType;
};

type SkillGroup = {
  number: string;
  icon: IconType;
  skills: Skill[];
};

const translations: Record<
  Language,
  {
    label: string;
    badge: string;
    heading1: string;
    heading2: string;
    subtitle: string;
    groups: {
      title: string;
      description: string;
    }[];
  }
> = {
  uz: {
    label: "MENING KO‘NIKMALARIM / 02",
    badge: "MEN ISHLATADIGAN TEXNOLOGIYALAR",
    heading1: "Men ishlatadigan",
    heading2: "texnologiyalar.",
    subtitle:
      "Loyihalarimda foydalanadigan asosiy vositalar, texnologiyalar va frontend yechimlar.",
    groups: [
      {
        title: "Frontend",
        description: "Interaktiv veb-interfeyslar",
      },
      {
        title: "UI va dizayn",
        description: "Zamonaviy va moslashuvchan dizayn",
      },
      {
        title: "Ma’lumotlar va holat",
        description: "API va ma’lumotlar bilan ishlash",
      },
      {
        title: "Vositalar",
        description: "Kundalik dasturlash vositalari",
      },
    ],
  },

  en: {
    label: "SKILLS ME / 02",
    badge: "TECHNOLOGIES I USE",
    heading1: "Technologies",
    heading2: "I use.",
    subtitle:
      "The main tools and technologies I use to build modern, responsive web interfaces.",
    groups: [
      {
        title: "Frontend",
        description: "Interactive web interfaces",
      },
      {
        title: "UI & Styling",
        description: "Responsive, modern design",
      },
      {
        title: "Data & State",
        description: "Working with APIs and data",
      },
      {
        title: "Tools",
        description: "Everyday development tools",
      },
    ],
  },

  ru: {
    label: "МОИ НАВЫКИ / 02",
    badge: "ИСПОЛЬЗУЕМЫЕ ТЕХНОЛОГИИ",
    heading1: "Технологии,",
    heading2: "которые я использую.",
    subtitle:
      "Основные инструменты и frontend-технологии для создания современных адаптивных интерфейсов.",
    groups: [
      {
        title: "Фронтенд",
        description: "Интерактивные веб-интерфейсы",
      },
      {
        title: "UI и стилизация",
        description: "Современный адаптивный дизайн",
      },
      {
        title: "Данные и состояние",
        description: "Работа с API и данными",
      },
      {
        title: "Инструменты",
        description: "Инструменты для разработки",
      },
    ],
  },
};

const skillGroups: SkillGroup[] = [
  {
    number: "01",
    icon: Code2,
    skills: [
      { name: "HTML5", short: "HTML", icon: SiHtml5 },
      { name: "CSS3", short: "CSS", icon: SiCss },
      { name: "JavaScript", short: "JS", icon: SiJavascript },
      { name: "TypeScript", short: "TS", icon: SiTypescript },
      { name: "React.js", short: "React", icon: SiReact },
      { name: "Next.js", short: "Next", icon: SiNextdotjs },
    ],
  },
  {
    number: "02",
    icon: Palette,
    skills: [
      { name: "Tailwind CSS", short: "TW", icon: SiTailwindcss },
      { name: "CSS Modules", short: "CSS", icon: SiCssmodules },
      { name: "Responsive UI", short: "UI", icon: Monitor },
      { name: "Ant Design", short: "Ant", icon: SiAntdesign },
    ],
  },
  {
    number: "03",
    icon: Database,
    skills: [
      { name: "REST API", short: "API", icon: Globe },
      { name: "Axios", short: "AX", icon: SiAxios },
      { name: "React Query", short: "RQ", icon: SiReactquery },
      { name: "React Hooks", short: "Hooks", icon: Workflow },
    ],
  },
  {
    number: "04",
    icon: Wrench,
    skills: [
      { name: "Git", short: "Git", icon: SiGit },
      { name: "GitHub", short: "GH", icon: SiGithub },
      { name: "Vite", short: "Vite", icon: SiVite },
      { name: "npm", short: "npm", icon: SiNpm },
      { name: "VS Code", short: "Code", icon: VscCode },
    ],
  },
];

export default function Skills({ lang }: SkillsProps) {
  const t = translations[lang] ?? translations.en;

  return (
    <section
      id="skills"
      className={`${bodyFont.className} relative isolate overflow-hidden px-5 py-20 text-foreground transition-colors duration-500 sm:px-8 sm:py-24 md:px-10 lg:px-16`}
    >
      <style jsx>{`
        .skills-divider {
          position: relative;
          width: 100%;
          height: 1px;
          overflow: hidden;
          background: rgba(156, 163, 175, 0.18);
        }

        .skills-divider::after {
          content: "";
          position: absolute;
          top: 0;
          left: -30%;
          width: 30%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            #22d3ee,
            #6366f1,
            #a78bfa,
            transparent
          );
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.65);
          animation: skills-line-move 3.5s ease-in-out infinite;
        }

        @keyframes skills-line-move {
          0% {
            left: -30%;
          }
          100% {
            left: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skills-divider::after {
            animation: none;
          }
        }
      `}</style>

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-10 -z-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 -z-10 h-72 w-72 rounded-full bg-violet-500/[0.06] blur-[110px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center sm:mb-14">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#6366f1]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs sm:tracking-[0.22em]">
              {t.label}
            </span>

            <span className="rounded-full border border-indigo-500/25 bg-indigo-500/[0.07] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-indigo-500 dark:text-indigo-300 sm:text-[10px]">
              {t.badge}
            </span>

            <span className="h-px w-8 bg-[#6366f1]" />
          </div>

          <h2
            className={`${headingFont.className} text-4xl font-bold leading-[1.12] tracking-[-0.055em] text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]`}
          >
            {t.heading1}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              {t.heading2}
            </span>
          </h2>

          <div className="my-7 w-full max-w-xl sm:my-8">
            <div className="skills-divider" />
          </div>

          <p className="max-w-2xl text-[13px] font-normal leading-7 tracking-[0.005em] text-muted-foreground sm:text-base sm:leading-8">
            {t.subtitle}
          </p>
        </div>

        {/* Skills cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, index) => {
            const groupText = t.groups[index];
            const GroupIcon = group.icon;

            return (
              <BorderGlow
                key={group.number}
                animated
                colors={
                  index % 2 === 0
                    ? ["#22d3ee", "#6366f1", "#a78bfa"]
                    : ["#818cf8", "#38bdf8", "#c084fc"]
                }
                glowIntensity={1}
                className="h-full w-full"
              >
                <article className="group h-full rounded-xl bg-transparent p-5 transition-colors duration-300 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-cyan-400">
                      {group.number}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/[0.08] transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-400/40 group-hover:bg-indigo-500/[0.14]">
                      <GroupIcon
                        size={20}
                        strokeWidth={1.7}
                        className="text-indigo-400"
                      />
                    </div>
                  </div>

                  <h3
                    className={`${headingFont.className} text-xl font-semibold tracking-[-0.035em] text-[#6366f1] transition-colors duration-300 group-hover:text-cyan-400`}
                  >
                    {groupText.title}
                  </h3>

                  <p className="mt-2 min-h-10 text-[13px] leading-6 text-muted-foreground sm:text-sm">
                    {groupText.description}
                  </p>

                  <div className="my-5 h-px w-full bg-gradient-to-r from-indigo-500/25 via-white/10 to-transparent" />

                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => {
                      const SkillIcon = skill.icon;

                      return (
                        <div
                          key={skill.name}
                          title={skill.name}
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06]"
                        >
                          <SkillIcon
                            size={16}
                            className="shrink-0 text-cyan-400"
                          />

                          <span className="text-[11px] font-medium tracking-[-0.01em] text-gray-600 dark:text-gray-300 sm:text-xs">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </article>
              </BorderGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
}
