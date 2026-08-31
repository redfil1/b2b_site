import type { Manufacturer } from "@/types/manufacturer";

// Тестовые данные для проверки вёрстки — не согласованный с поставщиком список
// производителей. Реальный список наполняется по мере поступления данных (Product.md, раздел 5).
// Используется в полосе логотипов производителей на главной (Frontend.md, 4.3.4).
// logo — тестовые PNG-заглушки в public/images/manufacturers/ (сплошная плашка бренда,
// не настоящий логотип); заменяются реальными файлами тем же путём.
const manufacturers: Manufacturer[] = [
  {
    slug: "hanke-instruments",
    name: "Hanke Instruments",
    logo: "/images/manufacturers/hanke-instruments.png",
  },
  {
    slug: "dalian-measurement",
    name: "Dalian Measurement Group",
    logo: "/images/manufacturers/dalian-measurement.png",
  },
  {
    slug: "yateks-lab-systems",
    name: "Yateks Lab Systems",
    logo: "/images/manufacturers/yateks-lab-systems.png",
  },
  {
    slug: "zhongce-machinery",
    name: "Zhongce Machinery",
    logo: "/images/manufacturers/zhongce-machinery.png",
  },
];

export function getManufacturers(): Manufacturer[] {
  return manufacturers;
}

export function getManufacturer(slug: string): Manufacturer | undefined {
  return manufacturers.find((manufacturer) => manufacturer.slug === slug);
}
