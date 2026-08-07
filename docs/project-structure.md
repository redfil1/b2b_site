# Project Structure.md — B2B-магазин спецтехники

Статус: рабочая версия.
Связанные документы: `Architecture.md`, `Tech Stack.md`, `Coding Rules.md`, `API.md`.

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
│   ├── manufacturers/page.tsx
│   ├── services/page.tsx
│   ├── company/page.tsx
│   ├── contacts/page.tsx
│   ├── delivery/page.tsx
│   ├── request/
│   │   ├── page.tsx
│   │   └── success/page.tsx
│   ├── legal/[doc]/page.tsx
│   ├── api/
│   │   ├── request/
│   │   │   ├── route.ts            — приём заявки, уведомление менеджера, запуск генерации КП (см. API.md)
│   │   │   └── [id]/
│   │   │       └── status/route.ts — статус генерации КП / ссылка на скачивание (см. API.md)
│   ├── not-found.tsx
│   └── error.tsx
│
├── components/
│   ├── ui/                        — кнопки, инпуты, карточки-примитивы (без бизнес-логики)
│   ├── layout/                    — Header, Footer, Breadcrumbs, Container
│   └── features/                  — сборные блоки конкретных разделов
│       ├── catalog/
│       ├── product/                — компоненты карточки товара
│       └── request/
│
├── lib/
│   ├── data/                       — локальные данные каталога (см. Architecture.md, п.1)
│   │   ├── products.ts             — функции + сами данные товаров
│   │   ├── categories.ts           — функции + сами данные категорий
│   │   └── manufacturers.ts        — функции + данные производителей (та же локальная модель)
│   ├── pdf/                        — генерация КП (см. API.md)
│   │   └── proposal-template.tsx   — шаблон PDF на @react-pdf/renderer
│   ├── constants/
│   └── utils/
│
├── types/
│   ├── product.ts                   — `Product` (публичный тип для компонентов) и `ProductDraft`
│   │                                   (расширяет Product полем `missingData`, только для lib/data/products.ts —
│   │                                   служебная пометка не должна попадать в клиентский код, см. Product.md)
│   ├── category.ts
│   ├── manufacturer.ts
│   └── request.ts
│
├── hooks/
├── config/
│   └── site.ts                     — название, meta по умолчанию, соцсети, контакты
│
public/
```

## Правила
- **`components/ui` не знает о данных** — только пропсы и вёрстка. Всё, что дёргает `lib/data`, живёт в `components/features/*` или в `page.tsx`.
- **Один тип — одно место**: типы `Product`, `Category`, `RequestPayload` объявляются один раз в `types/` и импортируются везде (чаты Карточки/Заявка/Фронт не заводят дублирующие интерфейсы).
- Алиас путей `@/*` → `src/*` в `tsconfig.json`, чтобы не было `../../../../`.
