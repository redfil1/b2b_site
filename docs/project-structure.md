# Project Structure.md — B2B-магазин спецтехники

Статус: рабочая версия.
Связанные документы: `Architecture.md`, `Tech Stack.md`, `Coding Rules.md`.

> **Изменение от 2026-08-31 (юридическое решение, 152-ФЗ).** Форма заявки и
> автоматизация «заявка → КП» убраны. Из структуры ниже удалены: роуты
> `app/request/*`, API-роуты `app/api/request/*`, отдельный роут
> `app/manufacturers/`, папка `lib/pdf/`, папка `components/features/request/`,
> тип `types/request.ts`. Добавлена папка `components/features/home/` (слайдер
> и полоса логотипов производителей на главной, см. `frontend.md`).

---

## Структура файлов и папок

```
src/
├── app/
│   ├── layout.tsx                 — root layout (шрифты, provider'ы, header/footer)
│   ├── globals.css
│   ├── page.tsx                   — главная
│   ├── catalog/
│   │   ├── page.tsx
│   │   └── [category]/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx       — карточка товара (чат "Карточки")
│   ├── search/
│   │   └── page.tsx
│   ├── services/page.tsx
│   ├── company/page.tsx
│   ├── contacts/page.tsx
│   ├── delivery/page.tsx
│   ├── legal/[doc]/page.tsx
│   ├── not-found.tsx
│   └── error.tsx
│
├── components/
│   ├── ui/                        — кнопки, инпуты, карточки-примитивы (без бизнес-логики)
│   ├── layout/                    — Header, Footer, Breadcrumbs, Container
│   └── features/                  — сборные блоки конкретных разделов
│       ├── catalog/
│       ├── product/                — компоненты карточки товара
│       └── home/                   — HeroSlider, ManufacturerLogos (главная, см. Frontend.md)
│
├── lib/
│   ├── data/                       — локальные данные каталога (см. Architecture.md, п.1)
│   │   ├── products.ts             — функции + сами данные товаров
│   │   ├── categories.ts           — функции + сами данные категорий
│   │   └── manufacturers.ts        — функции + данные производителей (для полосы логотипов на главной)
│   ├── constants/
│   └── utils/
│
├── types/
│   ├── product.ts                   — `Product` (публичный тип для компонентов) и `ProductDraft`
│   │                                   (расширяет Product полем `missingData`, только для lib/data/products.ts —
│   │                                   служебная пометка не должна попадать в клиентский код, см. Product.md)
│   ├── category.ts
│   └── manufacturer.ts
│
├── hooks/
├── config/
│   └── site.ts                     — название, meta по умолчанию, соцсети, контакты
│
public/
```

## Правила
- **`components/ui` не знает о данных** — только пропсы и вёрстка. Всё, что дёргает `lib/data`, живёт в `components/features/*` или в `page.tsx`.
- **Один тип — одно место**: типы `Product`, `Category` объявляются один раз в `types/` и импортируются везде (чаты Карточки/Фронт не заводят дублирующие интерфейсы). `types/request.ts` относился к отменённой форме заявки — не использовать.
- Алиас путей `@/*` → `src/*` в `tsconfig.json`, чтобы не было `../../../../`.
