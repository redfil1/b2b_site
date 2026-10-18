// Источник структуры — Product.md (чат "Карточки"), финальная версия схемы.
// Product — публичный тип: то, что видят компоненты и фронт.
// ProductDraft — расширение с служебным полем missingData, используется только
// внутри lib/data/products.ts на этапе подготовки данных, наружу не отдаётся.

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDocument {
  title: string;
  url: string;
}

/**
 * Статус позиции у поставщика (НЕ физический склад в РФ — склада нет, всё под заказ).
 * 'available'   → бейдж "Под заказ" (поставщик продаёт позицию сейчас)
 * 'unavailable' → бейдж "Нет в поставке" (поставщик снял с производства/поставки)
 * См. Product.md, п.2.2 — намеренно переопределённый смысл поля.
 */
export type ProductAvailability = "available" | "unavailable";

/**
 * Текст бейджа на карточке товара для каждого статуса — единое место,
 * чтобы чат "Фронт" не заводил свою копию строк (см. Product.md, п.2.2).
 */
export const PRODUCT_AVAILABILITY_LABELS: Record<ProductAvailability, string> = {
  available: "Под заказ",
  unavailable: "Нет в поставке",
};

/**
 * Текст CTA-ссылки на карточке товара в зависимости от статуса (Product.md, п.2.2):
 * для позиции, снятой с поставки, менеджеру сначала нужно подтвердить, актуальна ли
 * она вообще, поэтому формулировка другая, чем для обычного обращения по доступному
 * товару. Как и PRODUCT_AVAILABILITY_LABELS — единое место, чтобы текст не был
 * захардкожен в компоненте карточки товара.
 */
// available: "Запросить КП" — переименовано по итогам дизайн-ревью, 2026-09-06
// (Product.md, п.2.2): привычная терминология для российских B2B-закупщиков.
// Кнопка в Header — отдельная точка входа, этого переименования не касается.
export const PRODUCT_CONTACT_CTA_LABELS: Record<ProductAvailability, string> = {
  available: "Запросить КП",
  unavailable: "Уточнить возможность поставки",
};

/**
 * Значение deliveryTime, когда поставщик срок не указал (Product.md, раздел 2.1). Вынесено в
 * константу, т.к. от него зависит вёрстка: в сетке каталога строка срока при этом значении
 * не выводится (Frontend.md, раздел 11).
 */
export const DELIVERY_TIME_UNKNOWN = "уточняется по заявке";

export interface Product {
  id: string;
  slug: string;
  title: string;
  /**
   * Ключ на lib/data/manufacturers.ts. Опционально в типе, т.к. не для всех позиций
   * производитель известен — если данных нет, это уходит в missingData, а не
   * заполняется предположением (Product.md, п.2.1).
   */
  manufacturer?: string;
  /** Модель/артикул производителя как в прайсе, без адаптации (в отличие от title). */
  model?: string;
  /** Страна производства/происхождения. */
  country?: string;
  /** Артикул/код товара у поставщика — не у всех позиций есть. */
  sku?: string;
  /**
   * Ключ категории — slug из lib/data/categories.ts (список зафиксирован 2026-10-18,
   * Product.md, раздел 7). string, а не union: категории пополняются вместе с каталогом.
   */
  category: string;
  specs: ProductSpec[];
  /** Комплектация (вкладка «Комплектация») — плоский список, без вложенной структуры. */
  package?: string[];
  /** Документы (вкладка «Документы», в т.ч. PDF-брошюра). Файлы — в public/brochures/, см. Tech Stack.md. */
  documents?: ProductDocument[];
  /** Ключевые особенности — список под описанием во вкладке «Описание» (Product.md, раздел 7). */
  features?: string[];
  description: string;
  deliveryTime: string;
  availability: ProductAvailability;
  images?: string[];
}

/**
 * Данные карточки в сетке (ProductGrid) — подмножество Product, не отдельная схема.
 * Отдаётся клиентскому блоку «Вы недавно смотрели» пропом вместо импорта всего каталога
 * в браузер (Frontend.md, раздел 10): без specs/features/documents и без служебного
 * missingData (Product.md, раздел 4).
 */
export type ProductCardData = Pick<
  Product,
  | "id"
  | "slug"
  | "category"
  | "title"
  | "model"
  | "description"
  | "deliveryTime"
  | "availability"
  | "images"
>;

/**
 * Только для lib/data/products.ts — не импортировать в components/*.
 * missingData не входит в Product, чтобы служебные пометки физически
 * не могли попасть в клиентский код (см. замечание в Product.md).
 */
export interface ProductDraft extends Product {
  /** Характеристики/данные, которые нужно уточнить у поставщика. На фронт не идёт. */
  missingData?: string[];
}
