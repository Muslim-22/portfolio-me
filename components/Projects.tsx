"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  X,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import BorderGlow from "./BorderGlow";

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

type Language = "uz" | "en" | "ru";

type ProjectsProps = {
  lang: Language;
};

type Project = {
  number: string;
  title: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  technologies: string[];
  github: string;
  demo: string;
  login?: string;
  password?: string;
};

const translations = {
  uz: {
    label: "LOYIHALARIM / 03",
    eyebrow: "YANGI LOYIHALAR",
    heading1: "Men yaratgan",
    heading2: "veb-loyihalar.",
    description:
      "Bu yerda men ishlab chiqqan veb-saytlar, admin panellar va frontend loyihalarim bilan tanishishingiz mumkin.",
    completed: "Tayyor",
    details: "Loyihani ko‘rish",
    about: "Loyiha haqida",
    features: "Asosiy imkoniyatlar",
    technologies: "Ishlatilgan texnologiyalar",
    credentials: "Demo uchun kirish ma’lumotlari",
    email: "Email",
    password: "Parol",
    liveDemo: "Loyihani ochish",
    sourceCode: "Kodini ko‘rish",
    close: "Yopish",
    project: "LOYIHA",
  },
  en: {
    label: "PROJECTS / 03",
    eyebrow: "RECENT PROJECTS",
    heading1: "Things I've",
    heading2: "built for the web.",
    description:
      "Explore the websites, admin panels, and frontend applications I've built using modern web technologies.",
    completed: "Completed",
    details: "View project",
    about: "About the project",
    features: "Key features",
    technologies: "Technologies used",
    credentials: "Demo login credentials",
    email: "Email",
    password: "Password",
    liveDemo: "View live project",
    sourceCode: "View source code",
    close: "Close",
    project: "PROJECT",
  },
  ru: {
    label: "МОИ ПРОЕКТЫ / 03",
    eyebrow: "НОВЫЕ ПРОЕКТЫ",
    heading1: "Мои",
    heading2: "веб-проекты.",
    description:
      "Здесь вы можете ознакомиться с созданными мной сайтами, административными панелями и frontend-приложениями.",
    completed: "Готово",
    details: "Посмотреть проект",
    about: "О проекте",
    features: "Основные возможности",
    technologies: "Используемые технологии",
    credentials: "Данные для входа в демо",
    email: "Email",
    password: "Пароль",
    liveDemo: "Открыть проект",
    sourceCode: "Посмотреть код",
    close: "Закрыть",
    project: "ПРОЕКТ",
  },
};

const projects: Project[] = [
  {
    number: "01",
    title: "Bizda CRM",
    category: "ONLINE SHOP · ADMIN PANEL",
    image: "/Bizda.jpg",
    description:
      "An online shop admin panel for managing products, orders, customers, and the catalog.",
    features: [
      "Dashboard and key metrics",
      "Order management",
      "Products and categories",
      "Customers and brands",
      "Profile and banner management",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Ant Design",
      "React Query",
      "REST API",
    ],
    login: "admin@example.com",
    password: "Admin123!",
    github: "https://github.com/YoldoshevOtabek/bizdaCrm",
    demo: "https://online-shop-crm-odyy.vercel.app/login",
  },
  {
    number: "02",
    title: "Your Project",
    category: "WEB APPLICATION",
    image: "/bizdaShop.jpg",
    description:
      "A modern web application with a responsive interface and clean user experience.",
    features: [
      "Responsive interface",
      "Reusable components",
      "Modern user experience",
    ],
    technologies: ["React.js", "TypeScript", "Tailwind CSS"],
    github: "#",
    demo: "#",
  },
  {
    number: "03",
    title: "Your Project",
    category: "DASHBOARD",
    image: "/shoping.jpg",
    description:
      "A responsive dashboard designed for efficient data management and navigation.",
    features: ["Responsive dashboard", "Data management", "Simple navigation"],
    technologies: ["Next.js", "React", "TypeScript"],
    github: "https://github.com/Muslim-22/Products",
    demo: "https://products-delta-ecru.vercel.app/",
  },
];

export default function Projects({ lang }: ProjectsProps) {
  const t = translations[lang] ?? translations.en;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) {
      document.body.classList.remove("project-modal-open");
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.classList.add("project-modal-open");
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("project-modal-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className={`${bodyFont.className} relative isolate overflow-hidden px-5 py-20 text-foreground transition-colors duration-500 sm:px-8 md:px-10 lg:px-16`}
    >
      <style jsx>{`
        .projects-divider {
          position: relative;
          width: 100%;
          height: 1px;
          overflow: hidden;
          background: rgba(156, 163, 175, 0.18);
        }

        .projects-divider::after {
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
          animation: projects-line-move 3.5s ease-in-out infinite;
        }

        @keyframes projects-line-move {
          0% {
            left: -30%;
          }
          100% {
            left: 100%;
          }
        }

        .project-status-dot {
          animation: project-pulse 2s ease-in-out infinite;
        }

        @keyframes project-pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.4);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.82);
            box-shadow: 0 0 0 5px rgba(52, 211, 153, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .projects-divider::after,
          .project-status-dot {
            animation: none;
          }
        }
      `}</style>

      {/* Fon yoritishlari */}
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
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
            <span className="h-px w-8 bg-indigo-500" />

            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {t.label}
            </span>

            <span className="rounded-full border border-indigo-500/25 bg-indigo-500/[0.07] px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-indigo-500 dark:text-indigo-300">
              {t.eyebrow}
            </span>

            <span className="h-px w-8 bg-indigo-500" />
          </div>

          <h2
            className={`${headingFont.className} text-4xl font-bold leading-[1.12] tracking-[-0.055em] text-foreground sm:text-5xl md:text-6xl`}
          >
            {t.heading1}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              {t.heading2}
            </span>
          </h2>

          <div className="my-7 w-full max-w-xl">
            <div className="projects-divider" />
          </div>

          <p className="max-w-2xl text-sm font-normal leading-7 tracking-[0.005em] text-muted-foreground sm:text-base sm:leading-8">
            {t.description}
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <BorderGlow
              key={project.number}
              animated
              colors={
                index % 2 === 0
                  ? ["#22d3ee", "#6366f1", "#a78bfa"]
                  : ["#818cf8", "#38bdf8", "#c084fc"]
              }
              glowIntensity={1}
              className="h-full w-full"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[inherit] bg-transparent transition-colors duration-300">
                <div className="relative m-3 aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                  <span
                    className={`${headingFont.className} absolute left-3 top-3 rounded-md border border-white/15 bg-black/45 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-md`}
                  >
                    {t.project} {project.number}
                  </span>

                  <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md">
                    <span className="project-status-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {t.completed}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-300">
                    {project.category}
                  </p>

                  <h3
                    className={`${headingFont.className} mt-3 text-2xl font-bold tracking-[-0.035em] text-foreground transition-colors duration-300 group-hover:text-indigo-500 sm:text-[26px]`}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm font-normal leading-7 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs font-medium tracking-[0.01em] text-gray-500 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}

                    {project.technologies.length > 4 && (
                      <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2 text-xs font-medium text-muted-foreground">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="mt-6 flex w-full items-center justify-between rounded-lg border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-3 text-sm font-semibold tracking-[-0.01em] text-indigo-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/[0.06] dark:text-indigo-300"
                  >
                    <span>{t.details}</span>
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </article>
            </BorderGlow>
          ))}
        </div>
      </div>

      {/* Project details modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-md sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-background text-foreground shadow-2xl shadow-black/30"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]"
            />

            <div className="relative flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-7">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-indigo-500 dark:text-indigo-300">
                  {t.project} {selectedProject.number}
                </p>

                <h3
                  id="project-modal-title"
                  className={`${headingFont.className} mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl`}
                >
                  {selectedProject.title}
                </h3>

                <p className="mt-2 text-[10px] font-semibold tracking-[0.15em] text-muted-foreground">
                  {selectedProject.category}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label={t.close}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-muted-foreground transition-colors hover:border-cyan-400/40 hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                  <h4
                    className={`${headingFont.className} flex items-center gap-2 text-base font-semibold tracking-tight`}
                  >
                    <Code2 size={16} className="text-cyan-400" />
                    {t.about}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.login && (
                  <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] p-5">
                    <h4
                      className={`${headingFont.className} text-base font-semibold tracking-tight`}
                    >
                      {t.credentials}
                    </h4>

                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-muted-foreground">{t.email}</span>
                        <code className="break-all rounded-md bg-white/[0.05] px-2.5 py-1.5 text-xs">
                          {selectedProject.login}
                        </code>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-muted-foreground">
                          {t.password}
                        </span>
                        <code className="rounded-md bg-white/[0.05] px-2.5 py-1.5 text-xs">
                          {selectedProject.password}
                        </code>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                  <h4
                    className={`${headingFont.className} text-base font-semibold tracking-tight`}
                  >
                    {t.features}
                  </h4>

                  <div className="projects-divider my-4" />

                  <ul className="space-y-3">
                    {selectedProject.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-cyan-400">
                          <Check size={12} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                  <h4
                    className={`${headingFont.className} text-base font-semibold tracking-tight`}
                  >
                    {t.technologies}
                  </h4>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-cyan-500 dark:text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedProject.demo !== "#" && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-400"
                    >
                      {t.liveDemo}
                      <ExternalLink size={15} />
                    </a>
                  )}

                  {selectedProject.github !== "#" && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]"
                    >
                      <SiGithub size={16} />
                      {t.sourceCode}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                >
                  <ArrowDownRight size={16} />
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
