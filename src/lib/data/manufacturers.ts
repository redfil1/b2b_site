import type { Manufacturer } from "@/types/manufacturer";

// Тестовые данные для проверки вёрстки — не согласованный с поставщиком список
// производителей. Реальный список наполняется по мере поступления данных (Product.md, раздел 5).
// Используется на главной (Frontend.md, 4.3.4).
//
// `logo` НЕ заполнен (2026-09-07, Frontend.md, раздел 8.10): раньше здесь были тестовые
// PNG-заглушки (сплошная плашка бренда, не настоящий логотип) в
// public/images/manufacturers/ — на мобильном ряд таких плашек выглядел как сломанные
// картинки. Пока реальных логотипов нет, блок на главной показывает названия строкой
// (ManufacturerLogos.tsx). Когда появятся файлы логотипов — заполнить `logo` тем же
// путём, и блок автоматически вернётся к сетке с картинками.
const manufacturers: Manufacturer[] = [
  { slug: "hanke-instruments", name: "Hanke Instruments" },
  { slug: "dalian-measurement", name: "Dalian Measurement Group" },
  { slug: "yateks-lab-systems", name: "Yateks Lab Systems" },
  { slug: "zhongce-machinery", name: "Zhongce Machinery" },
];

export function getManufacturers(): Manufacturer[] {
  return manufacturers;
}

export function getManufacturer(slug: string): Manufacturer | undefined {
  return manufacturers.find((manufacturer) => manufacturer.slug === slug);
}
