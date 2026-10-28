"use client";

import { useEffect, useState } from "react";

const technologies = [
  {
    name: "React",
    label: "UI Library",
    color: "#61DAFB",
    className: "react",
    title: "Building interactive UI",
    description: "Reusable components, hooks and dynamic interfaces.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
        <circle cx="20" cy="20" r="2.8" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1.5">
          <ellipse cx="20" cy="20" rx="17" ry="6.8" />
          <ellipse
            cx="20"
            cy="20"
            rx="17"
            ry="6.8"
            transform="rotate(60 20 20)"
          />
          <ellipse
            cx="20"
            cy="20"
            rx="17"
            ry="6.8"
            transform="rotate(120 20 20)"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "Next.js",
    label: "Framework",
    color: "#ffffff",
    className: "next",
    title: "Creating modern web apps",
    description: "Fast pages, routing and full-stack capabilities.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
        <circle cx="20" cy="20" r="17" fill="#fff" />
        <path
          d="M12 28V12l17 19"
          stroke="#080811"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M25 12v10"
          stroke="#080811"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    label: "Type Safety",
    color: "#3178C6",
    className: "ts",
    title: "Writing reliable code",
    description: "Typed JavaScript for safer, maintainable projects.",
    icon: (
      <svg viewBox="0 0 40 40" className="h-9 w-9">
        <rect x="2" y="2" width="36" height="36" rx="5" fill="#3178C6" />
        <path
          d="M8 16h17M16.5 16v14M27 21c-6-3-9 3-3 5s5 6-1 6c-2 0-4-1-5-2"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

type DeveloperCardProps = {
  t: {
    role: string;
    role2: string;
    passion: string;
    ready: string;
    uiLibrary: string;
    framework: string;
  };
};

export default function DeveloperCard({ t }: DeveloperCardProps) {
  const [active, setActive] = useState("React");

  // Har 2 sekundda keyingi texnologiyaga o'tadi.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => {
        const index = technologies.findIndex((tech) => tech.name === current);

        return technologies[(index + 1) % technologies.length].name;
      });
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const selected =
    technologies.find((tech) => tech.name === active) ?? technologies[0];

  return (
    <div className="tech-scene relative mx-auto w-full max-w-[410px] py-10">
      <style jsx>{`
        .tech-scene {
          perspective: 1000px;
          isolation: isolate;
        }

        .tech-card {
          transform-style: preserve-3d;
          animation: cardGlow 4s ease-in-out infinite;
          transition:
            transform 0.5s ease,
            border-color 0.4s ease,
            box-shadow 0.4s ease;
        }

        .tech-card:hover {
          transform: rotateX(2deg) rotateY(-2deg) translateY(-4px);
          border-color: rgba(129, 140, 248, 0.65);
          box-shadow:
            0 25px 80px rgba(79, 70, 229, 0.28),
            0 0 30px rgba(129, 140, 248, 0.15);
        }

        .orbit {
          position: absolute;
          inset: -3%;
          border: 1px solid rgba(129, 140, 248, 0.35);
          border-radius: 50%;
          animation: orbit 12s linear infinite;
          pointer-events: none;
          box-shadow:
            0 0 14px rgba(99, 102, 241, 0.15),
            inset 0 0 14px rgba(99, 102, 241, 0.07);
        }

        .orbit::before,
        .orbit::after {
          content: "";
          position: absolute;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #a5b4fc;
          box-shadow:
            0 0 8px #818cf8,
            0 0 20px #818cf8,
            0 0 35px rgba(129, 140, 248, 0.8);
        }

        .orbit::before {
          top: 10%;
          left: 15%;
        }

        .orbit::after {
          bottom: 10%;
          right: 15%;
          background: #d8b4fe;
          box-shadow:
            0 0 8px #c084fc,
            0 0 20px #c084fc,
            0 0 35px rgba(192, 132, 252, 0.8);
        }

        .tech-icon {
          animation:
            bob 3s ease-in-out infinite,
            iconGlow 3s ease-in-out infinite;
          transition:
            transform 0.3s ease,
            filter 0.3s ease;
        }

        .tech-icon:hover {
          transform: scale(1.12) rotate(-5deg);
          filter: brightness(1.3);
        }

        .react {
          animation-delay: 0s, 0s;
        }

        .next {
          animation-delay:
            -1s,
            -1s;
        }

        .ts {
          animation-delay:
            -2s,
            -2s;
        }

        .tech-chip {
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .tech-chip:hover {
          transform: translateY(-4px);
        }

        .tech-chip[aria-pressed="true"] {
          border-color: rgba(129, 140, 248, 0.8);
          background: rgba(99, 102, 241, 0.2);
          box-shadow:
            0 0 12px rgba(99, 102, 241, 0.2),
            inset 0 0 14px rgba(99, 102, 241, 0.08);
        }

        .glow-bg {
          animation: backgroundGlow 5s ease-in-out infinite;
        }

        .shine {
          animation: shine 5s ease-in-out infinite;
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bob {
          0%,
          100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -9px;
          }
        }

        @keyframes iconGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 4px rgba(129, 140, 248, 0.2));
          }
          50% {
            filter: drop-shadow(0 0 13px rgba(129, 140, 248, 0.7));
          }
        }

        @keyframes cardGlow {
          0%,
          100% {
            box-shadow: 0 20px 65px rgba(79, 70, 229, 0.12);
          }
          50% {
            box-shadow:
              0 20px 65px rgba(79, 70, 229, 0.23),
              0 0 22px rgba(129, 140, 248, 0.1);
          }
        }

        @keyframes backgroundGlow {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(350%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit,
          .tech-icon,
          .tech-card,
          .shine,
          .glow-bg {
            animation: none !important;
          }

          .tech-card,
          .tech-chip,
          .tech-icon {
            transition: none !important;
          }
        }
      `}</style>

      {/* Kattaroq, aylanadigan neon orbitlar */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-bg absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/25 blur-[85px] opacity-100" />
       <div className="orbit" style={{ inset: "7%" }} />
        <div
          className="orbit"
          style={{
            inset: "7%",
            animationDirection: "reverse",
            animationDuration: "20s",
            borderColor: "rgba(192, 132, 252, 0.22)",
          }}
        />
      </div>

      {/* Uchta suzib yuradigan texnologiya ikonasi */}
      <div className="pointer-events-none absolute inset-0">
        {technologies.map((tech, index) => (
          <div
            key={tech.name}
            className={`tech-icon ${tech.className} pointer-events-auto absolute z-20`}
            style={{
              top: index === 0 ? "0%" : index === 1 ? "40%" : "78%",
              left: index === 0 ? "0%" : "auto",
              right: index === 0 ? "auto" : index === 1 ? "0%" : "2%",
              filter: `drop-shadow(0 0 12px ${tech.color}55)`,
            }}
          >
            <div className="group relative flex h-[48px] w-[48px] items-center justify-center rounded-2xl border border-white/10 bg-[#11111e]/95 shadow-xl backdrop-blur-xl">
              {" "}
              {tech.icon}
              <span
                className="absolute -bottom-2 -right-2 h-3 w-3 rounded-full border-2 border-[#11111e]"
                style={{ backgroundColor: tech.color }}
              />
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#11111e] px-2 py-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Asosiy kartochka */}
      <div className="tech-card relative z-10 mx-5 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b14]/95 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.09] via-transparent to-violet-500/[0.08]" />

        {/* Yuqori panel */}
        <div className="relative flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>

          <span className="font-mono text-[10px] text-white/45">
            portfolio.tsx
          </span>

          <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Available
          </span>
        </div>

        {/* Profil */}
        <div className="relative px-5 pb-5 pt-6">
          <div className="flex items-center gap-4"></div>

          {/* Bosiladigan texnologiya tugmalari */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {technologies.map((tech) => (
              <button
                key={tech.name}
                type="button"
                onClick={() => setActive(tech.name)}
                aria-pressed={active === tech.name}
                className={`tech-chip flex min-w-0 flex-col items-center gap-2 rounded-xl border px-1 py-3 ${
                  active === tech.name
                    ? "border-indigo-400/50 bg-indigo-500/15"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <span className="flex h-9 items-center justify-center">
                  {tech.icon}
                </span>

                <span className="text-[10px] font-semibold text-white">
                  {tech.name}
                </span>

                <span
                  className={`h-1 w-5 rounded-full transition-all ${
                    active === tech.name
                      ? "bg-indigo-400 shadow-[0_0_10px_#818cf8]"
                      : "bg-white/10"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Avtomatik yangilanadigan ma'lumot */}
          <div
            className="mt-4 rounded-xl border border-white/[0.08] bg-black/20 p-3 transition-colors duration-500"
            style={{
              borderColor: `${selected.color}45`,
              boxShadow: `inset 0 0 20px ${selected.color}0c`,
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-indigo-300">
                {active === "React"
                  ? "01 / component"
                  : active === "Next.js"
                    ? "02 / framework"
                    : "03 / type safety"}
              </span>

              <span
                className="text-[10px] transition-colors duration-500"
                style={{ color: selected.color }}
              >
                ● Selected
              </span>
            </div>

            <p className="mt-2 text-sm font-semibold text-white">
              {selected.title}
            </p>

            <p className="mt-1 text-xs leading-relaxed text-white/45">
              {selected.description}
            </p>
          </div>

          {/* Ko'nikmalar */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["Responsive UI", "Clean Code", "Modern Web"].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[10px] text-white/55"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Pastki panel */}
        <div className="relative overflow-hidden border-t border-white/[0.08] px-5 py-3">
          <div className="shine pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] text-white/40">{t.ready}</span>

            <span className="font-mono text-[10px] text-indigo-300">
              {"<Code />"}
            </span>
          </div>
        </div>
      </div>

      <p className="relative z-10 mt-5 text-center text-xs text-white/50">
        {t.role}
        <span className="mx-2 text-indigo-400">✦</span>
        {t.role2}
      </p>
    </div>
  );
}
