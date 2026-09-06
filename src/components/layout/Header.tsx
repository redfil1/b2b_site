"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { siteConfig } from "@/config/site";

// Навигация — статичный список страниц (Architecture.md, раздел 2). Без обращения
// к lib/data — components/layout только вёрстка (Project_Structure.md).
// «Производители» отдельным роутом нет — это полоса логотипов на главной (Architecture.md, 2).
const NAV_LINKS = [
  { label: "Каталог", href: "/catalog" },
  { label: "Услуги", href: "/services" },
  { label: "О компании", href: "/company" },
  { label: "Контакты", href: "/contacts" },
];

// Стили CTA-ссылки повторяют вариант Button "secondary" (не сам компонент Button —
// <button> внутри <a> невалиден по HTML). Формы заявки на сайте нет (юридическое решение),
// CTA ведёт на /contacts — там телефон/email менеджера (Architecture.md, раздел 2).
const CONTACT_CTA_CLASSNAME =
  "inline-flex items-center justify-center rounded-2xl bg-secondary px-5 py-2.5 text-base font-semibold text-primary transition-colors duration-200 ease-out hover:bg-white";

// Инлайн-поиск (Architecture.md, раздел 2): одно текстовое поле, по сабмиту —
// обычная GET-навигация на /search?q=<запрос>. Отдельного клиентского фильтра
// в проекте нет, вся логика поиска — на странице /search.
function HeaderSearch({ className = "" }: { className?: string }) {
  return (
    <form action="/search" role="search" className={className}>
      <Input
        type="search"
        name="q"
        aria-label="Поиск по каталогу"
        placeholder="Поиск по каталогу"
      />
    </form>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Фиксированная шапка на акцентном цвете brand-800 (Frontend.md, раздел 4.1:
    // "Акцент основной — кнопки, ссылки, фиксированная шапка").
    <header className="sticky top-0 z-40 bg-brand-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:gap-4 md:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="min-w-0 truncate text-lg font-semibold text-white transition-colors duration-200 ease-out hover:text-white/80 md:text-xl"
        >
          {siteConfig.name}
        </Link>

        <nav
          aria-label="Основная навигация"
          className="hidden shrink-0 md:flex md:items-center md:gap-4 lg:gap-6"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-white/90 transition-colors duration-200 ease-out hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {/* Расширено по итогам дизайн-ревью, 2026-09-06: узкое поле (было lg:w-56)
              не помещало длинные артикулы/названия при вводе. */}
          <HeaderSearch className="hidden w-36 md:block lg:w-72 xl:w-80" />

          <Link href="/contacts" className="hidden sm:inline-flex">
            <span className={CONTACT_CTA_CLASSNAME}>Связаться с менеджером</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            className="inline-flex items-center justify-center rounded-xl p-2 text-white transition-colors duration-200 ease-out hover:bg-white/10 md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню — сворачивается в гамбургер, переключение через max-height,
          только Tailwind transition (Frontend.md, раздел 4.3.3), без библиотек.
          В закрытом состоянии max-h-0 + overflow-hidden лишь визуально прячут меню,
          поэтому дополнительно снимаем его из дерева доступности и убираем из
          таба (aria-hidden + inert) — фокус не должен попадать в невидимые ссылки. */}
      <nav
        id="mobile-nav"
        aria-label="Мобильная навигация"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`overflow-hidden transition-[max-height] duration-200 ease-out motion-reduce:transition-none md:hidden ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 pb-4 md:px-6">
          <HeaderSearch className="mb-2" />
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-3 py-2 text-white/90 transition-colors duration-200 ease-out hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contacts" onClick={() => setIsMenuOpen(false)} className="mt-2 sm:hidden">
            <span className={`${CONTACT_CTA_CLASSNAME} w-full`}>Связаться с менеджером</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
