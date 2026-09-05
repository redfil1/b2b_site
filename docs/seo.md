# SEO.md — SEO-пакет каталога

Статус: **решено, реализуется сейчас** (по итогам внешнего аудита, 2026-09-03). Один
документ — одна фича: набор SEO-механик для статичной каталог-витрины. Всё ниже —
проверенные факты (соглашения App Router сверены с `node_modules/next/dist/docs/`,
Next.js 16). Список файлов — в конце.

Связанные документы: `Architecture.md` (роутинг, источник данных, разделы 2.1–2.2),
`Project Structure.md` (дерево файлов), `Frontend.md` (дизайн-система, `alt`-тексты),
`Product.md` (поля `Product`), `Coding Rules.md` (метаданные только через встроенный
`generateMetadata`).

---

## 1. Область

В пакет входит и делается сейчас (не откладывается):

1. `metadataBase` в корневом layout.
2. `app/sitemap.ts` — карта сайта, генерируется из каталога.
3. `app/robots.ts` — `robots.txt`, генерируется, со ссылкой на sitemap.
4. `generateStaticParams` для `/catalog/[category]` и `/catalog/[category]/[slug]`.
5. Осмысленные `alt`-тексты у изображений категорий.
6. `app/opengraph-image.tsx` — OG-картинка сайта по умолчанию.
7. JSON-LD: `Product` на карточке товара, `BreadcrumbList` на странице категории и
   карточке товара.

**Не делаем на этом этапе** (осознанно, чтобы не плодить сущности):

- `keywords` в метаданных — поисковиками игнорируется, не добавляем.
- Отдельная SEO-библиотека (`next-seo`, `schema-dts` и т.п.) — JSON-LD пишем простыми
  объектами вручную, это правило проекта против лишних зависимостей.
- Пер-товарные OG-картинки (`opengraph-image` внутри `catalog/[category]/[slug]`) —
  пока хватает одной корневой; вернёмся, если понадобится.
- `offers`/цена в JSON-LD `Product` — цены в проекте нет (`CLAUDE.md`), блок предложения
  в разметку не добавляем.

---

## 2. `metadataBase`

`metadataBase` (`new URL(...)`) задаётся один раз в корневом `app/layout.tsx` через
`export const metadata` и применяется ко всем URL-полям метаданных ниже по дереву
(`openGraph.images`, `alternates.canonical`, ссылки в OG/Twitter). Без него относительные
пути в этих полях дают ошибку сборки.

- Значение берётся из `src/config/site.ts` (единый модуль констант сайта,
  `Architecture.md`, 2.2), а не хардкодится в layout.
- Используется реальный Production-адрес на Vercel: `https://b2b-site-lime.vercel.app`
  (имя проекта в Vercel — `b2b-site-lime`; имя пакета в `package.json` — `b2b-site`, домен
  Vercel добавляет суффикс). Значение зафиксировано в `config/site.ts` — если проект в Vercel
  будет переименован или подключат собственный домен, менять здесь, в одном месте.
- `alternates.canonical` на страницах каталога задаётся относительным путём — `metadataBase`
  превращает его в абсолютный канонический URL.

---

## 3. `app/sitemap.ts`

Файл-конвенция Next.js: default-экспорт функции, возвращающей `MetadataRoute.Sitemap`
(массив `{ url, lastModified, changeFrequency?, priority? }`). Отдаётся как `/sitemap.xml`.

Состав — из локальных данных каталога (тот же источник, что и страницы, см.
`Architecture.md`, п.1):

- статические маршруты: `/`, `/catalog`, `/services`, `/company`, `/contacts`, `/delivery`,
  `/legal/privacy`, `/legal/offer`;
- по одной записи на категорию — `getCategories()` → `/catalog/{slug}`;
- по одной записи на товар — `getProducts()` → `/catalog/{category}/{slug}`.

`lastModified` — время сборки (`new Date()`): в данных нет пофайловых дат изменения,
вводить их «на будущее» не нужно. Абсолютные URL строятся от базового адреса из
`config/site.ts`. Файл кэшируется Next.js по умолчанию — для локальных статических данных
это корректно.

---

## 4. `app/robots.ts`

Файл-конвенция Next.js: default-экспорт функции, возвращающей `MetadataRoute.Robots`.
Отдаётся как `/robots.txt`.

- `rules`: `userAgent: "*"`, `allow: "/"`. Закрывать нечего — приватных разделов,
  личного кабинета и форм сбора данных на сайте нет (`CLAUDE.md`).
- `sitemap`: абсолютный URL `"{baseUrl}/sitemap.xml"` из `config/site.ts`.
- `host`: базовый адрес сайта.

---

## 5. `generateStaticParams` для роутов каталога

Оба динамических роута каталога получают `generateStaticParams`, перечисляющий все
существующие параметры из локальных данных — страницы каталога пререндерятся статически:

- **`app/catalog/[category]/page.tsx`** — `getCategories()` → `[{ category: slug }]`.
- **`app/catalog/[category]/[slug]/page.tsx`** — `getProducts()` →
  `[{ category, slug }]` по каждому товару.

Неизвестные пути уже обрабатываются: обе страницы вызывают `notFound()` для отсутствующей
категории/товара (см. `Architecture.md`, 2.1 — `app/not-found.tsx`). Отдельно настраивать
`dynamicParams` не требуется — список из локальных данных полный.

---

## 6. `alt`-тексты изображений категорий

Изображение категории несёт смысл — показывает, какая это категория, поэтому пустой
декоративный `alt` здесь не подходит.

Решение: **`alt` изображения категории = `Category.name`** — везде, где выводится
`Category.image` (сейчас это плитки на `/catalog`, уже реализовано; при появлении новых
мест — то же правило).

Смежно (относится к известным багам вёрстки, чинится отдельно, но правило фиксируем здесь):
`alt` изображения товара = `Product.title`.

---

## 7. `app/opengraph-image.tsx`

Файл-конвенция Next.js: корневой `app/opengraph-image.tsx` — Next сам добавляет
`og:image`/`twitter:image` теги во все страницы. Размер холста — 1200×630.

- Содержимое — название сайта и краткий дескриптор из `config/site.ts` на фоне в
  токенах дизайн-системы (`Frontend.md`, раздел 4.1: `brand-800` акцент, светлый фон).
- Реализация — генерация кодом через `next/og` (`ImageResponse`) либо статический
  `opengraph-image.(png|jpg)`; выбор — на этапе кода, на решение это не влияет.
- Пер-сегментные OG-картинки не заводим (см. раздел 1).

---

## 8. JSON-LD (структурированные данные)

Рендерится нативным тегом `<script type="application/ld+json">` прямо в теле серверного
компонента страницы (рекомендация Next.js). Payload — обычный объект, сериализуется
`JSON.stringify(data).replace(/</g, "\\u003c")` для защиты от XSS-инъекции через строковые
поля. Отдельную типизацию/библиотеку (`schema-dts`) не подключаем.

### 8.1 `Product` — на `/catalog/[category]/[slug]`

Поля берутся из типа `Product` (`Product.md`, раздел 1), без выдуманных значений:

| Поле schema.org | Источник |
|---|---|
| `@type` | `"Product"` |
| `name` | `product.title` |
| `description` | `product.description` |
| `image` | `product.images` (абсолютные URL через `metadataBase`); если пусто — поле опускаем |
| `sku` | `product.sku` (если есть) |
| `brand` | `{ "@type": "Brand", "name": <название производителя из lib/data/manufacturers.ts> }` (если `product.manufacturer` задан) |
| `category` | название категории |

Блок `offers`/цены **не добавляем** — цены в проекте нет. Складской статус
(`availability`) в разметку предложения тоже не выносим (в `Product.md`, 2.2 он
переопределён и не означает наличие на складе).

### 8.2 `BreadcrumbList` — на `/catalog/[category]` и `/catalog/[category]/[slug]`

Элементы совпадают с видимыми хлебными крошками (`components/layout/Breadcrumbs`):

- категория: `Каталог` → `Название категории`;
- товар: `Каталог` → `Название категории` → `Название товара`.

`item` каждого уровня — абсолютный URL соответствующей страницы.

---

## 9. Временный noindex для `/catalog/*` (аудит 2026-09-05)

**Статус: временная мера, не финальное решение.** Каталог сейчас наполнен тестовыми
данными для проверки вёрстки (`lib/data/products.ts` — см. комментарий в начале файла),
а не реальной номенклатурой поставщика. Индексировать эти страницы поисковиками до
прихода реальных товаров не нужно — иначе в выдаче окажутся тестовые карточки, которые
потом исчезнут/изменятся.

Решение: `robots: { index: false }` в метаданных всех страниц `/catalog/*`:

- `app/catalog/page.tsx` — в статическом `export const metadata`;
- `app/catalog/[category]/page.tsx` и `app/catalog/[category]/[slug]/page.tsx` — в
  `generateMetadata`, в обеих ветках (найдена страница или нет).

**Убрать, когда каталог наполнится реальными данными от поставщика** (см. открытый
вопрос в `Product.md`, раздел 5) — это единственное условие снятия, отдельного тикета
не заводим. `follow` не трогаем (по умолчанию `true`) — ссылки со страниц каталога
роботу проходить можно, запрещаем только попадание самих тестовых карточек в индекс.

Sitemap (раздел 3) при этом не меняем: `noindex` уже сам по себе говорит роботу не
индексировать страницу, отдельно вычищать записи `/catalog/*` из `sitemap.ts` ради
такого же эффекта избыточно, а по приходу реальных данных `noindex` всё равно снимается.

---

## 10. Как это ложится на существующий код

- `generateMetadata` уже используется на всех динамических страницах каталога и в
  `legal/[doc]` (`CLAUDE.md`: метаданные только встроенным механизмом). SEO-пакет их не
  заменяет, а дополняет: `metadataBase` — в layout; OG-картинка — файл-конвенцией;
  JSON-LD — в теле страницы; sitemap/robots — специальными файлами.
- Текстовые OG/Twitter-поля (`openGraph.title`, `openGraph.description`, `twitter.card`)
  добавляются в те же объекты `metadata` / `generateMetadata`, что уже есть.
- Новых источников данных не вводится — sitemap и `generateStaticParams` читают
  `lib/data/*` теми же функциями, что и страницы.

---

## 11. Файлы

Новые:

- `src/app/sitemap.ts` — карта сайта из каталога (раздел 3).
- `src/app/robots.ts` — `robots.txt` со ссылкой на sitemap (раздел 4).
- `src/app/opengraph-image.tsx` — OG-картинка сайта по умолчанию (раздел 7).
- `src/config/site.ts` — базовый URL, название, дескриптор, контакты, соцсети
  (создаётся в рамках этого пакета; `Architecture.md`, 2.2).

Изменяются:

- `src/app/layout.tsx` — `metadataBase` из `config/site.ts`, вынос захардкоженного
  названия/описания в `config/site.ts` (раздел 2).
- `src/app/catalog/[category]/page.tsx` — `generateStaticParams`, JSON-LD `BreadcrumbList`,
  `alternates.canonical`, временный `robots: { index: false }` (разделы 5, 8.2, 9).
- `src/app/catalog/[category]/[slug]/page.tsx` — `generateStaticParams`, JSON-LD `Product`
  и `BreadcrumbList`, `alternates.canonical`, временный `robots: { index: false }`
  (разделы 5, 8, 9).
- `src/app/catalog/page.tsx` — `alt` плиток категорий = `Category.name` (раздел 6),
  временный `robots: { index: false }` (раздел 9).
