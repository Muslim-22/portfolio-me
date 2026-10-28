
"use client";

import { useEffect, useState, useSyncExternalStore, useRef } from "react";
import { useTheme } from "next-themes";
import { Space_Grotesk, Inter } from "next/font/google";
import {
  House,
  UserRound,
  Code2,
  FolderKanban,
  Mail,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import GooeyNav from "./GooeyNav";
import MobileNav from "./MenuNav";

type Language = "UZ" | "RU" | "EN";

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const translations = {
  UZ: ["Bosh sahifa", "Men haqimda", "Ko‘nikmalar", "Loyihalar", "Bog‘lanish"],
  RU: ["Главная", "Обо мне", "Навыки", "Проекты", "Контакты"],
  EN: ["Home", "About", "Skills", "Projects", "Contact"],
};

const icons = [House, UserRound, Code2, FolderKanban, Mail];
const links = ["#home", "#about", "#skills", "#projects", "#contact"];
const sectionIds = ["home", "about", "skills", "projects", "contact"];

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function getInitialSection() {
  if (typeof window === "undefined") return "home";

  const hash = window.location.hash.slice(1);
  return sectionIds.includes(hash) ? hash : "home";
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);

  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isDark = !mounted || theme !== "light";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // Til menyusi tashqarisiga bosilganda yopiladi
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langRef.current &&
        !langRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Aktiv sectionni kuzatish va URL hashni yangilash
  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);

      if (!sections.length) return;

      let currentSection = sections[0];

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

      if (atBottom) {
        const contactSection = document.getElementById("contact");

        if (contactSection) currentSection = contactSection;
      } else {
        const activationLine = 120;

        for (const section of sections) {
          if (section.getBoundingClientRect().top <= activationLine) {
            currentSection = section;
          } else {
            break;
          }
        }
      }

      const sectionId = currentSection.id;

      setActiveSection((previous) =>
        previous === sectionId ? previous : sectionId,
      );

      if (window.location.hash !== `#${sectionId}`) {
        window.history.replaceState(null, "", `#${sectionId}`);
      }
    };

    const scheduleUpdate = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateActiveSection();
      });
    };

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    window.addEventListener("popstate", scheduleUpdate);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      window.removeEventListener("popstate", scheduleUpdate);
    };
  }, []);

  const items = translations[lang].map((label, index) => {
    const Icon = icons[index];

    return {
      label,
      href: links[index],
      icon: <Icon size={16} />,
    };
  });

  const activeIndex = Math.max(
    0,
    links.findIndex((link) => link === `#${activeSection}`),
  );

  const handleNavigation = (index: number) => {
    const sectionId = links[index]?.slice(1);

    if (!sectionId) return;

    const section = document.getElementById(sectionId);

    if (!section) return;

    setActiveSection(sectionId);

    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState(null, "", `#${sectionId}`);
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`
        ${bodyFont.className}
        group fixed left-0 right-0 top-0 z-50 isolate
        mx-auto flex w-full max-w-7xl flex-wrap
        items-center justify-between gap-x-4 gap-y-3
        rounded-2xl border border-white/20
        bg-white/65 px-4 py-3
        shadow-[0_8px_32px_rgba(30,27,110,0.10)]
        backdrop-blur-2xl transition-all duration-300
        dark:border-white/[0.12] dark:bg-[#080b19]/65
        dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        sm:px-6 md:flex-nowrap md:px-12 md:py-4
      `}
    >
      {/* Pastki neon chiziq */}
      <div
        className="
          pointer-events-none absolute inset-x-6 bottom-0 h-px
          bg-gradient-to-r from-transparent via-indigo-500/80 to-transparent
          opacity-70 transition-all duration-500
          group-hover:inset-x-0 group-hover:opacity-100
        "
      />

      {/* Neon nur */}
      <div
        className="
          pointer-events-none absolute bottom-0 left-1/2
          h-[2px] w-1/3 -translate-x-1/2 rounded-full
          bg-indigo-400/80 opacity-40 blur-md
          transition-all duration-500
          group-hover:w-2/3 group-hover:opacity-100
        "
      />

      {/* Logo */}
      <a
        href="#home"
        aria-label="Muslim — bosh sahifa"
        className="group flex shrink-0 items-center gap-2.5"
      >
        <div className="relative flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10">
          <div
            className="
              absolute inset-0 rounded-[14px] bg-indigo-500/20 blur-md
              transition-all duration-500
              group-hover:bg-indigo-500/40 group-hover:blur-lg
            "
          />

          <div
            className="
              relative flex h-full w-full items-center justify-center
              overflow-hidden rounded-[13px] border border-white/25
              bg-gradient-to-br from-[#a5b4fc] via-[#6366f1] to-[#312e81]
              shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_3px_10px_rgba(99,102,241,0.25)]
              transition-all duration-500
              group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]
              group-hover:scale-105
            "
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/15" />

            <div className="absolute inset-[3px] rounded-[10px] border border-white/20 transition-all duration-500 group-hover:inset-[2px] group-hover:border-white/40" />

            <span
              className={`
                ${headingFont.className}
                relative -translate-x-px text-[21px] font-bold italic
                leading-none tracking-[-0.1em] text-white
                drop-shadow-[0_2px_3px_rgba(30,27,75,0.35)]
                sm:text-2xl
              `}
            >
              M<span className="text-indigo-200">.</span>
            </span>

            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-1/2 -translate-x-1/2 rounded-full bg-white/60 blur-[1px] transition-all duration-500 group-hover:w-3/4" />
          </div>
        </div>

        <span
          className={`
            ${headingFont.className}
            relative inline-flex items-baseline text-[21px]
            font-bold leading-none tracking-[-0.055em] sm:text-2xl
          `}
        >
          <span className="text-[#18181b] transition-colors duration-300 group-hover:text-[#4f46e5] dark:text-[#f4f4f5] dark:group-hover:text-white">
            Mus
          </span>

          <span className="bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#4f46e5] bg-clip-text text-transparent transition-all duration-500 group-hover:tracking-[-0.02em]">
            lim
          </span>

          <span className="ml-[2px] inline-block bg-gradient-to-br from-[#818cf8] to-[#4f46e5] bg-clip-text text-transparent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-125">
            .
          </span>

          <span className="absolute -bottom-[5px] left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-transparent transition-all duration-500 ease-out group-hover:w-full" />
        </span>
      </a>

      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {/* Desktop navigatsiya */}
        <div className="hidden min-w-0 items-center gap-3 md:flex">
          {mounted ? (
            <GooeyNav
              items={items}
              initialActiveIndex={activeIndex}
              activeIndex={activeIndex}
              theme={theme === "light" ? "light" : "dark"}
              color="#6366f1"
              activeTextColor="#ffffff"
              size="sm"
              frame={true}
              particleCount={15}
              spread={56}
              animationTime={600}
              timeVariance={300}
              gooeyness={0.5}
              wobble={0.5}
              hoverEffect={true}
              onChange={(index: number) => handleNavigation(index)}
            />
          ) : (
            <div
              aria-hidden="true"
              className="h-10 w-40 rounded-xl border border-white/10"
            />
          )}
        </div>

        {/* Til tanlash */}
        <div ref={langRef} className="relative">
          <div
            className="
              group relative flex h-8 min-w-[64px] items-center
              justify-between gap-1.5 rounded-lg border px-2
              border-black/[0.09] bg-white/70 shadow-sm shadow-black/[0.03]
              backdrop-blur-xl transition-all duration-300
              hover:border-indigo-500/40 hover:bg-indigo-50/80
              hover:shadow-[0_0_16px_rgba(99,102,241,0.12)]
              dark:border-white/[0.10] dark:bg-white/[0.04]
              dark:hover:border-indigo-400/40 dark:hover:bg-indigo-500/[0.08]
            "
          >
            <div className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/20" />

            <button
              type="button"
              onClick={() => setIsLangOpen((previous) => !previous)}
              aria-label="Tilni tanlash"
              aria-expanded={isLangOpen}
              className="relative flex h-full w-full items-center justify-between gap-1.5"
            >
              <span className={`${headingFont.className} text-[11px] font-bold tracking-wider text-[#8b8b8b] transition-colors group-hover:text-indigo-600 dark:text-[#a1a1aa] dark:group-hover:text-indigo-300`}>
                {lang}
              </span>

              <span className="h-3 w-px bg-black/10 dark:bg-white/10" />

              <ChevronDown
                size={12}
                className={`text-[#8b8b8b] transition-all duration-300 group-hover:text-indigo-600 dark:text-[#a1a1aa] dark:group-hover:text-indigo-300 ${
                  isLangOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <div
            className={`
              absolute right-0 top-full z-[100] mt-2 min-w-[100px]
              origin-top-right rounded-xl border border-gray-200
              bg-white/95 p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl
              transition-all duration-200
              dark:border-white/10 dark:bg-[#08080d]/95 dark:shadow-black/40
              ${
                isLangOpen
                  ? "visible translate-y-0 scale-100 opacity-100"
                  : "invisible -translate-y-2 scale-95 opacity-0"
              }
            `}
          >
            {(["UZ", "RU", "EN"] as Language[]).map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => {
                  setLang(language);
                  setIsLangOpen(false);
                }}
                className={`
                  ${headingFont.className}
                  flex w-full items-center justify-between rounded-lg
                  px-3 py-2 text-[11px] font-semibold tracking-wider
                  transition-all duration-200
                  ${
                    lang === language
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                      : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-white/[0.06] dark:hover:text-indigo-300"
                  }
                `}
              >
                {language}

                {lang === language && (
                  <span className="ml-3 text-indigo-600 dark:text-indigo-300">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dark / Light mode */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Rang rejimini almashtirish"
          title={isDark ? "Oq rejim" : "Qora rejim"}
          className="
            group relative flex h-8 w-8 shrink-0 items-center justify-center
            overflow-hidden rounded-lg border border-black/[0.09] bg-white/70
            text-[#8b8b8b] shadow-sm shadow-black/[0.03] backdrop-blur-xl
            transition-all duration-300 hover:scale-105
            hover:border-indigo-500/40 hover:bg-indigo-50/80
            hover:text-indigo-600 hover:shadow-[0_0_16px_rgba(99,102,241,0.12)]
            active:scale-95 dark:border-white/[0.10] dark:bg-white/[0.04]
            dark:text-[#a1a1aa] dark:hover:border-indigo-400/40
            dark:hover:bg-indigo-500/[0.08] dark:hover:text-indigo-300
          "
        >
          <span className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/20" />

          {isDark ? (
            <Sun
              size={15}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          ) : (
            <Moon
              size={15}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-rotate-12"
            />
          )}
        </button>

        {/* Mobil menyu tugmasi */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          aria-label={mobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-panel"
          className="
            group relative z-[70] flex h-9 w-9 shrink-0 items-center
            justify-center overflow-hidden rounded-xl border
            border-indigo-500/20 bg-white/70 text-indigo-600
            shadow-[0_2px_8px_rgba(99,102,241,0.06)] backdrop-blur-xl
            transition-all duration-300 ease-out hover:border-indigo-500/60
            hover:bg-indigo-500 hover:text-white
            hover:shadow-[0_0_20px_rgba(99,102,241,0.45)] hover:scale-105
            active:scale-95 dark:border-indigo-400/20 dark:bg-white/[0.04]
            dark:text-indigo-300 dark:hover:border-indigo-400/70
            dark:hover:bg-indigo-500/25 dark:hover:text-white
            md:hidden
          "
        >
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-400/0 via-indigo-500/0 to-violet-500/0 transition-all duration-300 group-hover:from-indigo-400/30 group-hover:via-indigo-500/20 group-hover:to-violet-500/40" />

          <span className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {mobileMenuOpen ? (
            <X
              size={19}
              strokeWidth={2}
              className="relative z-10 transition-transform duration-300 group-hover:rotate-90"
            />
          ) : (
            <Menu
              size={19}
              strokeWidth={2}
              className="relative z-10 transition-transform duration-300 group-hover:rotate-180"
            />
          )}
        </button>

        {/* Mobil navigatsiya */}
        <div className="md:hidden">
          <MobileNav
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
            lang={lang.toLowerCase() as "uz" | "ru" | "en"}
          />
        </div>
      </div>
    </header>
  );
}
