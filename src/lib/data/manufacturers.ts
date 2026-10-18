import type { Manufacturer } from "@/types/manufacturer";

// Производители реального каталога поставщика (Product.md, раздел 7, 2026-10-18).
//
// Используется только для отображаемого имени производителя на карточке товара
// (app/catalog/[category]/[slug]/page.tsx, поле `brand` в JSON-LD) и как ключ поиска
// (app/search/page.tsx). Блок «Производители» на главной убран 2026-09-07 (Frontend.md,
// раздел 8.10) — реальных логотипов нет; поэтому `logo` не заполнен.
const manufacturers: Manufacturer[] = [
  {
    slug: "tektronix",
    name: "Tektronix",
  },
  {
    slug: "keysight",
    name: "Keysight",
  },
  {
    slug: "rohde-schwarz",
    name: "Rohde & Schwarz",
  },
  {
    slug: "yokogawa",
    name: "Yokogawa",
  },
  {
    slug: "uni-t",
    name: "UNI-T",
  },
  {
    slug: "ceyear",
    name: "Ceyear",
  },
];

export function getManufacturer(slug: string): Manufacturer | undefined {
  return manufacturers.find((manufacturer) => manufacturer.slug === slug);
}
