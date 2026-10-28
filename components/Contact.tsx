"use client";

import { useState, type FormEvent } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";

import BorderGlow from "./BorderGlow";
import { IconCloudDemo } from "./IconCloudDemo";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-contact-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-contact-body",
  display: "swap",
});

type Language = "uz" | "en" | "ru";
type Theme = "dark" | "light";

type ContactProps = {
  lang?: Language;
  theme?: Theme;
};

const EMAIL = "ikramovmuslim6@gmail.com";
const GITHUB = "https://github.com/Muslim-22";
const TELEGRAM = "https://t.me/Ikromov_22";

const translations = {
  uz: {
    label: "MEN BILAN BOG‘LANING / 04",
    eyebrow: "BOG‘LANISH",
    heading1: "Keling, birga",
    heading2: "nimadir yaratamiz.",
    description:
      "Yangi loyiha, ish taklifi yoki shunchaki suhbat uchun ochiqman. Quyidagi aloqa kanallari orqali men bilan bog‘lanishingiz mumkin.",
    available: "Yangi imkoniyatlarga ochiqman",
    contactTitle: "Aloqa ma’lumotlari",
    cardDescription: "Keling, bog‘lanamiz va birga ishlaymiz.",
    emailLabel: "Elektron pochta",
    locationLabel: "Joylashuv",
    location: "Toshkent, O‘zbekiston",
    socialTitle: "Ijtimoiy tarmoqlar",
    formEyebrow: "XABAR YUBORING",
    formTitle: "Sizdan xabar kutaman.",
    formDescription:
      "G‘oyangiz yoki loyihangiz haqida qisqacha yozib qoldiring.",
    name: "Ismingiz",
    namePlaceholder: "Ismingizni kiriting",
    email: "Email manzilingiz",
    emailPlaceholder: "you@example.com",
    subject: "Mavzu",
    subjectPlaceholder: "Masalan, loyiha taklifi",
    message: "Xabaringiz",
    messagePlaceholder: "Loyihangiz haqida yozing...",
    send: "Xabar yuborish",
    note: "Tugma email dasturingizni ochadi.",
    github: "GitHub profilim",
    telegram: "Telegram orqali yozish",
    required: "Iltimos, barcha maydonlarni to‘ldiring.",
    invalidEmail: "Email manzilini to‘g‘ri kiriting.",
    footer: "DIZAYN VA ISHLAB CHIQISH — ISHTIYOQ BILAN",
  },

  en: {
    label: "CONTACT ME / 04",
    eyebrow: "GET IN TOUCH",
    heading1: "Let's build",
    heading2: "something great.",
    description:
      "I'm open to new projects, job opportunities, and interesting conversations. Feel free to reach out through any of the channels below.",
    available: "Open to new opportunities",
    contactTitle: "Contact information",
    cardDescription: "Let's connect and make it happen.",
    emailLabel: "Email address",
    locationLabel: "Location",
    location: "Tashkent, Uzbekistan",
    socialTitle: "Find me online",
    formEyebrow: "SEND A MESSAGE",
    formTitle: "Let's talk about your idea.",
    formDescription:
      "Tell me a little about your project or what you have in mind.",
    name: "Your name",
    namePlaceholder: "Enter your name",
    email: "Your email",
    emailPlaceholder: "you@example.com",
    subject: "Subject",
    subjectPlaceholder: "e.g. Project inquiry",
    message: "Your message",
    messagePlaceholder: "Tell me about your idea...",
    send: "Send message",
    note: "This button opens your email application.",
    github: "GitHub profile",
    telegram: "Message on Telegram",
    required: "Please fill in all fields.",
    invalidEmail: "Please enter a valid email address.",
    footer: "DESIGNED & BUILT WITH PASSION",
  },

  ru: {
    label: "СВЯЖИТЕСЬ СО МНОЙ / 04",
    eyebrow: "СВЯЗАТЬСЯ",
    heading1: "Давайте создадим",
    heading2: "что-то классное.",
    description:
      "Я открыт к новым проектам, предложениям о работе и интересному общению. Свяжитесь со мной удобным способом.",
    available: "Открыт к новым возможностям",
    contactTitle: "Контактная информация",
    cardDescription: "Давайте свяжемся и начнём сотрудничество.",
    emailLabel: "Электронная почта",
    locationLabel: "Местоположение",
    location: "Ташкент, Узбекистан",
    socialTitle: "Я в интернете",
    formEyebrow: "НАПИСАТЬ СООБЩЕНИЕ",
    formTitle: "Обсудим вашу идею.",
    formDescription: "Расскажите немного о вашем проекте или предложении.",
    name: "Ваше имя",
    namePlaceholder: "Введите ваше имя",
    email: "Ваш email",
    emailPlaceholder: "you@example.com",
    subject: "Тема",
    subjectPlaceholder: "Например, предложение о проекте",
    message: "Ваше сообщение",
    messagePlaceholder: "Расскажите о вашей идее...",
    send: "Отправить сообщение",
    note: "Кнопка откроет вашу почтовую программу.",
    github: "Профиль GitHub",
    telegram: "Написать в Telegram",
    required: "Пожалуйста, заполните все поля.",
    invalidEmail: "Введите корректный адрес электронной почты.",
    footer: "ДИЗАЙН И РАЗРАБОТКА С УВЛЕЧЕНИЕМ",
  },
};

export default function Contact({ lang = "uz", theme = "dark" }: ContactProps) {
  const t = translations[lang] ?? translations.uz;
  const isLight = theme === "light";

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");

  function updateField(field: keyof typeof form, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !subject || !message) {
      setError(t.required);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.invalidEmail);
      return;
    }

    setError("");

    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

    const mailto =
      `mailto:${EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <section
      id="contact"
      className={`${headingFont.variable} ${bodyFont.variable} contact-section ${
        isLight ? "contact-light" : ""
      }`}
    >
      <style jsx>{`
        .contact-section {
          --bg: #07070a;
          --text: #f5f5f7;
          --muted: #9898a8;
          --card: rgba(255, 255, 255, 0.035);
          --border: rgba(255, 255, 255, 0.1);
          --input: rgba(5, 5, 10, 0.55);
          --card-shadow: rgba(0, 0, 0, 0.12);

          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 110px 24px 40px;
          color: var(--text);
          font-family: var(--font-contact-body), sans-serif;
          scroll-margin-top: 90px;
          transition:
            color 0.3s ease,
            background-color 0.3s ease;
        }

        .contact-light {
          --bg: #f7f8fc;
          --text: #171725;
          --muted: #656579;
          --card: rgba(255, 255, 255, 0.88);
          --border: rgba(99, 102, 241, 0.17);
          --input: #f8f9ff;
          --card-shadow: rgba(60, 50, 100, 0.06);
        }

        .contact-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1180px;
          margin-inline: auto;
        }

        .contact-bg-glow {
          position: absolute;
          z-index: -1;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          opacity: ${isLight ? "0.1" : "0.18"};
        }

        .contact-bg-glow-one {
          top: 40px;
          left: -200px;
          background: #8b5cf6;
        }

        .contact-bg-glow-two {
          top: 500px;
          right: -200px;
          background: #06b6d4;
        }

        .contact-top-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          align-items: center;
          gap: 35px;
          margin-bottom: 58px;
        }

        .contact-heading {
          min-width: 0;
        }

        .contact-section-label {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 25px;
          color: var(--muted);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.16em;
          line-height: 1.6;
        }

        .contact-label-line {
          width: 30px;
          height: 1px;
          background: #6366f1;
        }

        .contact-label-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 12px #38bdf8;
        }

        .contact-eyebrow {
          display: flex;
          width: fit-content;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          padding: 9px 15px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 999px;
          color: #a78bfa;
          background: rgba(139, 92, 246, 0.08);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .contact-light .contact-eyebrow {
          color: #7040c8;
          background: rgba(139, 92, 246, 0.07);
        }

        .contact-title {
          margin: 0;
          color: var(--text);
          font-family: var(--font-contact-heading), sans-serif;
          font-size: clamp(40px, 5vw, 66px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.065em;
          text-wrap: balance;
        }

        .contact-title span {
          color: transparent;
          background: linear-gradient(
            100deg,
            #c4b5fd 0%,
            #8b5cf6 34%,
            #38bdf8 72%,
            #0891b2 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
        }

        .contact-divider {
          position: relative;
          width: 100%;
          max-width: 280px;
          height: 2px;
          margin: 25px 0 20px;
          overflow: hidden;
          background: var(--border);
        }

        .contact-divider span {
          position: absolute;
          top: 0;
          left: -40%;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            #8b5cf6,
            #38bdf8,
            transparent
          );
          animation: divider-move 4s linear infinite;
        }

        @keyframes divider-move {
          from {
            left: -40%;
          }
          to {
            left: 110%;
          }
        }

        .contact-description {
          max-width: 570px;
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          font-weight: 400;
          line-height: 1.95;
          letter-spacing: -0.012em;
          text-wrap: pretty;
        }

        .contact-availability {
          display: flex;
          width: fit-content;
          align-items: center;
          gap: 9px;
          margin-top: 22px;
          padding: 10px 15px;
          border: 1px solid rgba(34, 197, 94, 0.22);
          border-radius: 999px;
          color: #16a34a;
          background: rgba(34, 197, 94, 0.07);
          font-size: 12px;
          font-weight: 550;
          letter-spacing: -0.01em;
        }

        .contact-status-dot {
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 12px rgba(74, 222, 128, 0.8);
          animation: status-pulse 2s ease-in-out infinite;
        }

        @keyframes status-pulse {
          50% {
            opacity: 0.65;
          }
        }

        /* Icon cloud uchun responsive konteyner */
        .contact-cloud-wrapper {
          display: flex;
          width: 100%;
          min-width: 0;
          min-height: 320px;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 28px;
          background:
            radial-gradient(
              circle at 50% 45%,
              rgba(139, 92, 246, 0.13),
              transparent 58%
            ),
            var(--card);
        }

        .contact-cloud-wrapper > * {
          max-width: 100%;
        }

        .contact-cloud-wrapper > div {
          width: 100%;
          min-width: 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          align-items: stretch;
          gap: 24px;
        }

        .contact-info-column {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 20px;
        }

        .contact-glow-card,
        .contact-glow-card:hover {
          position: relative;
          z-index: 0;
          min-width: 0;
          border-radius: 25px;
          isolation: isolate;
          opacity: 1 !important;
          filter: none !important;
          transition: none !important;
        }

        .contact-glow-card *,
        .contact-glow-card:hover * {
          opacity: revert;
        }

        .contact-glow-card:hover {
          transform: none;
        }

        .contact-card-content,
        .contact-form-content {
          position: relative;
          z-index: 1;
          height: 100%;
          padding: 28px;
          border: 1px solid var(--border);
          border-radius: 24px;
          background: var(--card);
          box-shadow: 0 16px 45px var(--card-shadow);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition:
            background-color 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .contact-glow-card:hover .contact-card-content,
        .contact-glow-card:hover .contact-form-content {
          box-shadow: 0 16px 45px var(--card-shadow);
        }

        .contact-card-heading {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 26px;
        }

        .contact-icon-box,
        .contact-form-send-icon {
          display: grid;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid rgba(139, 92, 246, 0.25);
          border-radius: 15px;
          color: #8b5cf6;
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.15),
            rgba(56, 189, 248, 0.08)
          );
        }

        .contact-card-heading h3 {
          margin: 0 0 6px;
          color: var(--text);
          font-family: var(--font-contact-heading), sans-serif;
          font-size: 18px;
          font-weight: 650;
          line-height: 1.35;
          letter-spacing: -0.035em;
        }

        .contact-card-heading p {
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.75;
          letter-spacing: -0.01em;
        }

        .contact-info-item {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 14px;
          padding: 18px 0;
          border-top: 1px solid var(--border);
          color: inherit;
          text-decoration: none;
        }

        .contact-info-icon,
        .contact-social-icon {
          display: grid;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 13px;
          color: #0891b2;
          background: rgba(56, 189, 248, 0.07);
          transition:
            border-color 0.25s ease,
            color 0.25s ease,
            background-color 0.25s ease;
        }

        .contact-info-text {
          display: flex;
          min-width: 0;
          flex: 1;
          flex-direction: column;
          gap: 7px;
        }

        .contact-info-text > span {
          color: var(--muted);
          font-size: 11px;
          font-weight: 450;
          letter-spacing: 0.01em;
        }

        .contact-info-text > strong {
          overflow-wrap: anywhere;
          color: var(--text);
          font-size: 13px;
          font-weight: 600;
          line-height: 1.6;
          letter-spacing: -0.015em;
        }

        .contact-info-arrow,
        .contact-social-arrow {
          flex-shrink: 0;
          color: var(--muted);
          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }

        .contact-info-item[href]:hover .contact-info-icon,
        .contact-social-link:hover .contact-social-icon {
          border-color: rgba(139, 92, 246, 0.4);
          color: #8b5cf6;
          background: rgba(139, 92, 246, 0.1);
        }

        .contact-info-item[href]:hover .contact-info-arrow,
        .contact-social-link:hover .contact-social-arrow {
          color: #8b5cf6;
          transform: translate(3px, -3px);
        }

        .contact-social-block {
          padding-top: 23px;
          border-top: 1px solid var(--border);
        }

        .contact-social-title {
          margin: 0 0 14px;
          color: var(--muted);
          font-size: 11px;
          font-weight: 550;
          letter-spacing: 0.01em;
        }

        .contact-social-link {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 13px;
          padding: 10px 0;
          color: var(--text);
          font-size: 13px;
          font-weight: 550;
          letter-spacing: -0.015em;
          text-decoration: none;
        }

        .contact-social-link > span:nth-child(2) {
          flex: 1;
        }

        .contact-bottom-note {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 20px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: var(--card);
          box-shadow: 0 12px 30px var(--card-shadow);
        }

        .contact-note-icon {
          display: grid;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          place-items: center;
          border-radius: 12px;
          color: #0891b2;
          background: rgba(56, 189, 248, 0.09);
        }

        .contact-note-text {
          min-width: 0;
          flex: 1;
        }

        .contact-bottom-note strong {
          color: var(--text);
          font-size: 12px;
          font-weight: 650;
          line-height: 1.5;
          letter-spacing: -0.015em;
        }

        .contact-bottom-note p {
          margin: 6px 0 0;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.7;
        }

        .contact-note-arrow {
          flex-shrink: 0;
          color: #8b5cf6;
        }

        .contact-form-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 28px;
        }

        .contact-form-eyebrow {
          display: inline-block;
          margin-bottom: 13px;
          color: #8b5cf6;
          font-size: 10px;
          font-weight: 750;
          letter-spacing: 0.17em;
          line-height: 1.6;
        }

        .contact-form-top h3 {
          margin: 0 0 12px;
          color: var(--text);
          font-family: var(--font-contact-heading), sans-serif;
          font-size: clamp(23px, 3vw, 30px);
          font-weight: 700;
          line-height: 1.22;
          letter-spacing: -0.05em;
          text-wrap: balance;
        }

        .contact-form-top p {
          max-width: 390px;
          margin: 0;
          color: var(--muted);
          font-size: 12px;
          font-weight: 400;
          line-height: 1.85;
          letter-spacing: -0.01em;
          text-wrap: pretty;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 19px;
        }

        .contact-form-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 15px;
        }

        .contact-field {
          display: flex;
          min-width: 0;
          flex-direction: column;
          gap: 9px;
        }

        .contact-field > span {
          color: var(--text);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .contact-field input,
        .contact-field textarea {
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          padding: 14px 15px;
          border: 1px solid var(--border);
          border-radius: 12px;
          outline: none;
          color: var(--text);
          background: var(--input);
          font-family: var(--font-contact-body), sans-serif;
          font-size: 12px;
          font-weight: 450;
          letter-spacing: -0.01em;
          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            background-color 0.25s ease;
        }

        .contact-field input {
          height: 47px;
        }

        .contact-field textarea {
          min-height: 125px;
          resize: vertical;
          line-height: 1.8;
        }

        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color: var(--muted);
          opacity: 0.75;
        }

        .contact-field input:focus,
        .contact-field textarea:focus {
          border-color: rgba(139, 92, 246, 0.75);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }

        .contact-form-error {
          margin: -5px 0 0;
          color: #ef4444;
          font-size: 12px;
          line-height: 1.6;
        }

        .contact-submit {
          display: flex;
          width: 100%;
          min-height: 51px;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 2px;
          padding: 14px 20px;
          border: 1px solid rgba(196, 181, 253, 0.25);
          border-radius: 13px;
          color: #fff;
          background: linear-gradient(100deg, #7c3aed, #6366f1 55%, #0284c7);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.16);
          font-family: var(--font-contact-body), sans-serif;
          font-size: 13px;
          font-weight: 650;
          letter-spacing: -0.015em;
          cursor: pointer;
          transition:
            transform 0.25s ease,
            filter 0.25s ease,
            box-shadow 0.25s ease;
        }

        .contact-submit:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
          box-shadow: 0 12px 35px rgba(99, 102, 241, 0.25);
        }

        .contact-submit:active {
          transform: translateY(0);
        }

        .contact-submit:focus-visible,
        .contact-social-link:focus-visible,
        .contact-info-item:focus-visible {
          outline: 2px solid #67e8f9;
          outline-offset: 4px;
        }

        .contact-form-note {
          margin: -7px 0 0;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.7;
          text-align: center;
        }

        .contact-footer-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 70px;
        }

        .contact-footer-line > span {
          width: 100%;
          max-width: 180px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(139, 92, 246, 0.4),
            transparent
          );
        }

        .contact-footer-line p {
          flex-shrink: 0;
          margin: 0;
          color: var(--muted);
          font-size: 9px;
          font-weight: 650;
          letter-spacing: 0.16em;
          line-height: 1.8;
          text-align: center;
        }

        @media (max-width: 900px) {
          .contact-section {
            padding-top: 85px;
          }

          .contact-top-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 25px;
            margin-bottom: 42px;
          }

          .contact-heading {
            text-align: center;
          }

          .contact-section-label,
          .contact-eyebrow,
          .contact-availability {
            margin-right: auto;
            margin-left: auto;
          }

          .contact-section-label {
            justify-content: center;
          }

          .contact-divider {
            margin-right: auto;
            margin-left: auto;
          }

          .contact-description {
            margin-inline: auto;
          }

          .contact-cloud-wrapper {
            min-height: 280px;
          }

          .contact-grid {
            grid-template-columns: minmax(0, 1fr);
            max-width: 680px;
            margin-inline: auto;
          }
        }

        @media (max-width: 560px) {
          .contact-section {
            padding: 70px 16px 28px;
          }

          .contact-top-grid {
            gap: 20px;
            margin-bottom: 34px;
          }

          .contact-section-label {
            margin-bottom: 22px;
            font-size: 9px;
            letter-spacing: 0.12em;
          }

          .contact-title {
            font-size: clamp(34px, 9vw, 46px);
            letter-spacing: -0.055em;
            line-height: 1.12;
          }

          .contact-description {
            font-size: 13px;
            line-height: 1.85;
          }

          /* Telefon ekranida cloud yashirilmaydi */
          .contact-cloud-wrapper {
            display: flex;
            width: 100%;
            min-height: 230px;
            margin-top: 4px;
            border-radius: 20px;
          }

          .contact-card-content,
          .contact-form-content {
            padding: 22px 18px;
            border-radius: 19px;
          }

          .contact-glow-card {
            border-radius: 20px;
          }

          .contact-card-heading h3 {
            font-size: 17px;
          }

          .contact-form-row {
            grid-template-columns: minmax(0, 1fr);
          }

          .contact-form-top {
            gap: 12px;
          }

          .contact-form-top h3 {
            font-size: clamp(22px, 6vw, 27px);
          }

          .contact-form-send-icon {
            width: 40px;
            height: 40px;
          }

          .contact-footer-line {
            gap: 10px;
            margin-top: 45px;
          }

          .contact-footer-line p {
            font-size: 8px;
            letter-spacing: 0.08em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-divider span,
          .contact-status-dot {
            animation: none;
          }

          .contact-submit,
          .contact-info-icon,
          .contact-social-icon,
          .contact-info-arrow,
          .contact-social-arrow {
            transition: none;
          }
        }
      `}</style>

      <div aria-hidden="true" className="contact-bg-glow contact-bg-glow-one" />

      <div aria-hidden="true" className="contact-bg-glow contact-bg-glow-two" />

      <div className="contact-container">
        <div className="contact-top-grid">
          <div className="contact-heading">
            <div className="contact-section-label">
              <span className="contact-label-line" />
              <span className="contact-label-dot" />
              {t.label}
            </div>

            <div className="contact-eyebrow">
              <Sparkles size={14} />
              <span>{t.eyebrow}</span>
            </div>

            <h2 className="contact-title">
              {t.heading1}
              <br />
              <span>{t.heading2}</span>
            </h2>

            <div className="contact-divider">
              <span />
            </div>

            <p className="contact-description">{t.description}</p>

            <div className="contact-availability">
              <span className="contact-status-dot" />
              {t.available}
            </div>
          </div>

          <div className="contact-cloud-wrapper">
            <IconCloudDemo />
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-info-column">
            <BorderGlow
              animated
              colors={["#22d3ee", "#6366f1", "#a78bfa"]}
              glowIntensity={1}
              className="contact-glow-card contact-info-card"
            >
              <div className="contact-card-content">
                <div className="contact-card-heading">
                  <div className="contact-icon-box">
                    <MessageCircle size={21} />
                  </div>

                  <div>
                    <h3>{t.contactTitle}</h3>
                    <p>{t.cardDescription}</p>
                  </div>
                </div>

                <a href={`mailto:${EMAIL}`} className="contact-info-item">
                  <div className="contact-info-icon">
                    <Mail size={19} />
                  </div>

                  <div className="contact-info-text">
                    <span>{t.emailLabel}</span>
                    <strong>{EMAIL}</strong>
                  </div>

                  <ArrowUpRight size={18} className="contact-info-arrow" />
                </a>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <MapPin size={19} />
                  </div>

                  <div className="contact-info-text">
                    <span>{t.locationLabel}</span>
                    <strong>{t.location}</strong>
                  </div>
                </div>

                <div className="contact-social-block">
                  <p className="contact-social-title">{t.socialTitle}</p>

                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    <span className="contact-social-icon">
                      <FaGithub size={19} />
                    </span>

                    <span>{t.github}</span>

                    <ArrowUpRight size={17} className="contact-social-arrow" />
                  </a>

                  <a
                    href={TELEGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    <span className="contact-social-icon">
                      <FaTelegramPlane size={18} />
                    </span>

                    <span>{t.telegram}</span>

                    <ArrowUpRight size={17} className="contact-social-arrow" />
                  </a>
                </div>
              </div>
            </BorderGlow>

            <div className="contact-bottom-note">
              <div className="contact-note-icon">
                <CheckCircle2 size={20} />
              </div>

              <div className="contact-note-text">
                <strong>{t.available}</strong>
                <p>React · Next.js · TypeScript</p>
              </div>

              <ArrowDownRight size={20} className="contact-note-arrow" />
            </div>
          </div>

          <BorderGlow
            animated
            colors={["#818cf8", "#38bdf8", "#c084fc"]}
            glowIntensity={1}
            className="contact-glow-card contact-form-card"
          >
            <div className="contact-form-content">
              <div className="contact-form-top">
                <div>
                  <span className="contact-form-eyebrow">{t.formEyebrow}</span>

                  <h3>{t.formTitle}</h3>
                  <p>{t.formDescription}</p>
                </div>

                <div className="contact-form-send-icon">
                  <Send size={22} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <label className="contact-field">
                    <span>{t.name}</span>

                    <input
                      required
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder={t.namePlaceholder}
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                    />
                  </label>

                  <label className="contact-field">
                    <span>{t.email}</span>

                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder={t.emailPlaceholder}
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                    />
                  </label>
                </div>

                <label className="contact-field">
                  <span>{t.subject}</span>

                  <input
                    required
                    type="text"
                    name="subject"
                    placeholder={t.subjectPlaceholder}
                    value={form.subject}
                    onChange={(event) =>
                      updateField("subject", event.target.value)
                    }
                  />
                </label>

                <label className="contact-field">
                  <span>{t.message}</span>

                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder={t.messagePlaceholder}
                    value={form.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                  />
                </label>

                {error && (
                  <p role="alert" className="contact-form-error">
                    {error}
                  </p>
                )}

                <button type="submit" className="contact-submit">
                  <span>{t.send}</span>
                  <Send size={17} />
                </button>

                <p className="contact-form-note">{t.note}</p>
              </form>
            </div>
          </BorderGlow>
        </div>

        <div className="contact-footer-line">
          <span />
          <p>{t.footer}</p>
          <span />
        </div>
      </div>
    </section>
  );
}
