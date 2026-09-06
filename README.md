# B2B-магазин промышленного оборудования

Каталог-витрина промышленного и специализированного оборудования (газоанализаторы, КИП,
лабораторное оборудование, спецтехника), импортируемого из Китая. Клиенты — юридические
лица, оплаты на сайте нет, склада в РФ нет — всё под заказ. Клиент выбирает товар и сам
связывается с менеджером (карточка товара → `/contacts`, либо несколько товаров сразу
через корзину `/cart`); менеджер вручную готовит коммерческое предложение. Персональные
данные на сайте не собираются (юридическое решение, 152-ФЗ).

Этот файл — для человека, который клонирует репозиторий и хочет его запустить. Правила
работы над проектом для Claude Code (и других агентов) и вся содержательная документация
(схема данных, дизайн-система, SEO, роутинг) — в [`CLAUDE.md`](./CLAUDE.md) и в [`docs/`](./docs).

## Стек

Next.js (App Router) + TypeScript + Tailwind CSS. Отдельного бэкенда нет — каталог отдаётся
локальными TS-данными из `src/lib/data/`, без CMS и без сети. Деплой — Vercel, автодеплой из
GitHub (`main` → Production, остальные ветки → Preview). Подробнее — [`docs/tech-stack.md`](./docs/tech-stack.md).

## Запуск локально

```bash
npm install
npm run dev
```

Откроется на [http://localhost:3000](http://localhost:3000).

**Важно:** `npm run dev` запускает `next dev` с флагом `--webpack`, не с Turbopack по
умолчанию — в используемой версии Next.js Turbopack в dev-режиме падает на
`next/font/google` (шрифт Manrope подключён именно так). `npm run build` использует
Turbopack штатно — там эта ошибка не воспроизводится. Подробности —
[`docs/tech-stack.md`](./docs/tech-stack.md).

## Проверки перед коммитом

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run format:check # prettier --check
npm run build        # next build — заодно прогоняет generateStaticParams/generateMetadata
                      # для всех страниц каталога, sitemap.ts и robots.ts
```

Тестового фреймворка (Jest/Vitest/Playwright) в проекте нет — намеренно, см.
[`CLAUDE.md`](./CLAUDE.md) и агента `tester` в `.claude/agents/`.

`npm run format` применяет форматирование Prettier автоматически.

Если репозиторий подключён к GitHub, `.github/workflows/ci.yml` прогоняет `lint` →
`typecheck` → `build` на каждый push и pull request.

## Переменные окружения

На сегодня обязательных переменных окружения нет. `.env.example` (если появится) —
коммитится с именами переменных без значений, `.env.local` с реальными значениями — в
`.gitignore`, не коммитится. Подробнее про Vercel Blob и будущие переменные —
[`docs/tech-stack.md`](./docs/tech-stack.md).

## Структура проекта

Точное дерево `src/` и что куда класть — [`docs/project-structure.md`](./docs/project-structure.md).
Коротко:

- `src/app/` — страницы (Next.js App Router)
- `src/components/ui/` — примитивы без бизнес-логики (кнопки, инпуты, карточки)
- `src/components/layout/` — Header, Footer, Breadcrumbs, CartProvider
- `src/components/features/{catalog,product,home}/` — сборные блоки конкретных разделов
- `src/lib/data/` — локальные данные каталога (товары, категории, производители)
- `src/types/` — общие типы (`Product`, `Category`, `Manufacturer`, `CartItem`)

## Наполнение каталога товарами

Каталог сейчас — тестовые данные для проверки вёрстки, не номенклатура поставщика. Как
добавить/изменить товар в `lib/data/products.ts` — чек-лист в
[`docs/product.md`](./docs/product.md), раздел 6.

## Документация

| Файл | Что внутри |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | правила работы над проектом для Claude Code, карта `docs/` |
| [`docs/architecture.md`](./docs/architecture.md) | роутинг, источник данных, корзина |
| [`docs/project-structure.md`](./docs/project-structure.md) | точная структура `src/` |
| [`docs/tech-stack.md`](./docs/tech-stack.md) | стек, деплой, переменные окружения |
| [`docs/coding-rules.md`](./docs/coding-rules.md) | стиль кода, комментарии |
| [`docs/product.md`](./docs/product.md) | схема `Product`, чек-лист добавления товара |
| [`docs/frontend.md`](./docs/frontend.md) | дизайн-система, компоненты, корзина |
| [`docs/seo.md`](./docs/seo.md) | SEO-пакет: sitemap, robots, JSON-LD, noindex |
