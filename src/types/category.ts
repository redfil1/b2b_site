// Источник структуры — Architecture.md, раздел 1.1 (решено в диалоге с пользователем,
// т.к. Product.md фиксирует только то, что Product.category — строковый ключ на эту схему).

export interface Category {
  /** Ключ категории, равен значению Product.category, участвует в URL /catalog/[category]. */
  slug: string;
  /** Отображаемое название — заголовки, хлебные крошки, список категорий в каталоге. */
  name: string;
  /** Краткое описание категории, например для SEO-текста на /catalog/[category]. */
  description?: string;
  /** Изображение/иконка категории для карточки категории на /catalog. */
  image?: string;
}
