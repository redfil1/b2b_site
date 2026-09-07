// Ссылки «открыть письмо с готовыми темой и телом» в разных почтовых сервисах. Один и
// тот же набор нужен в двух местах — сводка корзины (app/cart/CartPageClient.tsx,
// Frontend.md, разделы 7.4 и 8.6) и переход с карточки товара на /contacts?product=<slug>
// (app/contacts/page.tsx, Frontend.md, раздел 8.1). Логика построения URL одинакова,
// поэтому вынесена сюда, а не продублирована. Значения кодируются здесь; на вход
// принимаются сырыми.
//
// Порядок в меню (Frontend.md, раздел 7.4, пересмотрено 2026-09-07) — российские сервисы
// вперёд: у RU B2B-клиентов это чаще Яндекс/Mail.ru, чем Gmail/Outlook.
//
// ВНИМАНИЕ: форматы `yandexHref` и `mailruHref` — предварительные, вживую не проверены
// (компоузер обоих за авторизацией). См. CLAUDE.md, «Известные открытые вопросы», и
// Frontend.md, раздел 7.4. Gmail/Outlook — проверены.

export interface MailLinkParams {
  /** Получатель. Пустая строка — письмо без адреса: клиент вписывает его сам
   *  (вариант «Отправить себе», Frontend.md, раздел 8.6). */
  to: string;
  subject: string;
  body: string;
}

export interface MailLinks {
  yandexHref: string;
  mailruHref: string;
  gmailHref: string;
  outlookHref: string;
  mailtoHref: string;
}

export function buildMailLinks({ to, subject, body }: MailLinkParams): MailLinks {
  const encodedTo = encodeURIComponent(to);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return {
    yandexHref: `https://mail.yandex.ru/compose?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`,
    mailruHref: `https://e.mail.ru/compose?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`,
    gmailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`,
    outlookHref: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`,
    // В mailto: адрес идёт как есть (не percent-encoded). Пустой `to` даёт
    // mailto:?subject=... — валидный URL с пустым полем «Кому».
    mailtoHref: `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`,
  };
}

export interface MailMenuItem {
  label: string;
  href: string;
  /** true — открывать в новой вкладке (веб-композер). Для `mailto:` — false: управление
   *  передаётся системному обработчику, вкладка не нужна. */
  external: boolean;
}

/**
 * Пункты меню «отправить письмом» в порядке для RU B2B (Frontend.md, раздел 7.4).
 * `fallbackLabel` — подпись последнего пункта (`mailto:`): «Другая почта» по умолчанию,
 * «Почтовая программа» для варианта «Отправить себе» (там адреса получателя нет).
 */
export function buildMailMenuItems(
  links: MailLinks,
  fallbackLabel = "Другая почта",
): MailMenuItem[] {
  return [
    { label: "Яндекс Почта", href: links.yandexHref, external: true },
    { label: "Mail.ru", href: links.mailruHref, external: true },
    { label: "Gmail", href: links.gmailHref, external: true },
    { label: "Outlook", href: links.outlookHref, external: true },
    { label: fallbackLabel, href: links.mailtoHref, external: false },
  ];
}
