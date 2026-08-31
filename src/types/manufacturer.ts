// Источник структуры — Architecture.md, раздел 1.1 (решено в диалоге с пользователем,
// т.к. Product.md фиксирует только то, что Product.manufacturer — строковый ключ на эту схему).

export interface Manufacturer {
  /** Ключ производителя, равен значению Product.manufacturer. */
  slug: string;
  /** Отображаемое название производителя. */
  name: string;
  /** Путь к логотипу — для полосы логотипов производителей на главной (Architecture.md, 1.1). */
  logo?: string;
}
