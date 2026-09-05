"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

// Кнопка "наверх" для длинных страниц — отложенный пункт внешнего аудита (раздел D),
// реализован 2026-09-05 (Frontend.md, раздел 4.6). Без бизнес-логики и данных — просто
// поведение (скролл), поэтому в components/ui, а не features (Project_Structure.md).
// Появляется после прокрутки примерно на экран вниз, плавно скроллит наверх по клику,
// уважает prefers-reduced-motion (без плавности — мгновенный переход).
const SHOW_AFTER_PX = 600;

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Наверх страницы"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-6 bottom-6 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-800 text-white shadow-md transition-all duration-200 ease-out hover:bg-brand-600 motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0 motion-reduce:translate-y-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
