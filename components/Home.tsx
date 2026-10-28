
"use client";

import { Space_Grotesk, Inter } from "next/font/google";
import { useTheme } from "next-themes";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import DeveloperCard from "./DeveloperCard";

const headingFont = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hero-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-hero-body",
  display: "swap",
});

type Language = "uz" | "ru" | "en";

interface HeroProps {
  lang?: Language;
}

const content = {
  uz: {
    available: "Portfolioimga xush kelibsiz",
    hello: "Salom, mening ismim",
    role: "Frontend",
    role2: "Dasturchi",
    description:
      "Men React, TypeScript va Next.js yordamida zamonaviy, moslashuvchan hamda foydalanish uchun qulay veb-ilovalar yarataman. Professional jamoa tarkibida tajriba orttirish va kasbiy jihatdan o‘sishni maqsad qilganman.",
    projects: "Loyihalarimni ko‘rish",
    contact: "Bog‘lanish",
    specializing: "Asosiy texnologiyalar",
    uiLibrary: "UI kutubxonasi",
    framework: "React freymvorki",
    passion: "Chiroyli interfeyslar yaratish",
    ready: "Yangi loyihalarga tayyor",
  },
  ru: {
    available: "Добро пожаловать в моё портфолио",
    hello: "Привет, меня зовут",
    role: "Фронтенд",
    role2: "разработчик",
    description:
      "Я создаю современные, гибкие и простые в использовании веб-приложения, используя React, TypeScript и Next.js. Моя цель — получить опыт и профессионально развиваться в составе профессиональной команды.",
    projects: "Мои проекты",
    contact: "Связаться",
    specializing: "Основные технологии",
    uiLibrary: "UI-библиотека",
    framework: "Фреймворк React",
    passion: "Создание красивых интерфейсов",
    ready: "Готов к новым проектам",
  },
  en: {
    available: "Welcome to My Portfolio",
    hello: "Hello, I'm",
    role: "Frontend",
    role2: "Developer",
    description:
      "I build modern, responsive web apps that are easy to use, with React, TypeScript, and Next.js. I'm looking to gain experience and grow in a professional team.",
    projects: "Explore My Projects",
    contact: "Get in Touch",
    specializing: "Core Technologies",
    uiLibrary: "UI Library",
    framework: "React Framework",
    passion: "Crafting beautiful interfaces",
    ready: "Ready for new projects",
  },
};

const firstName = "Muslim";
const lastName = "Ikromov";

const letterColors = [
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#FFFFFF",
  "#6366F1",
  "#6366F1",
  "#6366F1",
];

const LETTER_DELAY = 0.9;
const LETTER_DURATION = 0.4;
const FIRST_LETTER_DELAY = 0.1;
const RESTART_DELAY = 5;

const LAST_LETTER_TIME =
  FIRST_LETTER_DELAY + lastName.length * LETTER_DELAY + LETTER_DURATION;

const CYCLE_DURATION = (LAST_LETTER_TIME + RESTART_DELAY) * 1000;

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Hero({ lang = "en" }: HeroProps) {
  const t = content[lang];

  const [animationCycle, setAnimationCycle] = useState(0);
  const [activeLetters, setActiveLetters] = useState<number[]>([]);

  const { resolvedTheme } = useTheme();

  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Server va birinchi client renderida bir xil rang ishlatiladi.
  const isDark = !mounted || resolvedTheme !== "light";

  const mainTextColor = isDark ? "#FFFFFF" : "#27272A";
  const secondaryTextColor = isDark ? "#9CA3AF" : "#52525B";

  useEffect(() => {
    const timers: number[] = [];

    letterColors.forEach((_, index) => {
      const timer = window.setTimeout(
        () => {
          setActiveLetters((current) => {
            if (current.includes(index)) {
              return current;
            }

            return [...current, index];
          });
        },
        (FIRST_LETTER_DELAY + index * LETTER_DELAY) * 1000,
      );

      timers.push(timer);
    });

    const restartTimer = window.setTimeout(() => {
      setActiveLetters([]);
      setAnimationCycle((current) => current + 1);
    }, CYCLE_DURATION);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(restartTimer);
    };
  }, [animationCycle]);

  return (
    <section
      id="home"
      className={`${headingFont.variable} ${bodyFont.variable} hero-fonts mx-auto grid min-h-[calc(100svh-76px)] w-full max-w-7xl grid-cols-1 items-center gap-10 overflow-hidden px-4 pb-12 pt-24 sm:gap-12 sm:px-6 sm:pb-16 sm:pt-28 md:grid-cols-2 md:gap-10 md:px-10 md:pb-20 lg:gap-16 lg:px-16`}
    >
      <style jsx>{`
        .hero-fonts {
          font-family: var(--font-hero-body), sans-serif;
        }

        .hero-fonts h1,
        .hero-fonts h2 {
          font-family: var(--font-hero-heading), sans-serif;
        }

        .hero-name {
          font-family: var(--font-hero-heading), sans-serif;
          font-size: clamp(2.4rem, 6.5vw, 4.75rem);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.065em;
          overflow-wrap: anywhere;
          font-kerning: normal;
          text-wrap: balance;
        }

        .hero-first-name,
        .hero-last-name {
          display: block;
          width: fit-content;
          max-width: 100%;
        }

        .hero-first-name {
          color: ${mainTextColor};
        }

        .hero-first-letter {
          display: inline-block;
          transition: color 0.35s ease;
        }

        .hero-last-name {
          display: flex;
          flex-wrap: nowrap;
          margin-left: clamp(0.35em, 4vw, 1.15em);
          margin-top: 0.08em;
          min-height: 1.08em;
          padding-right: 0.08em;
        }

        .hero-letter {
          display: inline-block;
          opacity: 0;
          animation: letterReveal 0.4s
            cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
          animation-delay: calc(var(--letter-index) * ${LETTER_DELAY}s);
        }

        .hero-role {
          font-family: var(--font-hero-heading), sans-serif;
          font-weight: 600;
          letter-spacing: -0.035em;
        }

        .hero-description {
          font-family: var(--font-hero-body), sans-serif;
          letter-spacing: -0.015em;
          text-wrap: pretty;
        }

        .hero-button {
          font-family: var(--font-hero-body), sans-serif;
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease;
        }

        .hero-button:hover {
          transform: translateY(-2px);
        }

        @keyframes letterReveal {
          from {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @media (min-width: 768px) {
          .hero-name {
            font-size: clamp(3rem, 5.2vw, 4.75rem);
          }
        }

        @media (max-width: 380px) {
          .hero-name {
            font-size: clamp(1.9rem, 9vw, 2.25rem);
            letter-spacing: -0.055em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-letter {
            animation: none;
            opacity: 1;
            transform: none;
            filter: none;
          }

          .hero-first-letter,
          .hero-button {
            transition: none;
          }
        }
      `}</style>

      {/* LEFT SIDE — INTRODUCTION */}
      <div className="relative z-10 min-w-0">
        {/* Status */}
        <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1.5 sm:mb-5">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/50" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>

          <span className="text-[10px] font-medium tracking-wide text-emerald-600 dark:text-emerald-300/90 sm:text-[11px]">
            Junior Frontend Developer
          </span>
        </div>

        {/* Name and surname */}
        <div className="min-w-0">
          <p
            className="mb-3 text-xs font-medium sm:text-sm"
            style={{ color: secondaryTextColor }}
          >
            {t.hello}
          </p>

          <h1 className="hero-name">
            {/* First name */}
            <span className="hero-first-name">
              {firstName.split("").map((letter, index) => (
                <span
                  key={index}
                  className="hero-first-letter"
                  style={{
                    color:
                      activeLetters.includes(index) && index >= 3
                        ? "#6366F1"
                        : mainTextColor,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>

            {/* Surname */}
            <span
              key={animationCycle}
              className="hero-last-name"
              aria-label={`${lastName}.`}
            >
              {lastName.split("").map((letter, index) => (
                <span
                  key={`${animationCycle}-${index}`}
                  className="hero-letter"
                  style={
                    {
                      "--letter-index": index,
                      color: index >= 4 ? "#6366F1" : mainTextColor,
                      marginLeft: index === 0 ? "-3px" : "0",
                    } as CSSProperties
                  }
                >
                  {letter}
                </span>
              ))}

              {/* Period after surname */}
              <span
                className="hero-letter"
                style={
                  {
                    "--letter-index": lastName.length,
                    color: "#818cf8",
                  } as CSSProperties
                }
              >
                .
              </span>
            </span>
          </h1>

          <h2
            className="hero-role mt-4 text-base sm:mt-5 sm:text-xl"
            style={{ color: isDark ? "#D1D5DB" : "#3F3F46" }}
          >
            {t.role} {t.role2}
          </h2>
        </div>

        {/* Description */}
        <p
          className="hero-description mt-4 max-w-md text-[13px] leading-6 sm:text-[15px] sm:leading-7"
          style={{ color: secondaryTextColor }}
        >
          {t.description}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col items-stretch gap-3 min-[380px]:flex-row min-[380px]:flex-wrap min-[380px]:items-center">
          <a
            href="#projects"
            className="hero-button group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-center text-sm font-medium text-white shadow-md shadow-indigo-500/15 hover:bg-indigo-400 hover:shadow-indigo-500/25"
          >
            {t.projects}

            <svg
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>

          <a
            href="#contact"
            className="hero-button group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-4 py-2.5 text-center text-sm font-medium text-indigo-600 shadow-md shadow-indigo-500/10 hover:border-indigo-500/40 hover:bg-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/20 dark:text-indigo-300"
          >
            {t.contact}

            <svg
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>

      {/* RIGHT SIDE — DEVELOPER CARD */}
      <div className="mx-auto w-full min-w-0 max-w-[480px] md:max-w-none">
        <DeveloperCard t={t} />
      </div>
    </section>
  );
}
