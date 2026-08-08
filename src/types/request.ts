// Источник структуры — Commercial-offer.md, раздел 6. Контракт клиент → POST /api/request
// (см. API.md). Одна позиция товара (product), не items[] — открытый вопрос поддержки
// нескольких позиций в заявке не решён (Commercial-offer.md, "Открытые вопросы", п.2).

export interface RequestPayload {
  /** Название компании-заказчика, 2–200 символов (валидация — Commercial-offer.md, 2.1). */
  companyName: string;
  /** ИНН, ровно 10 или 12 цифр без пробелов и букв. */
  inn: string;
  /** Контактное лицо, 2–150 символов. */
  contactName: string;
  /**
   * Телефон, нормализуется на сервере к виду +7XXXXXXXXXX (Commercial-offer.md, 2.4).
   * Должен быть указан телефон ИЛИ email (кросс-полевая проверка, не проверка одного поля).
   */
  phone?: string;
  /** Email. Должен быть указан телефон ИЛИ email. */
  email?: string;
  /**
   * Товар — объект, а не плоское поле productName: slug заполняется автоматически,
   * если заявка создана со страницы товара (Product.slug), title — всегда заполнено
   * (либо Product.title автоматически, либо вручную при заявке без привязки к каталогу).
   * Цены в product нет — у Product нет поля цены (Commercial-offer.md, раздел 0.1, 5).
   */
  product: {
    slug?: string;
    title: string;
  };
  /** Комментарий, опционально, до 2000 символов. */
  comment?: string;
}
