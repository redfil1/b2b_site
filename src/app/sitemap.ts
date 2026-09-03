import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";

// Карта сайта из локальных данных каталога (SEO.md, раздел 3) — тот же источник
// (getCategories/getProducts), что и у самих страниц, без отдельного слоя.
// Отдаётся как /sitemap.xml, кэшируется Next.js по умолчанию — для статических
// локальных данных это корректно.

// Статические маршруты с реально существующими страницами. `/search` не включаем
// осознанно: это страница результатов по query-параметру, в карте сайта смысла не несёт.
const STATIC_PATHS = [
  "/",
  "/catalog",
  "/services",
  "/company",
  "/contacts",
  "/delivery",
  "/legal/privacy",
  "/legal/offer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const { url: base } = siteConfig;
  // Пофайловых дат изменения в данных нет — используем время сборки (SEO.md, раздел 3).
  const lastModified = new Date();

  const staticEntries = STATIC_PATHS.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified,
  }));

  const categoryEntries = getCategories().map((category) => ({
    url: new URL(`/catalog/${category.slug}`, base).toString(),
    lastModified,
  }));

  const productEntries = getProducts().map((product) => ({
    url: new URL(`/catalog/${product.category}/${product.slug}`, base).toString(),
    lastModified,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
