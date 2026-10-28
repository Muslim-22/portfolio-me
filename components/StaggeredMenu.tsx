"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Space_Grotesk, Inter } from "next/font/google";
import type { IconType } from "react-icons";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
});

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
  icon?: IconType;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
  icon?: IconType;
}

type Language = "uz" | "ru" | "en";

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showToggle?: boolean;
  lang?: Language;
}

const headings: Record<Language, { navigation: string; socials: string }> = {
  uz: {
    navigation: "NAVIGATSIYA",
    socials: "IJTIMOIY TARMOQLAR",
  },
  ru: {
    navigation: "НАВИГАЦИЯ",
    socials: "СОЦСЕТИ",
  },
  en: {
    navigation: "NAVIGATION",
    socials: "SOCIALS",
  },
};

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#080b19", "#312e81"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = false,
  className,
  menuButtonColor = "#6366f1",
  openMenuButtonColor = "#6366f1",
  changeMenuColorOnOpen = true,
  accentColor = "#818cf8",
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  open: controlledOpen,
  onOpenChange,
  lang = "en",
}) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const openRef = useRef(open);
  const panelRef = useRef<HTMLElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);

  const setMenuOpen = useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [controlledOpen, onOpenChange],
  );

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const preContainer = preLayersRef.current;

    if (!panel) return;

    const layers = preContainer
      ? (Array.from(
          preContainer.querySelectorAll(".sm-prelayer"),
        ) as HTMLElement[])
      : [];

    preLayerElsRef.current = layers;

    const offscreen = position === "left" ? -100 : 100;

    gsap.set([panel, ...layers], {
      xPercent: offscreen,
    });

    return () => {
      gsap.killTweensOf([panel, ...layers]);
    };
  }, [position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel"),
    ) as HTMLElement[];

    const navigationTitle = panel.querySelector(
      ".sm-menu-eyebrow",
    ) as HTMLElement | null;

    const socialTitle = panel.querySelector(
      ".sm-socials-title",
    ) as HTMLElement | null;

    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link"),
    ) as HTMLElement[];

    const offscreen = position === "left" ? -100 : 100;

    gsap.set(itemEls, {
      yPercent: 120,
      rotation: 6,
    });

    if (navigationTitle) {
      gsap.set(navigationTitle, { opacity: 0, y: 10 });
    }

    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0, y: 12 });
    }

    gsap.set(socialLinks, { opacity: 0, y: 15 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((layer, index) => {
      tl.fromTo(
        layer,
        { xPercent: offscreen },
        {
          xPercent: 0,
          duration: 0.35,
          ease: "power3.out",
        },
        index * 0.04,
      );
    });

    const delay = layers.length ? (layers.length - 1) * 0.04 + 0.04 : 0;

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      {
        xPercent: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      delay,
    );

    if (navigationTitle) {
      tl.to(
        navigationTitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        delay + 0.08,
      );
    }

    tl.to(
      itemEls,
      {
        yPercent: 0,
        rotation: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
      },
      delay + 0.1,
    );

    if (socialTitle) {
      tl.to(
        socialTitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        delay + 0.3,
      );
    }

    if (socialLinks.length) {
      tl.to(
        socialLinks,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.06,
        },
        delay + 0.35,
      );
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    buildOpenTimeline()?.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    closeTweenRef.current?.kill();

    const panel = panelRef.current;
    if (!panel) return;

    const offscreen = position === "left" ? -100 : 100;
    const elements = [...preLayerElsRef.current, panel];

    closeTweenRef.current = gsap.to(elements, {
      xPercent: offscreen,
      duration: 0.3,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const labels = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel"),
        ) as HTMLElement[];

        gsap.set(labels, {
          yPercent: 120,
          rotation: 6,
        });

        const navigationTitle = panel.querySelector(
          ".sm-menu-eyebrow",
        ) as HTMLElement | null;

        const socialTitle = panel.querySelector(
          ".sm-socials-title",
        ) as HTMLElement | null;

        const links = Array.from(
          panel.querySelectorAll(".sm-socials-link"),
        ) as HTMLElement[];

        if (navigationTitle) {
          gsap.set(navigationTitle, { opacity: 0, y: 10 });
        }

        if (socialTitle) {
          gsap.set(socialTitle, { opacity: 0, y: 12 });
        }

        gsap.set(links, { opacity: 0, y: 15 });
      },
    });
  }, [position]);

  React.useEffect(() => {
    if (openRef.current === open) return;

    openRef.current = open;

    if (open) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
  }, [open, playOpen, playClose, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      setMenuOpen(false);
    }
  }, [setMenuOpen]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (panelRef.current && !panelRef.current.contains(target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={`sm-scope ${bodyFont.className} ${isFixed ? "sm-fixed" : ""}`}
      data-open={open ? "true" : "false"}
      data-position={position}
      style={
        {
          "--sm-accent": accentColor,
          "--sm-menu-button-color": menuButtonColor,
          "--sm-open-menu-button-color": openMenuButtonColor,
          "--sm-change-menu-color": changeMenuColorOnOpen ? "1" : "0",
          pointerEvents: open ? "auto" : "none",
        } as React.CSSProperties
      }
    >
      <div className={`staggered-menu-wrapper ${className ?? ""}`}>
        <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
          {colors.slice(0, 3).map((color, index) => (
            <div
              key={`${color}-${index}`}
              className="sm-prelayer"
              style={{ background: color }}
            />
          ))}
        </div>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel"
          aria-hidden={!open}
          inert={!open}
        >
          <div className="sm-panel-inner">
            <div className="sm-menu-heading">
              <span className="sm-menu-eyebrow">
                {headings[lang].navigation}
              </span>
              <span className="sm-menu-line" />
            </div>

            <ul className="sm-panel-list" role="list">
              {items.map((item, index) => {
                const ItemIcon = item.icon;

                return (
                  <li
                    className="sm-panel-itemWrap"
                    key={`${item.link}-${index}`}
                  >
                    <a
                      className="sm-panel-item"
                      href={item.link}
                      aria-label={item.ariaLabel}
                      tabIndex={open ? 0 : -1}
                      onClick={closeMenu}
                    >
                      <span className="sm-panel-itemMain">
                        {ItemIcon && (
                          <span
                            className="sm-panel-itemIcon"
                            aria-hidden="true"
                          >
                            <ItemIcon size={21} />
                          </span>
                        )}

                        <span className="sm-panel-itemLabel">
                          {displayItemNumbering && (
                            <span className="sm-item-number">
                              {String(index + 1).padStart(2, "0")}.{" "}
                            </span>
                          )}
                          {item.label}
                        </span>
                      </span>

                      <span className="sm-item-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {displaySocials && socialItems.length > 0 && (
              <div className="sm-socials">
                <h3 className="sm-socials-title">{headings[lang].socials}</h3>

                <ul className="sm-socials-list" role="list">
                  {socialItems.map((social, index) => {
                    const SocialIcon = social.icon;

                    return (
                      <li key={`${social.label}-${index}`}>
                        <a
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm-socials-link"
                          aria-label={social.label}
                          title={social.label}
                          tabIndex={open ? 0 : -1}
                        >
                          {SocialIcon ? (
                            <SocialIcon size={24} aria-hidden="true" />
                          ) : (
                            social.label
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        .sm-scope {
          --sm-accent: #818cf8;
          --sm-accent-light: #c4b5fd;
          color: #f8fafc;
          font-family: inherit;
        }

        .sm-scope.sm-fixed {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          z-index: 40;
        }

        .sm-scope .staggered-menu-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .sm-scope .sm-prelayers {
          position: absolute;
          inset: 0 0 0 auto;
          width: min(100%, 440px);
          pointer-events: none;
          z-index: 5;
        }

        .sm-scope[data-position="left"] .sm-prelayers {
          right: auto;
          left: 0;
        }

        .sm-scope .sm-prelayer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0 !important;
          background: transparent !important;
        }

        /* Main menu panel */

        .sm-scope .staggered-menu-panel {
          position: absolute;
          top: 0;
          right: 0;
          width: min(100%, 440px);
          height: 100%;
          padding: 6.5rem 2rem 2rem;
          overflow-y: auto;
          overscroll-behavior: contain;
          z-index: 10;
          pointer-events: auto;

          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(99, 102, 241, 0.2),
              transparent 38%
            ),
            radial-gradient(
              circle at 0% 100%,
              rgba(129, 140, 248, 0.07),
              transparent 35%
            ),
            rgba(8, 11, 25, 0.96);

          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);

          border-left: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: -20px 0 60px rgba(0, 0, 0, 0.3);
        }

        .sm-scope[data-position="left"] .staggered-menu-panel {
          right: auto;
          left: 0;
          border-left: none;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sm-scope .sm-panel-inner {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Navigation headings */

        .sm-scope .sm-menu-heading {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .sm-scope .sm-menu-eyebrow,
        .sm-scope .sm-socials-title {
          margin: 0;
          color: var(--sm-accent);
          font-family: ${bodyFont.style.fontFamily}, sans-serif;
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          line-height: 1.7;
          text-transform: uppercase;
        }

        .sm-scope .sm-menu-eyebrow {
          flex-shrink: 0;
        }

        .sm-scope .sm-menu-line {
          position: relative;
          height: 1px;
          flex: 1;
          overflow: hidden;
          background: linear-gradient(
            90deg,
            rgba(129, 140, 248, 0.7),
            rgba(129, 140, 248, 0.04)
          );
        }

        /* Navigation list */

        .sm-scope .sm-panel-list,
        .sm-scope .sm-socials-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sm-scope .sm-panel-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sm-scope .sm-panel-itemWrap {
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(129, 140, 248, 0.2);
        }

        .sm-scope .sm-panel-itemWrap::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(129, 140, 248, 0.12),
            rgba(129, 140, 248, 0.42),
            rgba(196, 181, 253, 0.12)
          );
          pointer-events: none;
        }

        .sm-scope .sm-menu-line::after,
        .sm-scope .sm-panel-itemWrap::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #818cf8 35%,
            #c4b5fd 50%,
            #818cf8 65%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: sm-line-glow 3.5s ease-in-out infinite;
          pointer-events: none;
        }

        .sm-scope .sm-panel-itemWrap::before {
          top: auto;
          bottom: 0;
          height: 1.5px;
          z-index: 2;
        }

        @keyframes sm-line-glow {
          50% {
            transform: translateX(100%);
          }
        }

        .sm-scope .sm-panel-itemWrap:hover::after,
        .sm-scope .sm-panel-itemWrap:focus-within::after {
          background: linear-gradient(
            90deg,
            rgba(129, 140, 248, 0.3),
            rgba(196, 181, 253, 0.75),
            rgba(129, 140, 248, 0.3)
          );
        }

        /* Main navigation links */

        .sm-scope .sm-panel-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          width: 100%;
          padding: 17px 0;

          color: #f8fafc;
          font-family: ${headingFont.style.fontFamily}, sans-serif;
          font-size: clamp(1.35rem, 3.5vw, 1.8rem);
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: -0.045em;
          text-decoration: none;

          transition:
            color 0.3s ease,
            padding-left 0.3s ease;
        }

        .sm-scope .sm-panel-item:hover,
        .sm-scope .sm-panel-item:focus-visible {
          color: var(--sm-accent-light);
          padding-left: 0.35rem;
        }

        .sm-scope .sm-panel-itemMain {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .sm-scope .sm-panel-itemIcon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          color: #a5b4fc;
          background: linear-gradient(
            145deg,
            rgba(129, 140, 248, 0.16),
            rgba(99, 102, 241, 0.06)
          );
          border: 1px solid rgba(165, 180, 252, 0.18);
          border-radius: 13px;

          transition:
            color 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease,
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .sm-scope .sm-panel-item:hover .sm-panel-itemIcon,
        .sm-scope .sm-panel-item:focus-visible .sm-panel-itemIcon {
          color: #fff;
          background: linear-gradient(
            145deg,
            rgba(129, 140, 248, 0.3),
            rgba(99, 102, 241, 0.17)
          );
          border-color: rgba(196, 181, 253, 0.55);
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 5px 20px rgba(99, 102, 241, 0.12);
        }

        .sm-scope .sm-panel-itemLabel {
          display: inline-block;
          min-width: 0;
          overflow-wrap: anywhere;
          font-family: ${headingFont.style.fontFamily}, sans-serif;
          font-weight: 600;
          letter-spacing: -0.045em;
          transform-origin: 50% 100%;
          will-change: transform;
        }

        .sm-scope .sm-item-number {
          margin-right: 6px;
          color: #818cf8;
          font-family: ${bodyFont.style.fontFamily}, sans-serif;
          font-size: 0.65em;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .sm-scope .sm-item-arrow {
          flex-shrink: 0;
          color: #a5b4fc;
          font-family: ${bodyFont.style.fontFamily}, sans-serif;
          font-size: 1.2rem;
          opacity: 0;
          transform: translate(-7px, 5px);
          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        }

        .sm-scope .sm-panel-item:hover .sm-item-arrow,
        .sm-scope .sm-panel-item:focus-visible .sm-item-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* Social links */

        .sm-scope .sm-socials {
          margin-top: auto;
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sm-scope .sm-socials-title {
          overflow-wrap: anywhere;
        }

        .sm-scope .sm-socials-list {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .sm-scope .sm-socials-list li {
          display: flex;
        }

        .sm-scope .sm-socials-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 14px;
          text-decoration: none;

          transition:
            color 0.25s ease,
            background 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease;
        }

        .sm-scope .sm-socials-link:hover {
          color: #fff;
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(129, 140, 248, 0.6);
          transform: translateY(-3px);
        }

        /* Keyboard accessibility */

        .sm-scope a:focus-visible {
          outline: 2px solid var(--sm-accent);
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* Responsive styles */

        @media (max-width: 640px) {
          .sm-scope .staggered-menu-panel {
            width: 100%;
            padding: 6rem 1.4rem 1.5rem;
          }

          .sm-scope .sm-panel-inner {
            gap: 1.25rem;
          }

          .sm-scope .sm-panel-item {
            padding: 15px 0;
            font-size: clamp(1.25rem, 5.5vw, 1.55rem);
          }

          .sm-scope .sm-panel-itemIcon {
            width: 38px;
            height: 38px;
            border-radius: 11px;
          }

          .sm-scope .sm-panel-itemMain {
            gap: 11px;
          }

          .sm-scope .sm-menu-eyebrow,
          .sm-scope .sm-socials-title {
            font-size: 0.64rem;
            letter-spacing: 0.1em;
          }

          .sm-scope .sm-socials-link {
            width: 44px;
            height: 44px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sm-scope .sm-menu-line::after,
          .sm-scope .sm-panel-itemWrap::before {
            animation: none;
          }

          .sm-scope *,
          .sm-scope *::before,
          .sm-scope *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
