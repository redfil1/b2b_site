import type { Metadata } from "next";
import Link from "next/link";
import Fuse, { type IFuseOptions } from "fuse.js";
import { ProductGrid } from "@/components/features/catalog/ProductGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SearchForm } from "@/components/layout/SearchForm";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/lib/data/categories";
import { getManufacturer } from "@/lib/data/manufacturers";
import { getProducts } from "@/lib/data/products";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: `Поиск — ${siteConfig.name}`,
  description:
    "Поиск по каталогу оборудования: название, модель, артикул, производитель, описание, категория.",
};

// Толерантный к опечаткам поиск по каталогу через fuse.js (утилитарная библиотека —
// Coding Rules.md). /search — решённый роут (Architecture.md, раздел 2): серверный
// компонент, данные из локального каталога тем же getProducts(), что и остальные
// страницы, без сетевого слоя.

// К каждому товару добавляем имя производителя и название категории, чтобы искать и по
// ним; ProductGrid при этом продолжает работать с обычным Product (лишние поля ему не
// мешают).
type SearchEntry = Product & { manufacturerName: string; categoryName: string };

function buildSearchEntries(): SearchEntry[] {
  return getProducts().map((product) => ({
    ...product,
    manufacturerName: product.manufacturer
      ? (getManufacturer(product.manufacturer)?.name ?? "")
      : "",
    categoryName: getCategory(product.category)?.name ?? "",
  }));
}

// threshold 0.3 — строже прежних 0.35 (ужесточено 2026-09-07, Frontend.md, раздел 8.10):
// на маленьком каталоге при 0.35 короткие запросы («КИП») вытягивали нечёткие совпадения
// по обрывкам слов в описании (погрузчик, центрифуга). minMatchCharLength 2 отсекает
// одно-символьный нечёткий шум, не мешая реальным коротким запросам (модели, «КИП»).
// ignoreLocation — совпадение важно в любом месте строки, а не только в начале. Веса
// (Frontend.md, раздел 8.4): точное попадание в название/модель весит больше всего;
// артикул и производитель — средне; описание и категория — меньше всего, чтобы запрос по
// применению («котельная», «расходомер») находил товар, но не вытеснял совпадения по
// названию/модели. Fuse суммирует вклад полей с учётом weight.
const FUSE_OPTIONS: IFuseOptions<SearchEntry> = {
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 0.5 },
    { name: "model", weight: 0.25 },
    { name: "sku", weight: 0.12 },
    { name: "manufacturerName", weight: 0.12 },
    { name: "description", weight: 0.1 },
    { name: "categoryName", weight: 0.1 },
  ],
};

// Индекс строится один раз при загрузке модуля, а не на каждый запрос: каталог —
// локальные данные, не меняющиеся во время работы процесса, пересборка Fuse на
// каждый рендер страницы была лишней работой.
const SEARCH_ENTRIES = buildSearchEntries();
const SEARCH_INDEX = new Fuse(SEARCH_ENTRIES, FUSE_OPTIONS);

// Нормализация запроса до fuse.js (Frontend.md, раздел 11): инженеры пишут бренды
// по-русски и единицы латиницей («кейсайт», «1 GHz»), а в данных — латинские названия
// брендов и «ГГц». Нечёткий поиск такие расхождения не ловит («кейсайт» → 0, «текстроникс»
// находил R&S по «…электроники»), поэтому — небольшой словарь замен, не второй поиск.
const QUERY_SYNONYMS: [RegExp, string][] = [
  [/кейсайт|кисайт|кейсайд/giu, "Keysight"],
  [/текстроникс|тектроникс|тэктроникс/giu, "Tektronix"],
  [/роде\s*(?:и\s*|&\s*|-\s*)?шварц|r\s*&\s*s/giu, "Rohde & Schwarz"],
  [/[йи]окогава|ёкогава/giu, "Yokogawa"],
  [/юни[\s-]?ти|юнит/giu, "UNI-T"],
  [/кейтли|кейсли/giu, "Keithley"],
  [/сейер|сейар|цейер/giu, "Ceyear"],
  [/ghz/giu, "ГГц"],
  [/mhz/giu, "МГц"],
  [/khz/giu, "кГц"],
];

function normalizeQuery(query: string): string {
  return QUERY_SYNONYMS.reduce((text, [pattern, value]) => text.replace(pattern, value), query);
}

// Частота в запросе («1 ГГц», «500 МГц») ищется точно, а не нечётко: иначе «1 ГГц»
// находил и «1,5 ГГц», и «45 ГГц» (29 из 52 позиций). Остаток запроса (если есть) идёт
// в fuse.js, частота — фильтром по названию и характеристикам.
const FREQUENCY_PATTERN = /(\d+(?:[.,]\d+)?)\s*(ГГц|МГц|кГц)/iu;

function hasFrequency(entry: SearchEntry, value: string, unit: string): boolean {
  // Перед числом не должно быть цифры/запятой/точки — «1 ГГц» не совпадает с «1,5 ГГц»
  // и «11 ГГц»; после числа — пробел (необязательный) и та же единица.
  const number = value.replace(/[.,]/, "[.,]");
  const exact = new RegExp(`(^|[^\\d.,])${number}\\s*${unit}`, "iu");
  return [entry.title, ...entry.specs.map((spec) => spec.value)].some((text) => exact.test(text));
}

function searchCatalog(rawQuery: string): Product[] {
  const query = normalizeQuery(rawQuery);
  const frequency = query.match(FREQUENCY_PATTERN);
  if (!frequency) {
    return SEARCH_INDEX.search(query).map((result) => result.item);
  }
  const [, value, unit] = frequency;
  const rest = query.replace(FREQUENCY_PATTERN, " ").trim();
  const candidates = rest ? SEARCH_INDEX.search(rest).map((result) => result.item) : SEARCH_ENTRIES;
  return candidates.filter((entry) => hasFrequency(entry, value, unit));
}

export default async function SearchPage(props: PageProps<"/search">) {
  const { q } = await props.searchParams;
  const query = (typeof q === "string" ? q : "").trim();

  const results: Product[] = query ? searchCatalog(query) : [];

  return (
    <Container as="main" className="py-10">
      <Breadcrumbs items={[{ label: "Поиск" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Поиск по каталогу</h1>

      {/* Поле поиска на самой странице (Frontend.md, раздел 8.4) — предзаполнено текущим
          запросом, чтобы уточнять его, не возвращаясь к шапке. */}
      <SearchForm defaultValue={query} className="mt-6 max-w-xl" />

      {query === "" ? (
        <p className="mt-6 text-secondary">
          Введите название, модель, артикул, производителя или задачу — поиск идёт по всему
          каталогу.
        </p>
      ) : results.length > 0 ? (
        <>
          <p className="mt-2 text-secondary">
            По запросу «{query}» найдено: {results.length}
          </p>
          <div className="mt-8">
            <ProductGrid products={results} />
          </div>
        </>
      ) : (
        <div className="mt-6 flex flex-col items-start gap-3">
          <p className="text-secondary">
            По запросу «{query}» ничего не найдено. Попробуйте изменить формулировку.
          </p>
          {/* Нулевой результат — момент максимального намерения (Frontend.md, раздел 8.10):
              не сливаем клиента в общий каталог, а предлагаем описать задачу менеджеру.
              Тот же спокойный блок, что внизу /catalog (раздел 8.8). */}
          <div className="mt-2 w-full rounded-2xl border border-gray-200 bg-secondary p-6">
            <h2 className="text-xl font-semibold text-primary">Не нашли нужное?</h2>
            <p className="mt-2 max-w-2xl text-secondary">
              Каталог — примеры оборудования, которое мы поставляем. Опишите требуемые
              характеристики, и менеджер подберёт и привезёт подходящую позицию под заказ.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-800 px-5 py-2.5 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-brand-600"
              >
                Связаться с менеджером
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-2xl border border-brand-800 px-5 py-2.5 text-base font-semibold text-brand-800 transition-colors duration-200 ease-out hover:bg-brand-800/5"
              >
                Перейти в каталог
              </Link>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
