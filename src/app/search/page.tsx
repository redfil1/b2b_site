import type { Metadata } from "next";
import Link from "next/link";
import Fuse, { type IFuseOptions } from "fuse.js";
import { ProductGrid } from "@/components/features/catalog/ProductGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { getManufacturer } from "@/lib/data/manufacturers";
import { getProducts } from "@/lib/data/products";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: `Поиск — ${siteConfig.name}`,
  description: "Поиск по каталогу оборудования: название, модель, артикул, производитель.",
};

// Толерантный к опечаткам поиск по каталогу через fuse.js (утилитарная библиотека —
// Coding Rules.md). /search — решённый роут (Architecture.md, раздел 2): серверный
// компонент, данные из локального каталога тем же getProducts(), что и остальные
// страницы, без сетевого слоя.

// К каждому товару добавляем имя производителя, чтобы искать и по нему; ProductGrid
// при этом продолжает работать с обычным Product (лишнее поле ему не мешает).
type SearchEntry = Product & { manufacturerName: string };

function buildSearchEntries(): SearchEntry[] {
  return getProducts().map((product) => ({
    ...product,
    manufacturerName: product.manufacturer
      ? (getManufacturer(product.manufacturer)?.name ?? "")
      : "",
  }));
}

// threshold 0.35 — середина рекомендованного диапазона: прощает опечатки, но не
// вытягивает нерелевантное. ignoreLocation — совпадение важно в любом месте строки,
// а не только в начале. Веса: точное попадание в название/модель весит больше, чем
// в артикул и производителя (Fuse суммирует вклад полей с учётом weight).
const FUSE_OPTIONS: IFuseOptions<SearchEntry> = {
  threshold: 0.35,
  ignoreLocation: true,
  keys: [
    { name: "title", weight: 0.5 },
    { name: "model", weight: 0.3 },
    { name: "sku", weight: 0.15 },
    { name: "manufacturerName", weight: 0.15 },
  ],
};

export default async function SearchPage(props: PageProps<"/search">) {
  const { q } = await props.searchParams;
  const query = (typeof q === "string" ? q : "").trim();

  const results: Product[] = query
    ? new Fuse(buildSearchEntries(), FUSE_OPTIONS).search(query).map((result) => result.item)
    : [];

  return (
    <Container as="main" className="py-10">
      <Breadcrumbs items={[{ label: "Поиск" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Поиск по каталогу</h1>

      {query === "" ? (
        <p className="mt-6 text-secondary">
          Введите название, модель, артикул или производителя в поле поиска в шапке сайта.
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
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center rounded-2xl border border-brand-800 px-5 py-2.5 text-base font-semibold text-brand-800 transition-colors duration-200 ease-out hover:bg-brand-800/5"
          >
            Перейти в каталог
          </Link>
        </div>
      )}
    </Container>
  );
}
