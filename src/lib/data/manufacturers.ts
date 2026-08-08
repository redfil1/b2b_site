import type { Manufacturer } from "@/types/manufacturer";

// Тестовые данные для проверки вёрстки — не согласованный с поставщиком список
// производителей. Реальный список наполняется по мере поступления данных (Product.md, раздел 5).
// logo — временная заглушка-путь, реальных файлов логотипов ещё нет.
const manufacturers: Manufacturer[] = [
  {
    slug: "hanke-instruments",
    name: "Hanke Instruments",
    logo: "/images/manufacturers/hanke-instruments.svg",
  },
  {
    slug: "dalian-measurement",
    name: "Dalian Measurement Group",
    logo: "/images/manufacturers/dalian-measurement.svg",
  },
  {
    slug: "yateks-lab-systems",
    name: "Yateks Lab Systems",
    logo: "/images/manufacturers/yateks-lab-systems.svg",
  },
  {
    slug: "zhongce-machinery",
    name: "Zhongce Machinery",
    logo: "/images/manufacturers/zhongce-machinery.svg",
  },
];

export function getManufacturers(): Manufacturer[] {
  return manufacturers;
}

export function getManufacturer(slug: string): Manufacturer | undefined {
  return manufacturers.find((manufacturer) => manufacturer.slug === slug);
}
