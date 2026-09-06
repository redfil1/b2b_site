# Project Structure.md — B2B-магазин спецтехники

Статус: рабочая версия.
Связанные документы: `Architecture.md`, `Tech Stack.md`, `Coding Rules.md`, `SEO.md`.

> **Изменение от 2026-08-31 (юридическое решение, 152-ФЗ).** Форма заявки и
> автоматизация «заявка → КП» убраны. Из структуры ниже удалены: роуты
> `app/request/*`, API-роуты `app/api/request/*`, отдельный роут
> `app/manufacturers/`, папка `lib/pdf/`, папка `components/features/request/`,
> тип `types/request.ts`. Добавлена папка `components/features/home/` (слайдер
> и полоса логотипов производителей на главной, см. `frontend.md`).

> **Изменение от 2026-09-03 (внешний аудит).** В структуру добавлены: `app/sitemap.ts`,
> `app/robots.ts`, `app/opengraph-image.tsx` (SEO-пакет, см. `SEO.md`) и примитив
> `components/ui/Container`. Container относится к `components/ui/` (ранее в `frontend.md`
> упоминался в двух местах — зафиксировано `ui/`). `app/not-found.tsx`, `app/error.tsx`,
> `app/search/` и `config/site.ts` уже были в дереве — их назначение уточнено в
> `Architecture.md` (разделы 2.1–2.2) и `SEO.md`.

> **Изменение от 2026-09-06 (корзина, решено в диалоге с пользователем).** Добавлены:
> роут `app/cart/`, тип `types/cart.ts`, хук `hooks/useCart.ts`, компонент
> `components/layout/CartProvider.tsx` и компонент
> `components/features/product/AddToCartButton.tsx`. Подробности размещения и почему —
> ниже и в `Architecture.md`, раздел 2.3 / `Frontend.md`, раздел «Корзина».

> **Уточнение при реализации (2026-09-06).** Помимо перечисленного выше, на практике
> потребовалось два дополнительных файла — не отдельные архитектурные решения, а
> техническая необходимость: Next.js не допускает `"use client"` вместе с `export const
> metadata`/`generateMetadata` (или асинхронным серверным компонентом) в одном файле,
> а состояние корзины/степпера может жить только в клиентском компоненте.
> - `app/cart/CartPageClient.tsx` — вся интерактивная часть `/cart` (чтение корзины,
>   редактирование количества, email/копирование); `app/cart/page.tsx` остаётся тонким
>   серверным компонентом ради `export const metadata` (`robots: { index: false }`).
> - `components/features/product/ProductQuantityAddToCart.tsx` — степпер количества +
>   `AddToCartButton` на странице товара (`Frontend.md`, раздел 7.3); вынесен отдельно,
>   т.к. сама страница товара (`app/catalog/[category]/[slug]/page.tsx`) — асинхронный
>   серверный компонент (`generateStaticParams`/`generateMetadata`).

---

## Структура файлов и папок

```
src/
├── app/
│   ├── layout.tsx                 — root layout (шрифты, CartProvider, header/footer)
│   ├── globals.css
│   ├── page.tsx                   — главная
│   ├── catalog/
│   │   ├── page.tsx
│   │   └── [category]/
│   │       ├── page.tsx
│   │       └── [slug]/
│   │           └── page.tsx       — карточка товара (чат "Карточки")
│   ├── cart/
│   │   ├── page.tsx               — тонкий серверный компонент (export const metadata,
│   │   │                             robots noindex — Architecture.md, 2.3)
│   │   └── CartPageClient.tsx     — вся интерактивная часть, client component
│   ├── search/
│   │   └── page.tsx
│   ├── services/page.tsx
│   ├── company/page.tsx
│   ├── contacts/page.tsx
│   ├── delivery/page.tsx
│   ├── legal/[doc]/page.tsx
│   ├── sitemap.ts                 — карта сайта, генерируется из каталога (см. SEO.md)
│   ├── robots.ts                  — robots.txt, ссылка на sitemap (см. SEO.md)
│   ├── opengraph-image.tsx        — OG-картинка сайта по умолчанию (см. SEO.md)
│   ├── not-found.tsx              — глобальная страница 404 (Architecture.md, 2.1)
│   └── error.tsx                  — глобальный error boundary, "use client" (Architecture.md, 2.1)
│
├── components/
│   ├── ui/                        — кнопки, инпуты, карточки-примитивы, Container (без бизнес-логики)
│   ├── layout/                    — Header (вкл. инлайн-поиск и иконку корзины), Footer,
│   │                                 Breadcrumbs, CartProvider (контекст корзины, монтируется
│   │                                 в layout.tsx рядом с Header/Footer — тот же уровень
│   │                                 «оборачивает всё приложение», Frontend.md, раздел «Корзина»)
│   └── features/                  — сборные блоки конкретных разделов
│       ├── catalog/
│       ├── product/                — компоненты карточки товара, AddToCartButton (кнопка
│       │                              «Добавить в корзину» — только на странице товара,
│       │                              на карточке ProductGrid не используется, решено
│       │                              в диалоге с пользователем 2026-09-06), ProductQuantityAddToCart
│       │                              (степпер количества + AddToCartButton на странице
│       │                              товара — client component, см. врезку выше)
│       └── home/                   — HeroSlider, ManufacturerLogos (главная, см. Frontend.md)
│
├── lib/
│   ├── data/                       — локальные данные каталога (см. Architecture.md, п.1)
│   │   ├── products.ts             — функции + сами данные товаров
│   │   ├── categories.ts           — функции + сами данные категорий
│   │   └── manufacturers.ts        — функции + данные производителей (для полосы логотипов на главной)
│   ├── constants/
│   │   └── legalDocs.ts             — `LEGAL_DOCS` ({slug, title}[]) + `getLegalDocTitle()`,
│   │                                   единый источник для app/legal/[doc]/page.tsx и
│   │                                   app/sitemap.ts (самокритичный аудит, 2026-09-06)
│   └── utils/
│       └── phone.ts                 — normalizePhoneForTel() для href="tel:..."
│
├── types/
│   ├── product.ts                   — `Product` (публичный тип для компонентов) и `ProductDraft`
│   │                                   (расширяет Product полем `missingData`, только для lib/data/products.ts —
│   │                                   служебная пометка не должна попадать в клиентский код, см. Product.md)
│   ├── category.ts
│   ├── manufacturer.ts
│   └── cart.ts                       — `CartItem`: снимок товара в корзине (`productSlug`,
│                                        `category`, `title`, `model?`, `sku?`, `quantity`).
│                                        Не дублирует `Product` — отдельный, намеренно
│                                        урезанный тип для localStorage (без
│                                        specs/images/documents и т.п.), см. правило ниже
│
├── hooks/
│   └── useCart.ts                    — `useCart()`: `useContext` над контекстом корзины
│                                        (объявлен и используется здесь, провайдер —
│                                        components/layout/CartProvider.tsx); сам не хранит
│                                        state и не трогает localStorage напрямую
├── config/
│   └── site.ts                     — название, meta по умолчанию (вкл. базовый URL для metadataBase, см. SEO.md), соцсети, контакты
│
public/
```

## Правила
- **`components/ui` не знает о данных** — только пропсы и вёрстка. Всё, что дёргает `lib/data`, живёт в `components/features/*` или в `page.tsx`.
- **`Container` — это `components/ui/Container`** (примитив вёрстки, без данных), не `layout/`. Зафиксировано после внешнего аудита 2026-09-03 (см. `Architecture.md`, 2.2).
- **Один тип — одно место**: типы `Product`, `Category` объявляются один раз в `types/` и импортируются везде (чаты Карточки/Фронт не заводят дублирующие интерфейсы). `types/request.ts` относился к отменённой форме заявки — не использовать. `types/cart.ts` (`CartItem`) — не нарушение этого правила: он не описывает то же самое, что `Product` (специально урезанный снимок для localStorage, а не альтернативная схема товара), поэтому заведён отдельно, а не переиспользует/расширяет `Product`.
- Алиас путей `@/*` → `src/*` в `tsconfig.json`, чтобы не было `../../../../`.
- **Корзина — React Context, а не независимые вызовы хука в каждом компоненте.** Счётчик
  в `Header`, кнопка `AddToCartButton` на карточках и список на `/cart` должны видеть одно
  и то же состояние синхронно, без перезагрузки/навигации страницы — если бы каждый компонент
  независимо читал `localStorage` в свой локальный `useState`, изменение в одном месте не
  отражалось бы в других до следующего рендера/маунта. Поэтому: единственный источник
  состояния — `CartProvider` (`components/layout/CartProvider.tsx`, монтируется один раз в
  `app/layout.tsx`), синхронизирует своё состояние с `localStorage`; `useCart()`
  (`hooks/useCart.ts`) — это `useContext` поверх него, а не отдельное хранилище.
