// Три способа открыть письмо с уже готовыми темой и телом: Gmail и Outlook в вебе и
// обычная ссылка mailto: (почтовая программа по умолчанию). Один и тот же набор ссылок
// нужен в двух местах — сводка корзины (app/cart/CartPageClient.tsx, Frontend.md,
// разделы 7.4 и 8.6) и переход с карточки товара на /contacts?product=<slug>
// (app/contacts/page.tsx, Frontend.md, раздел 8.1). Логика построения URL одинакова,
// поэтому вынесена сюда, а не продублирована — два реальных места с идентичным кодом,
// не «абстракция про запас» (Coding Rules.md). Значения кодируются здесь; на вход
// принимаются сырыми.

export interface MailLinkParams {
  /** Получатель. Пустая строка — письмо без адреса: клиент вписывает его сам
   *  (вариант «Отправить себе», Frontend.md, раздел 8.6). */
  to: string;
  subject: string;
  body: string;
}

export interface MailLinks {
  mailtoHref: string;
  gmailHref: string;
  outlookHref: string;
}

export function buildMailLinks({ to, subject, body }: MailLinkParams): MailLinks {
  const encodedTo = encodeURIComponent(to);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return {
    // В mailto: адрес идёт как есть (не percent-encoded) — то же поведение, что было у
    // единственной ссылки до вынесения в утилиту. Пустой `to` даёт mailto:?subject=...
    // — валидный URL, открывающий пустое поле «Кому».
    mailtoHref: `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`,
    gmailHref: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`,
    outlookHref: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`,
  };
}
