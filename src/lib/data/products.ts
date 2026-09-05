import type { Product, ProductDraft } from "@/types/product";

// Тестовые данные для проверки вёрстки — не настоящие товары поставщика (реальных
// материалов от поставщика ещё нет, см. Product.md, раздел 5). missingData оставлен
// пустым массивом, т.к. это не реальные черновики карточек, уточнять у поставщика нечего.
// category/manufacturer ссылаются на реально существующие slug из lib/data/categories.ts
// и lib/data/manufacturers.ts. images — сгенерированные заглушки в public/images/products/
// (тот же приём, что для hero/категорий/логотипов: простая графика на светлом фоне, не
// стоковые фото), чтобы в галерее/лайтбоксе (ProductGallery.tsx) не было битых картинок;
// заменяются реальными фото товаров тем же путём, когда они появятся у поставщика.
const productDrafts: ProductDraft[] = [
  {
    id: "gas-analyzer-multi-01",
    slug: "multi-gas-analyzer-mga-500",
    title: "Многокомпонентный газоанализатор MGA-500",
    manufacturer: "hanke-instruments",
    model: "MGA-500",
    country: "Китай",
    sku: "HK-MGA500",
    category: "gas-analyzers",
    specs: [
      { label: "Измеряемые газы", value: "CO, CO2, O2, H2S, CH4" },
      { label: "Диапазон измерения CO", value: "0–500 ppm" },
      { label: "Класс точности", value: "±2% от шкалы" },
      { label: "Питание", value: "Аккумулятор Li-ion, до 12 часов работы" },
    ],
    package: [
      "Основной блок",
      "Зарядное устройство",
      "Кейс для переноски",
      "Инструкция на русском",
    ],
    documents: [
      {
        title: "Паспорт оборудования",
        url: "https://blob.vercel-storage.com/docs/gas-analyzer-multi-01/passport.pdf",
      },
    ],
    description:
      "Портативный многокомпонентный газоанализатор для контроля загазованности воздуха рабочей зоны. Применяется на промышленных объектах, в котельных и при проведении газоопасных работ. Одновременно измеряет до пяти газов.",
    deliveryTime: "45–60 дней",
    availability: "available",
    images: ["/images/products/multi-gas-analyzer-mga-500-1.jpg"],
    missingData: [],
  },
  {
    id: "kip-pressure-sensor-01",
    slug: "pressure-sensor-pd-200",
    title: "Датчик давления PD-200",
    manufacturer: "dalian-measurement",
    model: "PD-200",
    country: "Китай",
    sku: "DM-PD200",
    category: "kip",
    specs: [
      { label: "Диапазон измерения давления", value: "0–25 МПа" },
      { label: "Класс точности", value: "0.5" },
      { label: "Выходной сигнал", value: "4–20 мА" },
      { label: "Материал мембраны", value: "Нержавеющая сталь 316L" },
    ],
    package: ["Датчик давления", "Комплект монтажных фитингов"],
    description:
      "Промышленный датчик избыточного давления с унифицированным токовым выходом. Используется для контроля технологических процессов в трубопроводах и резервуарах.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: ["/images/products/pressure-sensor-pd-200-1.jpg"],
    missingData: [],
  },
  {
    id: "lab-equipment-centrifuge-01",
    slug: "laboratory-centrifuge-lc-800",
    title: "Лабораторная центрифуга LC-800",
    manufacturer: "yateks-lab-systems",
    model: "LC-800",
    country: "Китай",
    category: "lab-equipment",
    specs: [
      { label: "Максимальная скорость", value: "15 000 об/мин" },
      { label: "Вместимость ротора", value: "24 x 1.5/2.0 мл" },
      { label: "Управление", value: "Электронное, с дисплеем" },
    ],
    package: ["Центрифуга", "Ротор", "Набор адаптеров", "Инструкция на русском"],
    documents: [
      {
        title: "Сертификат соответствия",
        url: "https://blob.vercel-storage.com/docs/lab-equipment-centrifuge-01/certificate.pdf",
      },
    ],
    description:
      "Настольная лабораторная центрифуга для клинических и промышленных лабораторий. Подходит для разделения проб малого объёма при высоких скоростях вращения.",
    deliveryTime: "30–40 дней",
    availability: "unavailable",
    images: ["/images/products/laboratory-centrifuge-lc-800-1.jpg"],
    missingData: [],
  },
  {
    id: "special-equipment-loader-01",
    slug: "mini-wheel-loader-zc-30",
    title: "Мини-погрузчик колёсный ZC-30",
    manufacturer: "zhongce-machinery",
    model: "ZC-30",
    country: "Китай",
    category: "special-equipment",
    specs: [
      { label: "Грузоподъёмность", value: "3000 кг" },
      { label: "Мощность двигателя", value: "92 л.с." },
      { label: "Объём ковша", value: "1.8 м³" },
    ],
    package: ["Базовая комплектация", "Ковш"],
    description:
      "Колёсный мини-погрузчик для строительных и складских работ. Компактные габариты позволяют работать в стеснённых условиях.",
    deliveryTime: "60–90 дней",
    availability: "unavailable",
    images: ["/images/products/mini-wheel-loader-zc-30-1.jpg"],
    missingData: [],
  },
  {
    id: "gas-analyzer-single-01",
    slug: "single-gas-detector-sgd-100",
    title: "Одноканальный газоанализатор SGD-100",
    manufacturer: "dalian-measurement",
    model: "SGD-100",
    country: "Китай",
    category: "gas-analyzers",
    specs: [
      { label: "Измеряемый газ", value: "H2S" },
      { label: "Диапазон измерения", value: "0–100 ppm" },
      { label: "Время отклика", value: "≤15 сек" },
    ],
    package: ["Основной блок", "Клипса для крепления"],
    description:
      "Одноканальный переносной детектор сероводорода для персонального контроля загазованности. Компактный корпус, звуковая и световая сигнализация превышения порога.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: ["/images/products/single-gas-detector-sgd-100-1.jpg"],
    missingData: [],
  },
  {
    id: "kip-flow-meter-01",
    slug: "ultrasonic-flow-meter-uf-400",
    title: "Ультразвуковой расходомер UF-400",
    manufacturer: "hanke-instruments",
    model: "UF-400",
    country: "Китай",
    category: "kip",
    specs: [
      { label: "Диаметр трубопровода", value: "DN50–DN700" },
      { label: "Погрешность измерения", value: "±1%" },
      { label: "Тип монтажа", value: "Накладной" },
    ],
    package: ["Основной блок", "Ультразвуковые датчики (2 шт.)", "Кабель"],
    documents: [
      {
        title: "Паспорт оборудования",
        url: "https://blob.vercel-storage.com/docs/kip-flow-meter-01/passport.pdf",
      },
    ],
    description:
      "Ультразвуковой расходомер накладного типа для измерения расхода жидкости в трубопроводах без врезки. Применяется в системах учёта воды и технологических жидкостей.",
    deliveryTime: "45–60 дней",
    availability: "available",
    images: ["/images/products/ultrasonic-flow-meter-uf-400-1.jpg"],
    missingData: [],
  },
];

/** ProductDraft — служебный тип, наружу из этого модуля не отдаём (Product.md, раздел 4). */
function toProduct(draft: ProductDraft): Product {
  const { missingData, ...product } = draft;
  void missingData; // отбрасываем служебное поле, не должно попадать в клиентский код
  return product;
}

export function getProducts(): Product[] {
  return productDrafts.map(toProduct);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return productDrafts.filter((draft) => draft.category === categorySlug).map(toProduct);
}

export function getProduct(category: string, slug: string): Product | undefined {
  const draft = productDrafts.find((item) => item.category === category && item.slug === slug);
  return draft ? toProduct(draft) : undefined;
}

// Поиск по одному slug, без категории — нужен для /contacts?product=<slug> (карточка
// товара передаёт только slug, не полный путь). slug — обязательное и по факту уникальное
// поле в каталоге, в отличие от sku (опционален, есть не у всех товаров), поэтому именно
// он выбран идентификатором для этой ссылки.
export function getProductBySlug(slug: string): Product | undefined {
  const draft = productDrafts.find((item) => item.slug === slug);
  return draft ? toProduct(draft) : undefined;
}
