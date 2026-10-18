import type { Category } from "@/types/category";

// Категории реального каталога поставщика, зафиксированы 2026-10-18 (Product.md, раздел 7)
// вместо прежних тестовых. Порядок — от основных групп к вспомогательным, так же
// отсортированы товары в lib/data/products.ts. image — фото первого товара категории
// (Architecture.md, 1.1; Frontend.md, раздел 9): отдельных фото категорий у поставщика нет.
const categories: Category[] = [
  {
    slug: "oscilloscopes",
    name: "Осциллографы",
    // 23 позиции пяти брендов — фильтр по производителю (Frontend.md, раздел 12).
    filters: ["manufacturer"],
    description:
      "Цифровые осциллографы и осциллографы смешанных сигналов для отладки аналоговых, цифровых и силовых схем.",
    image: "/images/products/tektronix-mso58b-5-bw-1000/tektronix-mso58b-5-bw-1000-1.jpg",
  },
  {
    slug: "spectrum-analyzers",
    name: "Анализаторы спектра",
    description:
      "Анализаторы спектра и сигналов для радиочастотных измерений, разработки и контроля РЭА.",
    image: "/images/products/keysight-n9000b/keysight-n9000b-1.jpg",
  },
  {
    slug: "network-analyzers",
    name: "Анализаторы цепей",
    description:
      "Векторные анализаторы цепей для измерения S-параметров компонентов, кабелей и антенн.",
    image: "/images/products/keysight-p9377b/keysight-p9377b-1.jpg",
  },
  {
    slug: "signal-generators",
    name: "Генераторы сигналов",
    description:
      "Генераторы сигналов произвольной формы и ВЧ-генераторы для испытаний и настройки аппаратуры.",
    image: "/images/products/tektronix-afg31021/tektronix-afg31021-1.jpg",
  },
  {
    slug: "emc",
    name: "ЭМС-оборудование",
    description:
      "Измерительные приёмники и оборудование для испытаний на электромагнитную совместимость.",
    image: "/images/products/rohde-schwarz-esr3/rohde-schwarz-esr3-1.jpg",
  },
  {
    slug: "power-analyzers",
    name: "Анализаторы мощности",
    description: "Прецизионные анализаторы мощности для измерения энергопотребления и КПД.",
    image: "/images/products/yokogawa-wt310e/yokogawa-wt310e-1.jpg",
  },
  {
    slug: "precision-meters",
    name: "Прецизионные измерители",
    description:
      "Электрометры, пикоамперметры и нановольтметры для измерений сверхмалых токов и напряжений.",
    image: "/images/products/tektronix-6221-2182a-e/tektronix-6221-2182a-e-1.jpg",
  },
  {
    slug: "smu",
    name: "Источники-измерители (SMU)",
    description:
      "Источники-измерители для вольт-амперных характеристик полупроводников и компонентов.",
    image: "/images/products/keysight-b2910cl/keysight-b2910cl-1.jpg",
  },
  {
    slug: "power-supplies",
    name: "Источники питания",
    description: "Программируемые многоканальные источники питания постоянного тока.",
    image: "/images/products/rohde-schwarz-hmp4040/rohde-schwarz-hmp4040-1.jpg",
  },
  {
    slug: "multimeters",
    name: "Мультиметры",
    description: "Настольные цифровые мультиметры для лабораторий и производства.",
    image: "/images/products/uni-t-ut8806/uni-t-ut8806-1.jpg",
  },
  {
    slug: "frequency-counters",
    name: "Частотомеры",
    description: "Универсальные частотомеры и измерители временных интервалов.",
    image: "/images/products/keysight-53230a/keysight-53230a-1.jpg",
  },
  {
    slug: "data-loggers",
    name: "Регистраторы данных",
    description: "Регистраторы данных для многоканального сбора и записи измерений.",
    image: "/images/products/yokogawa-gp10/yokogawa-gp10-1.jpg",
  },
  {
    slug: "options",
    name: "Опции и расширения",
    description: "Программные опции и модули расширения функций приборов.",
    image: "/images/products/tektronix-mdo3sa/tektronix-mdo3sa-1.jpg",
  },
];

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
