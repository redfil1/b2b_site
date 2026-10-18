import type { Product, ProductDraft } from "@/types/product";

// Реальный каталог поставщика, загружен 2026-10-18 (Product.md, раздел 7) из архива
// «Брошюры_оборудование» (catalog.json + фото + PDF-брошюры). Правила переноса:
// brand → manufacturer (slug из lib/data/manufacturers.ts), specs[].name → label,
// brochure → documents (файл в public/brochures/), фото — public/images/products/{slug}/.
// Остаток у поставщика (stock) на сайт не переносится — склада в РФ нет, всё под заказ
// (Product.md, 2.2). Срока поставки и страны производства в исходных данных нет:
// deliveryTime — "уточняется по заявке", country — в missingData.
const productDrafts: ProductDraft[] = [
  {
    id: "tektronix-mso58b-5-bw-1000",
    slug: "tektronix-mso58b-5-bw-1000",
    title: "Осциллограф смешанных сигналов Tektronix MSO58B, 1 ГГц, 8 каналов",
    manufacturer: "tektronix",
    model: "MSO58B 5-BW-1000",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "1 ГГц",
      },
      {
        label: "Входы",
        value: "8 FlexChannel (аналоговый или 8 цифровых каждый)",
      },
      {
        label: "Частота дискретизации",
        value: "6,25 Гвыб/с на всех каналах",
      },
      {
        label: "Разрешение АЦП",
        value: "12 бит (до 16 бит в режиме High Res)",
      },
      {
        label: "Длина записи",
        value: "62,5 млн точек (опционально до 500 млн)",
      },
      {
        label: "Цифровые каналы",
        value: "до 64 (с пробниками TLP058)",
      },
      {
        label: "Дисплей",
        value: '15,6", 1920×1080, сенсорный',
      },
    ],
    features: [
      "8 аналоговых каналов в одном приборе",
      "Каждый вход переключается в 8 логических каналов",
      "Расширение полосы программным ключом",
      "Декодирование последовательных шин (опции)",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mso58b-5-bw-1000.pdf",
      },
    ],
    description:
      "Осциллограф 5-й серии B с восемью универсальными входами FlexChannel и 12-битным АЦП. Подходит для силовой электроники, встраиваемых систем и многофазных измерений, где нужно много каналов одновременно.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mso58b-5-bw-1000/tektronix-mso58b-5-bw-1000-1.jpg",
      "/images/products/tektronix-mso58b-5-bw-1000/tektronix-mso58b-5-bw-1000-2.jpg",
      "/images/products/tektronix-mso58b-5-bw-1000/tektronix-mso58b-5-bw-1000-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mso54b-5-bw-500",
    slug: "tektronix-mso54b-5-bw-500",
    title: "Осциллограф смешанных сигналов Tektronix MSO54B, 500 МГц, 4 канала",
    manufacturer: "tektronix",
    model: "MSO54B 5-BW-500",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "500 МГц",
      },
      {
        label: "Входы",
        value: "4 FlexChannel",
      },
      {
        label: "Частота дискретизации",
        value: "6,25 Гвыб/с на всех каналах",
      },
      {
        label: "Разрешение АЦП",
        value: "12 бит",
      },
      {
        label: "Длина записи",
        value: "62,5 млн точек",
      },
      {
        label: "Цифровые каналы",
        value: "до 32 (с пробниками TLP058)",
      },
      {
        label: "Дисплей",
        value: '15,6", 1920×1080, сенсорный',
      },
    ],
    features: [
      "12-битный АЦП на всех каналах",
      "Расширение полосы без замены прибора",
      "Большой сенсорный экран",
      "Анализ протоколов и силовых измерений (опции)",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mso54b-5-bw-500.pdf",
      },
    ],
    description:
      "Четырёхканальный осциллограф 5-й серии B с 12-битным АЦП и большим сенсорным экраном. Универсальный прибор для отладки цифровых, аналоговых и силовых схем.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mso54b-5-bw-500/tektronix-mso54b-5-bw-500-1.jpg",
      "/images/products/tektronix-mso54b-5-bw-500/tektronix-mso54b-5-bw-500-2.jpg",
      "/images/products/tektronix-mso54b-5-bw-500/tektronix-mso54b-5-bw-500-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mdo3014",
    slug: "tektronix-mdo3014",
    title: "Осциллограф смешанных областей Tektronix MDO3014, 100 МГц",
    manufacturer: "tektronix",
    model: "MDO3014",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "100 МГц",
      },
      {
        label: "Аналоговые каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "2,5 Гвыб/с",
      },
      {
        label: "Длина записи",
        value: "10 млн точек",
      },
      {
        label: "Анализатор спектра",
        value: "встроенный, расширение до 3 ГГц (опция MDO3SA)",
      },
      {
        label: "Опции",
        value: "генератор AFG, логический анализатор, декодирование шин",
      },
    ],
    features: [
      "Осциллограф + анализатор спектра в одном корпусе",
      "Расширение функций программными ключами",
      "Доступная цена входа в линейку",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mdo3014.pdf",
      },
    ],
    description:
      "Осциллограф серии MDO3000 со встроенным анализатором спектра: позволяет одновременно смотреть сигнал во временной и частотной области. Входит в линейку «6 приборов в одном».",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mdo3014/tektronix-mdo3014-1.jpg",
      "/images/products/tektronix-mdo3014/tektronix-mdo3014-2.jpg",
      "/images/products/tektronix-mdo3014/tektronix-mdo3014-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mdo3024",
    slug: "tektronix-mdo3024",
    title: "Осциллограф смешанных областей Tektronix MDO3024, 200 МГц",
    manufacturer: "tektronix",
    model: "MDO3024",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "200 МГц",
      },
      {
        label: "Аналоговые каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "2,5 Гвыб/с",
      },
      {
        label: "Длина записи",
        value: "10 млн точек",
      },
      {
        label: "Анализатор спектра",
        value: "встроенный, расширение до 3 ГГц (опция MDO3SA)",
      },
      {
        label: "Опции",
        value: "генератор AFG, логический анализатор, декодирование шин",
      },
    ],
    features: [
      "Осциллограф + анализатор спектра в одном корпусе",
      "Расширение функций программными ключами",
      "Компактный и лёгкий",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mdo3024.pdf",
      },
    ],
    description:
      "Осциллограф серии MDO3000 со встроенным анализатором спектра. Полоса 200 МГц подходит для большинства задач отладки микроконтроллерных и силовых схем.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mdo3024/tektronix-mdo3024-1.jpg",
      "/images/products/tektronix-mdo3024/tektronix-mdo3024-2.jpg",
      "/images/products/tektronix-mdo3024/tektronix-mdo3024-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mdo3034",
    slug: "tektronix-mdo3034",
    title: "Осциллограф смешанных областей Tektronix MDO3034, 350 МГц",
    manufacturer: "tektronix",
    model: "MDO3034",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "350 МГц",
      },
      {
        label: "Аналоговые каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "2,5 Гвыб/с",
      },
      {
        label: "Длина записи",
        value: "10 млн точек",
      },
      {
        label: "Анализатор спектра",
        value: "встроенный, расширение до 3 ГГц (опция MDO3SA)",
      },
      {
        label: "Опции",
        value: "генератор AFG, логический анализатор, декодирование шин",
      },
    ],
    features: [
      "Осциллограф + анализатор спектра в одном корпусе",
      "Расширение функций программными ключами",
      "Анализ ЭМС-помех на стадии разработки",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mdo3034.pdf",
      },
    ],
    description:
      "Осциллограф серии MDO3000 с полосой 350 МГц и встроенным анализатором спектра. Удобен для разработки устройств с беспроводными интерфейсами и цифровыми шинами.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mdo3034/tektronix-mdo3034-1.jpg",
      "/images/products/tektronix-mdo3034/tektronix-mdo3034-2.jpg",
      "/images/products/tektronix-mdo3034/tektronix-mdo3034-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mdo3104",
    slug: "tektronix-mdo3104",
    title: "Осциллограф смешанных областей Tektronix MDO3104, 1 ГГц",
    manufacturer: "tektronix",
    model: "MDO3104",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "1 ГГц",
      },
      {
        label: "Аналоговые каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "5 Гвыб/с (1–2 канала) / 2,5 Гвыб/с (4 канала)",
      },
      {
        label: "Длина записи",
        value: "10 млн точек",
      },
      {
        label: "Анализатор спектра",
        value: "встроенный, расширение до 3 ГГц (опция MDO3SA)",
      },
      {
        label: "Опции",
        value: "генератор AFG, логический анализатор, декодирование шин",
      },
    ],
    features: [
      "Максимальная полоса в серии MDO3000",
      "Осциллограф + анализатор спектра",
      "Расширение функций программными ключами",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mdo3104.pdf",
      },
    ],
    description:
      "Старшая модель серии MDO3000: полоса 1 ГГц и встроенный анализатор спектра. Для высокоскоростных цифровых схем и ВЧ-отладки.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mdo3104/tektronix-mdo3104-1.jpg",
      "/images/products/tektronix-mdo3104/tektronix-mdo3104-2.jpg",
      "/images/products/tektronix-mdo3104/tektronix-mdo3104-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mdo32-3-bw-1000",
    slug: "tektronix-mdo32-3-bw-1000",
    title: "Осциллограф смешанных областей Tektronix MDO32, 1 ГГц, 2 канала",
    manufacturer: "tektronix",
    model: "MDO32 3-BW-1000",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "1 ГГц",
      },
      {
        label: "Аналоговые каналы",
        value: "2",
      },
      {
        label: "Частота дискретизации",
        value: "5 Гвыб/с",
      },
      {
        label: "Длина записи",
        value: "10 млн точек",
      },
      {
        label: "Анализатор спектра",
        value: "встроенный",
      },
      {
        label: "Дисплей",
        value: '11,6", HD, сенсорный',
      },
    ],
    features: [
      "Встроенный анализатор спектра",
      "Сенсорный интерфейс",
      "Расширение полосы программно",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mdo32-3-bw-1000.pdf",
      },
    ],
    description:
      "Осциллограф 3-й серии MDO с двумя аналоговыми каналами и встроенным анализатором спектра. Сенсорный HD-экран и современный интерфейс.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mdo32-3-bw-1000/tektronix-mdo32-3-bw-1000-1.jpg",
      "/images/products/tektronix-mdo32-3-bw-1000/tektronix-mdo32-3-bw-1000-2.jpg",
      "/images/products/tektronix-mdo32-3-bw-1000/tektronix-mdo32-3-bw-1000-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mdo34e-3-bw-200",
    slug: "tektronix-mdo34e-3-bw-200",
    title: "Осциллограф смешанных областей Tektronix MDO34, 200 МГц, 4 канала",
    manufacturer: "tektronix",
    model: "MDO34E 3-BW-200",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "200 МГц",
      },
      {
        label: "Аналоговые каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "2,5 Гвыб/с",
      },
      {
        label: "Длина записи",
        value: "10 млн точек",
      },
      {
        label: "Анализатор спектра",
        value: "встроенный, до 1 ГГц",
      },
      {
        label: "Дисплей",
        value: '11,6", HD, сенсорный',
      },
    ],
    features: [
      "Временная и частотная область на одном экране",
      "Сенсорный HD-экран",
      "Расширение функций программными ключами",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mdo34e-3-bw-200.pdf",
      },
    ],
    description:
      "Четырёхканальный осциллограф 3-й серии MDO со встроенным анализатором спектра до 1 ГГц. Универсальный прибор для лабораторий и учебных классов.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mdo34e-3-bw-200/tektronix-mdo34e-3-bw-200-1.jpg",
      "/images/products/tektronix-mdo34e-3-bw-200/tektronix-mdo34e-3-bw-200-2.jpg",
      "/images/products/tektronix-mdo34e-3-bw-200/tektronix-mdo34e-3-bw-200-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mso44b-4-bw-500-t3",
    slug: "tektronix-mso44b-4-bw-500-t3",
    title: "Осциллограф смешанных сигналов Tektronix MSO44B, 500 МГц, 4 канала + сервис T3",
    manufacturer: "tektronix",
    model: "MSO44B 4-BW-500+T3",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "500 МГц",
      },
      {
        label: "Входы",
        value: "4 FlexChannel",
      },
      {
        label: "Частота дискретизации",
        value: "6,25 Гвыб/с",
      },
      {
        label: "Разрешение АЦП",
        value: "12 бит",
      },
      {
        label: "Дисплей",
        value: '13,3", 1920×1080, сенсорный',
      },
      {
        label: "Сервис",
        value: "T3 — 3 года Total Product Protection",
      },
    ],
    features: [
      "12-битный АЦП",
      "3 года защиты прибора включены",
      "Логические каналы на любом входе",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mso44b-4-bw-500-t3.pdf",
      },
    ],
    description:
      "Осциллограф 4-й серии B с 12-битным АЦП и входами FlexChannel. В комплекте пакет T3 — 3 года полной защиты прибора (Total Product Protection).",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mso44b-4-bw-500-t3/tektronix-mso44b-4-bw-500-t3-1.jpg",
      "/images/products/tektronix-mso44b-4-bw-500-t3/tektronix-mso44b-4-bw-500-t3-2.jpg",
      "/images/products/tektronix-mso44b-4-bw-500-t3/tektronix-mso44b-4-bw-500-t3-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mso64b-6-bw-1000",
    slug: "tektronix-mso64b-6-bw-1000",
    title: "Осциллограф смешанных сигналов Tektronix MSO64B, 1 ГГц, 4 канала",
    manufacturer: "tektronix",
    model: "MSO64B 6-BW-1000",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "1 ГГц (с возможностью расширения)",
      },
      {
        label: "Входы",
        value: "4 FlexChannel",
      },
      {
        label: "Частота дискретизации",
        value: "50 Гвыб/с (2 канала) / 25 Гвыб/с (4 канала)",
      },
      {
        label: "Разрешение АЦП",
        value: "12 бит",
      },
      {
        label: "Длина записи",
        value: "62,5 млн точек",
      },
      {
        label: "Дисплей",
        value: '15,6", 1920×1080, сенсорный',
      },
    ],
    features: [
      "Высокая частота дискретизации",
      "Низкий собственный шум",
      "Расширение полосы программным ключом",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mso64b-6-bw-1000.pdf",
      },
    ],
    description:
      "Осциллограф 6-й серии B с 12-битным АЦП и низким уровнем шума. Полоса пропускания расширяется программно — возможно увеличение полосы после покупки.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mso64b-6-bw-1000/tektronix-mso64b-6-bw-1000-1.jpg",
      "/images/products/tektronix-mso64b-6-bw-1000/tektronix-mso64b-6-bw-1000-2.jpg",
      "/images/products/tektronix-mso64b-6-bw-1000/tektronix-mso64b-6-bw-1000-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mso66b-6-bw-1000",
    slug: "tektronix-mso66b-6-bw-1000",
    title: "Осциллограф смешанных сигналов Tektronix MSO66B, 1 ГГц, 6 каналов",
    manufacturer: "tektronix",
    model: "MSO66B 6-BW-1000",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "1 ГГц (с возможностью расширения)",
      },
      {
        label: "Входы",
        value: "6 FlexChannel",
      },
      {
        label: "Частота дискретизации",
        value: "50 Гвыб/с (2 к.) / 25 Гвыб/с (4 к.) / 12,5 Гвыб/с (>4 к.)",
      },
      {
        label: "Разрешение АЦП",
        value: "12 бит",
      },
      {
        label: "Длина записи",
        value: "62,5 млн точек",
      },
      {
        label: "Дисплей",
        value: '15,6", 1920×1080, сенсорный',
      },
    ],
    features: [
      "6 аналоговых каналов",
      "12-битный АЦП и низкий шум",
      "Расширение полосы программным ключом",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mso66b-6-bw-1000.pdf",
      },
    ],
    description:
      "Шестиканальный осциллограф 6-й серии B: больше каналов для многофазных систем и параллельных шин. Возможно увеличение полосы пропускания.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mso66b-6-bw-1000/tektronix-mso66b-6-bw-1000-1.jpg",
      "/images/products/tektronix-mso66b-6-bw-1000/tektronix-mso66b-6-bw-1000-2.jpg",
      "/images/products/tektronix-mso66b-6-bw-1000/tektronix-mso66b-6-bw-1000-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-exr258a",
    slug: "keysight-exr258a",
    title: "Осциллограф Keysight Infiniium EXR258A, 2,5 ГГц, 8 каналов",
    manufacturer: "keysight",
    model: "EXR258A",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "2,5 ГГц",
      },
      {
        label: "Каналы",
        value: "8",
      },
      {
        label: "Частота дискретизации",
        value: "16 Гвыб/с",
      },
      {
        label: "Расширение полосы",
        value: "до 4 ГГц (опция EXR2BW)",
      },
    ],
    features: [
      "8 каналов с высокой полосой",
      "Расширение полосы программно",
      "Встроенные функции анализа",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-exr258a.pdf",
      },
    ],
    description:
      "Восьмиканальный осциллограф реального времени серии Infiniium EXR. Полоса расширяется до 4 ГГц опцией EXR2BW.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-exr258a/keysight-exr258a-1.jpg",
      "/images/products/keysight-exr258a/keysight-exr258a-2.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-dsos254a",
    slug: "keysight-dsos254a",
    title: "Осциллограф Keysight Infiniium DSOS254A, 2,5 ГГц, 4 канала",
    manufacturer: "keysight",
    model: "DSOS254A",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "2,5 ГГц",
      },
      {
        label: "Каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "20 Гвыб/с",
      },
      {
        label: "Разрешение АЦП",
        value: "10 бит",
      },
    ],
    features: ["10-битный АЦП", "Низкий собственный шум", "Анализ джиттера и протоколов (опции)"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-dsos254a.pdf",
      },
    ],
    description:
      "Осциллограф Infiniium S-серии с 10-битным АЦП и низким шумом для высокоскоростных цифровых интерфейсов.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-dsos254a/keysight-dsos254a-1.jpg",
      "/images/products/keysight-dsos254a/keysight-dsos254a-2.jpg",
      "/images/products/keysight-dsos254a/keysight-dsos254a-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-dsox3104g",
    slug: "keysight-dsox3104g",
    title: "Осциллограф Keysight InfiniiVision DSOX3104G, 1 ГГц",
    manufacturer: "keysight",
    model: "DSOX3104G",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "1 ГГц",
      },
      {
        label: "Каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "5 Гвыб/с",
      },
      {
        label: "Встроенный генератор",
        value: "WaveGen 20 МГц",
      },
    ],
    features: ["Генератор встроен", "Сенсорный экран", "Высокая скорость захвата осциллограмм"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-dsox3104g.pdf",
      },
    ],
    description:
      "Осциллограф серии 3000G X со встроенным генератором WaveGen и сенсорным экраном. Высокая скорость обновления осциллограмм.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-dsox3104g/keysight-dsox3104g-1.jpg",
      "/images/products/keysight-dsox3104g/keysight-dsox3104g-2.jpg",
      "/images/products/keysight-dsox3104g/keysight-dsox3104g-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-dsox4104g",
    slug: "keysight-dsox4104g",
    title: "Осциллограф Keysight InfiniiVision DSOX4104G, 1 ГГц",
    manufacturer: "keysight",
    model: "DSOX4104G",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "1 ГГц",
      },
      {
        label: "Каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "5 Гвыб/с",
      },
      {
        label: "Встроенный генератор",
        value: "WaveGen 20 МГц",
      },
    ],
    features: ["Большой сенсорный экран", "Генератор встроен", "Зональный запуск касанием"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-dsox4104g.pdf",
      },
    ],
    description:
      "Осциллограф серии 4000G X с большим сенсорным экраном и встроенным генератором WaveGen.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-dsox4104g/keysight-dsox4104g-1.jpg",
      "/images/products/keysight-dsox4104g/keysight-dsox4104g-2.jpg",
      "/images/products/keysight-dsox4104g/keysight-dsox4104g-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-dsox4154g",
    slug: "keysight-dsox4154g",
    title: "Осциллограф Keysight InfiniiVision DSOX4154G, 1,5 ГГц",
    manufacturer: "keysight",
    model: "DSOX4154G",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "1,5 ГГц",
      },
      {
        label: "Каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "5 Гвыб/с",
      },
      {
        label: "Встроенный генератор",
        value: "WaveGen 20 МГц",
      },
    ],
    features: [
      "Максимальная полоса в серии 4000G X",
      "Генератор встроен",
      "Большой сенсорный экран",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-dsox4154g.pdf",
      },
    ],
    description:
      "Старшая модель серии 4000G X: полоса 1,5 ГГц, сенсорный экран и встроенный генератор WaveGen.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-dsox4154g/keysight-dsox4154g-1.jpg",
      "/images/products/keysight-dsox4154g/keysight-dsox4154g-2.jpg",
      "/images/products/keysight-dsox4154g/keysight-dsox4154g-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-exr058a",
    slug: "keysight-exr058a",
    title: "Осциллограф Keysight Infiniium EXR058A, 500 МГц, 8 каналов",
    manufacturer: "keysight",
    model: "EXR058A",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "500 МГц",
      },
      {
        label: "Каналы",
        value: "8",
      },
      {
        label: "Частота дискретизации",
        value: "16 Гвыб/с",
      },
    ],
    features: [
      "8 каналов в одном приборе",
      "Расширение полосы программно",
      "Встроенные функции анализа",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-exr058a.pdf",
      },
    ],
    description:
      "Восьмиканальный осциллограф реального времени серии Infiniium EXR с полосой 500 МГц для многоканальных задач.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-exr058a/keysight-exr058a-1.jpg",
      "/images/products/keysight-exr058a/keysight-exr058a-2.jpg",
      "/images/products/keysight-exr058a/keysight-exr058a-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "yokogawa-dlm3024",
    slug: "yokogawa-dlm3024",
    title: "Осциллограф смешанных сигналов Yokogawa DLM3024, 200 МГц",
    manufacturer: "yokogawa",
    model: "DLM3024",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "200 МГц",
      },
      {
        label: "Аналоговые каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "2,5 Гвыб/с",
      },
      {
        label: "Длина записи",
        value: "12,5 млн точек",
      },
    ],
    features: ["Компактный корпус", "Сенсорный экран", "Логические каналы"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/yokogawa-dlm3024.pdf",
      },
    ],
    description: "Компактный осциллограф смешанных сигналов с сенсорным экраном и длинной памятью.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/yokogawa-dlm3024/yokogawa-dlm3024-1.jpg",
      "/images/products/yokogawa-dlm3024/yokogawa-dlm3024-2.jpg",
      "/images/products/yokogawa-dlm3024/yokogawa-dlm3024-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "rohde-schwarz-rtb2004-200m",
    slug: "rohde-schwarz-rtb2004-200m",
    title: "Осциллограф Rohde & Schwarz RTB2004, 200 МГц",
    manufacturer: "rohde-schwarz",
    model: "RTB2004-200M",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "200 МГц",
      },
      {
        label: "Каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "2,5 Гвыб/с",
      },
      {
        label: "Разрешение АЦП",
        value: "10 бит",
      },
    ],
    features: ["10-битный АЦП", "Сенсорный экран", "Интуитивное управление"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/rohde-schwarz-rtb2004-200m.pdf",
      },
    ],
    description:
      "Осциллограф с 10-битным АЦП и сенсорным экраном для лабораторий и учебных классов.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/rohde-schwarz-rtb2004-200m/rohde-schwarz-rtb2004-200m-1.jpg",
      "/images/products/rohde-schwarz-rtb2004-200m/rohde-schwarz-rtb2004-200m-2.jpg",
      "/images/products/rohde-schwarz-rtb2004-200m/rohde-schwarz-rtb2004-200m-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "rohde-schwarz-rtm3004-1g",
    slug: "rohde-schwarz-rtm3004-1g",
    title: "Осциллограф Rohde & Schwarz RTM3004, 1 ГГц",
    manufacturer: "rohde-schwarz",
    model: "RTM3004-1G",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "1 ГГц",
      },
      {
        label: "Каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "5 Гвыб/с",
      },
      {
        label: "Разрешение АЦП",
        value: "10 бит",
      },
    ],
    features: [
      "10-битный АЦП",
      "Сенсорный экран",
      "Логический анализатор и декодирование шин (опции)",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/rohde-schwarz-rtm3004-1g.pdf",
      },
    ],
    description:
      "Осциллограф с полосой 1 ГГц и 10-битным АЦП для отладки встраиваемых систем и силовой электроники.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/rohde-schwarz-rtm3004-1g/rohde-schwarz-rtm3004-1g-1.jpg",
      "/images/products/rohde-schwarz-rtm3004-1g/rohde-schwarz-rtm3004-1g-2.jpg",
      "/images/products/rohde-schwarz-rtm3004-1g/rohde-schwarz-rtm3004-1g-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "uni-t-mso6204hdp",
    slug: "uni-t-mso6204hdp",
    title: "Осциллограф высокого разрешения UNI-T MSO6204HDP, 2 ГГц",
    manufacturer: "uni-t",
    model: "MSO6204HDP",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "2 ГГц",
      },
      {
        label: "Каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "10 Гвыб/с",
      },
      {
        label: "Разрешение АЦП",
        value: "12 бит",
      },
    ],
    features: ["12 бит при полосе 2 ГГц", "Доступная цена"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/uni-t-mso6204hdp.pdf",
      },
    ],
    description: "Четырёхканальный осциллограф с 12-битным АЦП и полосой 2 ГГц.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/uni-t-mso6204hdp/uni-t-mso6204hdp-1.jpg",
      "/images/products/uni-t-mso6204hdp/uni-t-mso6204hdp-2.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "uni-t-mso5104hd",
    slug: "uni-t-mso5104hd",
    title: "Осциллограф высокого разрешения UNI-T MSO5104HD, 1 ГГц",
    manufacturer: "uni-t",
    model: "MSO5104HD",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "1 ГГц",
      },
      {
        label: "Аналоговые каналы",
        value: "4",
      },
      {
        label: "Разрешение АЦП",
        value: "12 бит",
      },
      {
        label: "Логические каналы",
        value: "16",
      },
    ],
    features: ["12-битный АЦП", "Встроенный логический анализатор"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/uni-t-mso5104hd.pdf",
      },
    ],
    description:
      "Четырёхканальный осциллограф смешанных сигналов с 12-битным АЦП и 16 логическими каналами.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/uni-t-mso5104hd/uni-t-mso5104hd-1.jpg",
      "/images/products/uni-t-mso5104hd/uni-t-mso5104hd-2.jpg",
      "/images/products/uni-t-mso5104hd/uni-t-mso5104hd-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "uni-t-mso7204x",
    slug: "uni-t-mso7204x",
    title: "Осциллограф UNI-T MSO7204X, 2 ГГц",
    manufacturer: "uni-t",
    model: "MSO7204X",
    category: "oscilloscopes",
    specs: [
      {
        label: "Полоса пропускания",
        value: "2 ГГц",
      },
      {
        label: "Каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "10 Гвыб/с",
      },
      {
        label: "Длина записи",
        value: "1 млрд точек",
      },
    ],
    features: ["Память 1 Гточка", "Полоса 2 ГГц"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/uni-t-mso7204x.pdf",
      },
    ],
    description: "Четырёхканальный осциллограф с полосой 2 ГГц и сверхдлинной памятью 1 Гточка.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/uni-t-mso7204x/uni-t-mso7204x-1.jpg",
      "/images/products/uni-t-mso7204x/uni-t-mso7204x-2.jpg",
      "/images/products/uni-t-mso7204x/uni-t-mso7204x-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-n9000b",
    slug: "keysight-n9000b",
    title: "Анализатор сигналов Keysight N9000B CXA, 26,5 ГГц",
    manufacturer: "keysight",
    model: "N9000B",
    category: "spectrum-analyzers",
    specs: [
      {
        label: "Частотный диапазон",
        value: "до 26,5 ГГц (опция 526)",
      },
      {
        label: "Предусилитель",
        value: "P26",
      },
      {
        label: "Аттенюатор",
        value: "с мелким шагом (FSA)",
      },
      {
        label: "Опорная частота",
        value: "прецизионная (PFR)",
      },
    ],
    features: [
      "Готовая комплектация «best-value»",
      "Совместимость с приложениями серии X",
      "Предусилитель для слабых сигналов",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-n9000b.pdf",
      },
    ],
    description:
      "Анализатор сигналов серии X (CXA) в выгодной комплектации до 26,5 ГГц с предусилителем и прецизионной опорной частотой.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-n9000b/keysight-n9000b-1.jpg",
      "/images/products/keysight-n9000b/keysight-n9000b-2.jpg",
      "/images/products/keysight-n9000b/keysight-n9000b-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "rohde-schwarz-fsv3044",
    slug: "rohde-schwarz-fsv3044",
    title: "Анализатор сигналов и спектра Rohde & Schwarz FSV3044, 44 ГГц",
    manufacturer: "rohde-schwarz",
    model: "FSV3044",
    category: "spectrum-analyzers",
    specs: [
      {
        label: "Частотный диапазон",
        value: "10 Гц – 44 ГГц",
      },
      {
        label: "Тип",
        value: "анализатор сигналов и спектра",
      },
    ],
    features: [
      "Широкий диапазон до 44 ГГц",
      "Быстрая настройка измерений",
      "Анализ модулированных сигналов (опции)",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/rohde-schwarz-fsv3044.pdf",
      },
    ],
    description:
      "Анализатор сигналов и спектра серии FSV3000 для разработки и производства ВЧ- и СВЧ-устройств.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/rohde-schwarz-fsv3044/rohde-schwarz-fsv3044-1.jpg",
      "/images/products/rohde-schwarz-fsv3044/rohde-schwarz-fsv3044-2.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "uni-t-uts3084b",
    slug: "uni-t-uts3084b",
    title: "Анализатор спектра UNI-T UTS3084B, 8,4 ГГц",
    manufacturer: "uni-t",
    model: "UTS3084B",
    category: "spectrum-analyzers",
    specs: [
      {
        label: "Частотный диапазон",
        value: "9 кГц – 8,4 ГГц",
      },
      {
        label: "Полоса RBW",
        value: "1 Гц – 3 МГц",
      },
      {
        label: "Фазовый шум (SSB)",
        value: "−98 дБн/Гц",
      },
    ],
    features: ["Широкий диапазон до 8,4 ГГц", "Доступная цена"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/uni-t-uts3084b.pdf",
      },
    ],
    description: "Анализатор спектра для лабораторий, сервиса и производства.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/uni-t-uts3084b/uni-t-uts3084b-1.jpg",
      "/images/products/uni-t-uts3084b/uni-t-uts3084b-2.jpg",
      "/images/products/uni-t-uts3084b/uni-t-uts3084b-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-p9377b",
    slug: "keysight-p9377b",
    title: "Векторный анализатор цепей Keysight P9377B, 44 ГГц",
    manufacturer: "keysight",
    model: "P9377B",
    category: "network-analyzers",
    specs: [
      {
        label: "Частотный диапазон",
        value: "100 кГц – 44 ГГц",
      },
      {
        label: "Порты",
        value: "2",
      },
      {
        label: "Интерфейс",
        value: "Thunderbolt 3",
      },
      {
        label: "Управление",
        value: "с ПК, ПО Keysight Network Analyzer",
      },
    ],
    features: [
      "Компактный форм-фактор",
      "Измерения до 44 ГГц",
      "Тот же софт, что у настольных VNA Keysight",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-p9377b.pdf",
      },
    ],
    description:
      "Компактный 2-портовый векторный анализатор цепей с подключением к ПК. Высокочастотные измерения S-параметров без громоздкого стенда.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-p9377b/keysight-p9377b-1.jpg",
      "/images/products/keysight-p9377b/keysight-p9377b-2.jpg",
      "/images/products/keysight-p9377b/keysight-p9377b-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-p5027a-400",
    slug: "keysight-p5027a-400",
    title: "Векторный анализатор цепей Keysight P5027A, 4 порта, 44 ГГц",
    manufacturer: "keysight",
    model: "P5027A-400",
    category: "network-analyzers",
    specs: [
      {
        label: "Частотный диапазон",
        value: "100 кГц – 44 ГГц",
      },
      {
        label: "Порты",
        value: "4 (опция 400)",
      },
      {
        label: "Управление",
        value: "с ПК",
      },
    ],
    features: ["4 порта до 44 ГГц в компактном корпусе", "Измерение дифференциальных S-параметров"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-p5027a-400.pdf",
      },
    ],
    description:
      "4-портовый USB-анализатор цепей Streamline с диапазоном до 44 ГГц. Измерения многопортовых устройств и дифференциальных линий.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-p5027a-400/keysight-p5027a-400-1.jpg",
      "/images/products/keysight-p5027a-400/keysight-p5027a-400-2.jpg",
      "/images/products/keysight-p5027a-400/keysight-p5027a-400-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "ceyear-3674p-047-049",
    slug: "ceyear-3674p-047-049",
    title: "Векторный анализатор цепей Ceyear 3674P, 110 ГГц",
    manufacturer: "ceyear",
    model: "3674P+047+049",
    category: "network-analyzers",
    specs: [
      {
        label: "Частотный диапазон",
        value: "10 МГц – 110 ГГц",
      },
      {
        label: "Порты",
        value: "2",
      },
      {
        label: "Соединители",
        value: "1,0 мм",
      },
      {
        label: "Комплектация",
        value: "коаксиальный кабель 1 мм + калибровочный набор 1 мм (опции 047, 049)",
      },
    ],
    features: ["Измерения в миллиметровом диапазоне", "Готовый комплект с калибровкой"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/ceyear-3674p-047-049.pdf",
      },
    ],
    description:
      "2-портовый векторный анализатор цепей до 110 ГГц с коаксиальными соединителями 1,0 мм. В комплекте кабель 1 мм и калибровочный набор.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/ceyear-3674p-047-049/ceyear-3674p-047-049-1.jpg",
      "/images/products/ceyear-3674p-047-049/ceyear-3674p-047-049-2.jpg",
      "/images/products/ceyear-3674p-047-049/ceyear-3674p-047-049-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "uni-t-vna4092",
    slug: "uni-t-vna4092",
    title: "Векторный анализатор цепей UNI-T VNA4092, 9 ГГц",
    manufacturer: "uni-t",
    model: "VNA4092",
    category: "network-analyzers",
    specs: [
      {
        label: "Частотный диапазон",
        value: "100 кГц – 9 ГГц",
      },
      {
        label: "Порты",
        value: "2",
      },
      {
        label: "Разрешение по частоте",
        value: "1 Гц",
      },
    ],
    features: ["Доступный VNA до 9 ГГц", "Для разработки и производства"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/uni-t-vna4092.pdf",
      },
    ],
    description:
      "2-портовый векторный анализатор цепей для измерения S-параметров антенн, фильтров и ВЧ-трактов.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/uni-t-vna4092/uni-t-vna4092-1.jpg",
      "/images/products/uni-t-vna4092/uni-t-vna4092-2.jpg",
      "/images/products/uni-t-vna4092/uni-t-vna4092-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-afg31021",
    slug: "tektronix-afg31021",
    title: "Генератор сигналов произвольной формы Tektronix AFG31021, 25 МГц",
    manufacturer: "tektronix",
    model: "AFG31021",
    category: "signal-generators",
    specs: [
      {
        label: "Каналы",
        value: "1",
      },
      {
        label: "Частота синуса",
        value: "до 25 МГц",
      },
      {
        label: "Частота дискретизации",
        value: "250 Мвыб/с",
      },
      {
        label: "Разрешение",
        value: "14 бит",
      },
      {
        label: "Память произвольной формы",
        value: "16 млн точек",
      },
      {
        label: "Дисплей",
        value: 'сенсорный, 9"',
      },
    ],
    features: [
      "Простое управление с сенсорного экрана",
      "InstaView — контроль сигнала на нагрузке",
      "Длинная память для сложных сигналов",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-afg31021.pdf",
      },
    ],
    description:
      "Одноканальный генератор серии AFG31000 с сенсорным экраном. Функция InstaView показывает реальный сигнал на нагрузке.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-afg31021/tektronix-afg31021-1.jpg",
      "/images/products/tektronix-afg31021/tektronix-afg31021-2.jpg",
      "/images/products/tektronix-afg31021/tektronix-afg31021-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-ap5001a",
    slug: "keysight-ap5001a",
    title: "ВЧ-генератор аналоговых сигналов Keysight AP5001A, 6 ГГц",
    manufacturer: "keysight",
    model: "AP5001A",
    category: "signal-generators",
    specs: [
      {
        label: "Тип",
        value: "аналоговый ВЧ-генератор",
      },
      {
        label: "Верхняя частота",
        value: "6 ГГц",
      },
    ],
    features: ["Чистый сигнал для настройки ВЧ-трактов", "Удобен для производства и лабораторий"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-ap5001a.pdf",
      },
    ],
    description:
      "Аналоговый генератор ВЧ-сигналов до 6 ГГц для настройки и испытаний приёмников, усилителей и радиомодулей.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-ap5001a/keysight-ap5001a-1.jpg",
      "/images/products/keysight-ap5001a/keysight-ap5001a-2.jpg",
      "/images/products/keysight-ap5001a/keysight-ap5001a-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "ceyear-1466g-v",
    slug: "ceyear-1466g-v",
    title: "Векторный генератор сигналов Ceyear 1466G-V, 45 ГГц",
    manufacturer: "ceyear",
    model: "1466G-V",
    category: "signal-generators",
    specs: [
      {
        label: "Частотный диапазон",
        value: "6 кГц – 45 ГГц",
      },
      {
        label: "Тип",
        value: "векторный генератор сигналов",
      },
    ],
    features: ["Широкий диапазон частот", "Векторная модуляция"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/ceyear-1466g-v.pdf",
      },
    ],
    description:
      "Векторный генератор сигналов до 45 ГГц для испытаний СВЧ-приёмников и систем связи. Срок поставки 2–3 недели.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/ceyear-1466g-v/ceyear-1466g-v-1.jpg",
      "/images/products/ceyear-1466g-v/ceyear-1466g-v-2.jpg",
      "/images/products/ceyear-1466g-v/ceyear-1466g-v-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "uni-t-utg9504t",
    slug: "uni-t-utg9504t",
    title: "Генератор сигналов произвольной формы UNI-T UTG9504T+, 500 МГц",
    manufacturer: "uni-t",
    model: "UTG9504T+",
    category: "signal-generators",
    specs: [
      {
        label: "Частота",
        value: "до 500 МГц",
      },
      {
        label: "Каналы",
        value: "4",
      },
      {
        label: "Частота дискретизации",
        value: "2,5 Гвыб/с",
      },
      {
        label: "Разрешение",
        value: "16 бит",
      },
    ],
    features: ["4 канала в одном приборе", "16-битное разрешение"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/uni-t-utg9504t.pdf",
      },
    ],
    description: "Четырёхканальный генератор функций и сигналов произвольной формы.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/uni-t-utg9504t/uni-t-utg9504t-1.jpg",
      "/images/products/uni-t-utg9504t/uni-t-utg9504t-2.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "uni-t-usg3045m-p",
    slug: "uni-t-usg3045m-p",
    title: "Генератор ВЧ-сигналов UNI-T USG3045M-P, 4,5 ГГц",
    manufacturer: "uni-t",
    model: "USG3045M-P",
    category: "signal-generators",
    specs: [
      {
        label: "Частотный диапазон",
        value: "9 кГц – 4,5 ГГц",
      },
      {
        label: "Фазовый шум (SSB)",
        value: "−122 дБн/Гц",
      },
      {
        label: "Аттенюатор",
        value: "встроенный механический",
      },
    ],
    features: ["Низкий фазовый шум", "Механический аттенюатор"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/uni-t-usg3045m-p.pdf",
      },
    ],
    description:
      "Генератор сигналов с низким фазовым шумом и встроенным механическим аттенюатором.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/uni-t-usg3045m-p/uni-t-usg3045m-p-1.jpg",
      "/images/products/uni-t-usg3045m-p/uni-t-usg3045m-p-2.jpg",
      "/images/products/uni-t-usg3045m-p/uni-t-usg3045m-p-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "rohde-schwarz-esr3",
    slug: "rohde-schwarz-esr3",
    title: "Измерительный приёмник ЭМП Rohde & Schwarz ESR3, 3,6 ГГц",
    manufacturer: "rohde-schwarz",
    model: "ESR3",
    category: "emc",
    specs: [
      {
        label: "Частотный диапазон",
        value: "9 кГц – 3,6 ГГц",
      },
      {
        label: "Назначение",
        value: "измерения ЭМП, испытания на ЭМС",
      },
    ],
    features: [
      "Быстрое сканирование во временной области",
      "Для сертификационных испытаний",
      "Совмещает функции анализатора спектра",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/rohde-schwarz-esr3.pdf",
      },
    ],
    description:
      "Измерительный приёмник электромагнитных помех для сертификационных и предварительных испытаний ЭМС.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/rohde-schwarz-esr3/rohde-schwarz-esr3-1.jpg",
      "/images/products/rohde-schwarz-esr3/rohde-schwarz-esr3-2.jpg",
      "/images/products/rohde-schwarz-esr3/rohde-schwarz-esr3-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "rohde-schwarz-esrp7",
    slug: "rohde-schwarz-esrp7",
    title: "Измерительный приёмник ЭМП Rohde & Schwarz ESRP7, 7 ГГц",
    manufacturer: "rohde-schwarz",
    model: "ESRP7",
    category: "emc",
    specs: [
      {
        label: "Частотный диапазон",
        value: "9 кГц – 7 ГГц",
      },
      {
        label: "Назначение",
        value: "предварительные испытания ЭМС",
      },
    ],
    features: [
      "Поиск проблем ЭМС до сертификации",
      "Сканирование во временной области",
      "Функция анализатора спектра",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/rohde-schwarz-esrp7.pdf",
      },
    ],
    description:
      "Приёмник электромагнитных помех для предварительных испытаний ЭМС на этапе разработки.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/rohde-schwarz-esrp7/rohde-schwarz-esrp7-1.jpg",
      "/images/products/rohde-schwarz-esrp7/rohde-schwarz-esrp7-2.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "yokogawa-wt310e",
    slug: "yokogawa-wt310e",
    title: "Цифровой измеритель мощности Yokogawa WT310E, однофазный",
    manufacturer: "yokogawa",
    model: "WT310E",
    category: "power-analyzers",
    specs: [
      {
        label: "Фазы",
        value: "1",
      },
      {
        label: "Напряжение",
        value: "15 – 600 В",
      },
      {
        label: "Ток",
        value: "5 мА – 20 А",
      },
      {
        label: "Частотный диапазон",
        value: "DC и 0,1 Гц – 100 кГц",
      },
    ],
    features: [
      "Измерение потребления в режиме ожидания",
      "Компактный корпус",
      "Конфигурация под задачу",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/yokogawa-wt310e.pdf",
      },
    ],
    description:
      "Однофазный цифровой ваттметр для измерения мощности и энергопотребления. Модули подбираются под задачу заказчика.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/yokogawa-wt310e/yokogawa-wt310e-1.jpg",
      "/images/products/yokogawa-wt310e/yokogawa-wt310e-2.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "yokogawa-wt1804r",
    slug: "yokogawa-wt1804r",
    title: "Прецизионный анализатор мощности Yokogawa WT1804R",
    manufacturer: "yokogawa",
    model: "WT1804R",
    category: "power-analyzers",
    specs: [
      {
        label: "Входные элементы",
        value: "4",
      },
      {
        label: "Напряжение",
        value: "1,5 – 1000 В",
      },
      {
        label: "Частотный диапазон",
        value: "DC и 0,1 Гц – 1 МГц",
      },
      {
        label: "Основная погрешность",
        value: "±(0,05% от изм. + 0,05% от диап.)",
      },
    ],
    features: ["Высокая точность", "Анализ гармоник и КПД", "Для инверторов и электроприводов"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/yokogawa-wt1804r.pdf",
      },
    ],
    description:
      "Четырёхэлементный прецизионный анализатор мощности для инверторов, электроприводов и систем преобразования энергии.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/yokogawa-wt1804r/yokogawa-wt1804r-1.jpg",
      "/images/products/yokogawa-wt1804r/yokogawa-wt1804r-2.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-6221-2182a-e",
    slug: "tektronix-6221-2182a-e",
    title: "Система Keithley 6221/2182A: источник тока + нановольтметр",
    manufacturer: "tektronix",
    model: "6221/2182A/E",
    category: "precision-meters",
    specs: [
      {
        label: "Источник тока 6221",
        value: "от 100 фА до 100 мА, AC/DC",
      },
      {
        label: "Нановольтметр 2182A",
        value: "разрешение 1 нВ",
      },
      {
        label: "Режимы",
        value: "Delta, импульсный Delta, дифференциальная проводимость",
      },
      {
        label: "Применение",
        value: "наноматериалы, сверхпроводники, низкоомные образцы",
      },
    ],
    features: [
      "Готовая система для измерений малых сопротивлений",
      "Подавление термоЭДС и шумов",
      "Совместная работа двух приборов через один интерфейс",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-6221-2182a-e.pdf",
      },
    ],
    description:
      "Комплект Keithley (Tektronix) из источника тока 6221 и нановольтметра 2182A. В режиме Delta обеспечивает измерения сверхмалых сопротивлений и напряжений с подавлением термоЭДС.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-6221-2182a-e/tektronix-6221-2182a-e-1.jpg",
      "/images/products/tektronix-6221-2182a-e/tektronix-6221-2182a-e-2.jpg",
      "/images/products/tektronix-6221-2182a-e/tektronix-6221-2182a-e-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-6514-e",
    slug: "tektronix-6514-e",
    title: "Электрометр программируемый Keithley 6514",
    manufacturer: "tektronix",
    model: "6514/E",
    category: "precision-meters",
    specs: [
      {
        label: "Разрядность",
        value: "5½",
      },
      {
        label: "Диапазоны тока",
        value: "20 пА – 20 мА",
      },
      {
        label: "Разрешение по току",
        value: "100 аА",
      },
      {
        label: "Входной ток смещения",
        value: "< 3 фА",
      },
      {
        label: "Функции",
        value: "ток, напряжение, сопротивление, заряд",
      },
    ],
    features: [
      "Ультранизкий входной ток",
      "Измерения на уровне аттоампер",
      "Интерфейсы для автоматизации",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-6514-e.pdf",
      },
    ],
    description:
      "5,5-разрядный электрометр Keithley для измерения сверхмалых токов, зарядов и высоких сопротивлений.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-6514-e/tektronix-6514-e-1.jpg",
      "/images/products/tektronix-6514-e/tektronix-6514-e-2.jpg",
      "/images/products/tektronix-6514-e/tektronix-6514-e-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-6517b-e",
    slug: "tektronix-6517b-e",
    title: "Электрометр / тераомметр Keithley 6517B",
    manufacturer: "tektronix",
    model: "6517B/E",
    category: "precision-meters",
    specs: [
      {
        label: "Разрядность",
        value: "5½",
      },
      {
        label: "Диапазон тока",
        value: "1 фА – 20 мА",
      },
      {
        label: "Встроенный источник",
        value: "±1000 В",
      },
      {
        label: "Сопротивление",
        value: "до 10¹⁶ Ом",
      },
      {
        label: "Функции",
        value: "ток, напряжение, сопротивление, заряд, удельное сопротивление",
      },
    ],
    features: [
      "Встроенный высоковольтный источник",
      "Измерение поверхностного и объёмного сопротивления",
      "Для испытаний изоляции",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-6517b-e.pdf",
      },
    ],
    description:
      "5,5-разрядный электрометр и измеритель высоких сопротивлений со встроенным источником напряжения ±1000 В. Для испытаний изоляционных материалов и компонентов.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-6517b-e/tektronix-6517b-e-1.jpg",
      "/images/products/tektronix-6517b-e/tektronix-6517b-e-2.jpg",
      "/images/products/tektronix-6517b-e/tektronix-6517b-e-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-b2910cl",
    slug: "keysight-b2910cl",
    title: "Прецизионный источник-измеритель Keysight B2910CL",
    manufacturer: "keysight",
    model: "B2910CL",
    category: "smu",
    specs: [
      {
        label: "Каналы",
        value: "1",
      },
      {
        label: "Разрешение по току",
        value: "10 фА",
      },
      {
        label: "Максимальное напряжение",
        value: "210 В",
      },
      {
        label: "Максимальный ток",
        value: "1,5 А",
      },
      {
        label: "Режимы",
        value: "источник/измеритель V и I, развёртка",
      },
    ],
    features: ["Четыре квадранта работы", "Высокое разрешение по току", "Графический интерфейс"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-b2910cl.pdf",
      },
    ],
    description:
      "Одноканальный SMU Keysight: источник и измеритель напряжения и тока в одном приборе. Для характеризации полупроводников, датчиков и материалов.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-b2910cl/keysight-b2910cl-1.jpg",
      "/images/products/keysight-b2910cl/keysight-b2910cl-2.jpg",
      "/images/products/keysight-b2910cl/keysight-b2910cl-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "rohde-schwarz-hmp4040",
    slug: "rohde-schwarz-hmp4040",
    title: "Программируемый источник питания Rohde & Schwarz HMP4040, 4 канала",
    manufacturer: "rohde-schwarz",
    model: "HMP4040",
    category: "power-supplies",
    specs: [
      {
        label: "Каналы",
        value: "4",
      },
      {
        label: "Напряжение на канал",
        value: "0 – 32 В",
      },
      {
        label: "Ток на канал",
        value: "0 – 10 А",
      },
      {
        label: "Суммарная мощность",
        value: "384 Вт",
      },
    ],
    features: [
      "4 гальванически развязанных канала",
      "Программирование последовательностей",
      "Удалённое управление",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/rohde-schwarz-hmp4040.pdf",
      },
    ],
    description:
      "Четырёхканальный программируемый источник постоянного тока для лабораторий и автоматизированных стендов.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/rohde-schwarz-hmp4040/rohde-schwarz-hmp4040-1.jpg",
      "/images/products/rohde-schwarz-hmp4040/rohde-schwarz-hmp4040-2.jpg",
      "/images/products/rohde-schwarz-hmp4040/rohde-schwarz-hmp4040-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "uni-t-ut8806",
    slug: "uni-t-ut8806",
    title: "Настольный цифровой мультиметр UNI-T UT8806, 6½ разрядов",
    manufacturer: "uni-t",
    model: "UT8806",
    category: "multimeters",
    specs: [
      {
        label: "Разрядность",
        value: "6½",
      },
      {
        label: "Базовая погрешность",
        value: "0,0035%",
      },
      {
        label: "Скорость измерений",
        value: "10 000 изм./с",
      },
    ],
    features: ["Высокая точность", "Быстрые измерения для автоматизации"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/uni-t-ut8806.pdf",
      },
    ],
    description: "Настольный мультиметр 6½ разрядов для лабораторий и производственных стендов.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/uni-t-ut8806/uni-t-ut8806-1.jpg",
      "/images/products/uni-t-ut8806/uni-t-ut8806-2.jpg",
      "/images/products/uni-t-ut8806/uni-t-ut8806-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-53230a",
    slug: "keysight-53230a",
    title: "Универсальный частотомер Keysight 53230A, 350 МГц",
    manufacturer: "keysight",
    model: "53230A",
    category: "frequency-counters",
    specs: [
      {
        label: "Частотный диапазон",
        value: "350 МГц",
      },
      {
        label: "Разрешение по частоте",
        value: "12 разрядов/с",
      },
      {
        label: "Разрешение по времени",
        value: "20 пс",
      },
      {
        label: "Интерфейсы",
        value: "LAN, USB, GPIB",
      },
    ],
    features: [
      "Высокое разрешение по частоте и времени",
      "Все стандартные интерфейсы для автоматизации",
      "Графическое отображение статистики",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-53230a.pdf",
      },
    ],
    description:
      "Универсальный частотомер/таймер для измерения частоты, периода, временных интервалов с высоким разрешением.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-53230a/keysight-53230a-1.jpg",
      "/images/products/keysight-53230a/keysight-53230a-2.jpg",
      "/images/products/keysight-53230a/keysight-53230a-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "yokogawa-gp10",
    slug: "yokogawa-gp10",
    title: "Портативный безбумажный регистратор Yokogawa GP10",
    manufacturer: "yokogawa",
    model: "GP10",
    category: "data-loggers",
    specs: [
      {
        label: "Аналоговые каналы",
        value: "до 30 (до 100 с расширением)",
      },
      {
        label: "Интервал измерения",
        value: "от 100 мс",
      },
      {
        label: "Тип",
        value: "портативный, безбумажный",
      },
    ],
    features: ["Модульная система", "Сенсорный экран", "Переносное исполнение"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/yokogawa-gp10.pdf",
      },
    ],
    description:
      "Портативный регистратор данных с сенсорным экраном. Модульная конструкция позволяет наращивать число каналов.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: ["/images/products/yokogawa-gp10/yokogawa-gp10-1.jpg"],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "yokogawa-gp20",
    slug: "yokogawa-gp20",
    title: "Модульная система сбора данных Yokogawa GP20",
    manufacturer: "yokogawa",
    model: "GP20",
    category: "data-loggers",
    specs: [
      {
        label: "Аналоговые каналы",
        value: "до 100 (до 450 с расширением)",
      },
      {
        label: "Интервал измерения",
        value: "от 100 мс",
      },
      {
        label: "Тип",
        value: "модульный, безбумажный",
      },
    ],
    features: ["До 450 каналов", "Модульная конструкция", "Большой сенсорный экран"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/yokogawa-gp20.pdf",
      },
    ],
    description: "Модульная система сбора данных с большим экраном для многоканальных испытаний.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/yokogawa-gp20/yokogawa-gp20-1.jpg",
      "/images/products/yokogawa-gp20/yokogawa-gp20-2.jpg",
      "/images/products/yokogawa-gp20/yokogawa-gp20-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mdo3sa",
    slug: "tektronix-mdo3sa",
    title: "Опция Tektronix MDO3SA — расширение анализатора спектра до 3 ГГц",
    manufacturer: "tektronix",
    model: "MDO3SA",
    category: "options",
    specs: [
      {
        label: "Совместимость",
        value: "осциллографы Tektronix серии MDO3000",
      },
      {
        label: "Функция",
        value: "расширение диапазона анализатора спектра",
      },
      {
        label: "Верхняя частота",
        value: "до 3 ГГц",
      },
      {
        label: "Тип",
        value: "программный ключ (лицензия)",
      },
    ],
    features: [
      "Установка без отправки прибора в сервис",
      "Анализ сигналов Wi-Fi, Bluetooth и других ВЧ-интерфейсов",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mdo3sa.pdf",
      },
    ],
    description:
      "Программная опция для осциллографов серии MDO3000. Расширяет входной диапазон встроенного анализатора спектра до 3 ГГц.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mdo3sa/tektronix-mdo3sa-1.jpg",
      "/images/products/tektronix-mdo3sa/tektronix-mdo3sa-2.jpg",
      "/images/products/tektronix-mdo3sa/tektronix-mdo3sa-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mdo3afg",
    slug: "tektronix-mdo3afg",
    title: "Опция Tektronix MDO3AFG — встроенный генератор сигналов",
    manufacturer: "tektronix",
    model: "MDO3AFG",
    category: "options",
    specs: [
      {
        label: "Совместимость",
        value: "осциллографы Tektronix серии MDO3000",
      },
      {
        label: "Синусоида",
        value: "до 50 МГц",
      },
      {
        label: "Стандартные формы",
        value: "13",
      },
      {
        label: "Частота дискретизации",
        value: "250 Мвыб/с",
      },
      {
        label: "Тип",
        value: "программный ключ (лицензия)",
      },
    ],
    features: ["Генератор и осциллограф в одном приборе", "Экономия места на рабочем столе"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mdo3afg.pdf",
      },
    ],
    description:
      "Программная опция для серии MDO3000, активирующая встроенный генератор сигналов произвольной формы.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mdo3afg/tektronix-mdo3afg-1.jpg",
      "/images/products/tektronix-mdo3afg/tektronix-mdo3afg-2.jpg",
      "/images/products/tektronix-mdo3afg/tektronix-mdo3afg-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "tektronix-mdo3bnd",
    slug: "tektronix-mdo3bnd",
    title: "Опция Tektronix MDO3BND — пакет приложений",
    manufacturer: "tektronix",
    model: "MDO3BND",
    category: "options",
    specs: [
      {
        label: "Совместимость",
        value: "осциллографы Tektronix серии MDO3000",
      },
      {
        label: "Состав",
        value: "9 приложений",
      },
      {
        label: "Декодирование шин",
        value: "I2C, SPI, UART, CAN, LIN и др.",
      },
      {
        label: "Анализ",
        value: "силовые измерения, маски и пределы",
      },
      {
        label: "Тип",
        value: "программный ключ (лицензия)",
      },
    ],
    features: [
      "Выгоднее, чем покупать опции по отдельности",
      "Полный набор для отладки встраиваемых систем",
    ],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/tektronix-mdo3bnd.pdf",
      },
    ],
    description:
      "Пакет из 9 приложений для серии MDO3000 в одной лицензии: силовой анализ, декодирование последовательных шин, тестирование по маске и пределам.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/tektronix-mdo3bnd/tektronix-mdo3bnd-1.jpg",
      "/images/products/tektronix-mdo3bnd/tektronix-mdo3bnd-2.jpg",
      "/images/products/tektronix-mdo3bnd/tektronix-mdo3bnd-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
  },
  {
    id: "keysight-exr2bw",
    slug: "keysight-exr2bw",
    title: "Опция Keysight EXR2BW — расширение полосы EXR с 2,5 до 4 ГГц",
    manufacturer: "keysight",
    model: "EXR2BW",
    category: "options",
    specs: [
      {
        label: "Совместимость",
        value: "Keysight Infiniium EXR, 8 каналов",
      },
      {
        label: "Исходная полоса",
        value: "2,5 ГГц",
      },
      {
        label: "Полоса после установки",
        value: "4 ГГц",
      },
      {
        label: "Тип",
        value: "программная лицензия",
      },
    ],
    features: ["Модернизация без замены прибора"],
    documents: [
      {
        title: "Брошюра (PDF)",
        url: "/brochures/keysight-exr2bw.pdf",
      },
    ],
    description:
      "Программная опция для 8-канальных осциллографов Infiniium EXR: увеличивает полосу пропускания с 2,5 до 4 ГГц. Возможно последующее обновление ПО.",
    deliveryTime: "уточняется по заявке",
    availability: "available",
    images: [
      "/images/products/keysight-exr2bw/keysight-exr2bw-1.jpg",
      "/images/products/keysight-exr2bw/keysight-exr2bw-2.jpg",
      "/images/products/keysight-exr2bw/keysight-exr2bw-3.jpg",
    ],
    missingData: ["country: страна производства — уточнить у поставщика"],
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
