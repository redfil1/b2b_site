import type { Manufacturer } from "@/types/manufacturer";

// Тестовые данные для проверки вёрстки — не согласованный с поставщиком список
// производителей. Реальный список наполняется по мере поступления данных (Product.md, раздел 5).
//
// Используется только для отображаемого имени производителя на карточке товара
// (app/catalog/[category]/[slug]/page.tsx, поле `brand` в JSON-LD) и как ключ поиска
// (app/search/page.tsx). Блок «Производители» на главной убран 2026-09-07 (Frontend.md,
// раздел 8.10) — реальных логотипов нет, список названий на главной ценности не давал;
// поэтому `logo` не заполнен и `getManufacturers()` больше не нужен.
const manufacturers: Manufacturer[] = [
  { slug: "hanke-instruments", name: "Hanke Instruments" },
  { slug: "dalian-measurement", name: "Dalian Measurement Group" },
  { slug: "yateks-lab-systems", name: "Yateks Lab Systems" },
  { slug: "zhongce-machinery", name: "Zhongce Machinery" },
];

export function getManufacturer(slug: string): Manufacturer | undefined {
  return manufacturers.find((manufacturer) => manufacturer.slug === slug);
}
