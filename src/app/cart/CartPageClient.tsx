"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LinkButton } from "@/components/ui/LinkButton";
import { MailComposeMenu } from "@/components/ui/MailComposeMenu";
import { Textarea } from "@/components/ui/Textarea";
import { siteConfig } from "@/config/site";
import { useCart } from "@/hooks/useCart";
import { buildMailLinks } from "@/lib/utils/mailLinks";
import type { CartItem } from "@/types/cart";

// Необязательные поля контекста над кнопками (Frontend.md, раздел 8.3). Это НЕ форма
// сбора данных: значения никуда не отправляются и не сохраняются (ни на сервер, ни в
// localStorage — в отличие от состава корзины), они лишь дописываются в текст сводки,
// который клиент сам копирует или отправляет своей почтой (Architecture.md, раздел 2.3).
interface CartContextFields {
  company: string;
  city: string;
  comment: string;
}

// Текстовая сводка корзины — используется в теле письма (mailto:/Gmail/Outlook), при
// копировании и в Web Share (Frontend.md, разделы 7.4, 8.3, 8.6), поэтому одна функция
// форматирует текст одинаково для всех способов. Отдельный файл/тип под неё не заводится
// — переиспользования вне /cart нет (Project_Structure.md, правило против абстракций без
// необходимости).
function buildCartSummary(
  items: CartItem[],
  context: CartContextFields,
  requestCode: string,
): string {
  const contextLines = [
    context.company.trim() ? `Компания: ${context.company.trim()}` : "",
    context.city.trim() ? `Город доставки: ${context.city.trim()}` : "",
    context.comment.trim() ? `Комментарий: ${context.comment.trim()}` : "",
  ].filter(Boolean);

  const itemLines = items.map((item) => {
    const modelPart = item.model ? ` (${item.model})` : "";
    // sku опционален (не у всех товаров есть, Product.sku/types/cart.ts) — добавляется
    // в строку только если заполнен у конкретной позиции.
    const skuPart = item.sku ? `, арт. ${item.sku}` : "";
    return `${item.title}${modelPart}${skuPart} — количество: ${item.quantity}`;
  });

  return [
    `Заявка [${requestCode}]`,
    "",
    ...contextLines,
    ...(contextLines.length > 0 ? [""] : []),
    ...itemLines,
  ].join("\n");
}

// Короткий человекочитаемый код заявки (Frontend.md, раздел 8.6) — детерминированно из
// состава корзины (productSlug + количество) и текущей даты. Нигде не сохраняется, не
// номер в реестре: нужен только чтобы клиент и менеджер могли сослаться на «заявку XXXX»
// в переписке, а не пересказывать состав. Меняется при изменении состава или в другой
// день — осознанное свойство (там же). FNV-1a — короткий стабильный хэш, без
// крипто-требований (это не безопасность).
function buildRequestCode(items: CartItem[]): string {
  const basis =
    new Date().toISOString().slice(0, 10) +
    "|" +
    items
      .map((item) => `${item.productSlug}:${item.quantity}`)
      .sort()
      .join(",");

  let hash = 0x811c9dc5;
  for (let i = 0; i < basis.length; i += 1) {
    hash ^= basis.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36).toUpperCase().padStart(4, "0").slice(0, 4);
}

export function CartPageClient() {
  const { items, removeItem, updateQuantity } = useCart();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("");

  const requestCode = useMemo(() => buildRequestCode(items), [items]);
  const summary = useMemo(
    () => buildCartSummary(items, { company, city, comment }, requestCode),
    [items, company, city, comment, requestCode],
  );

  // Поддержка Web Share API проверяется прямо в теле рендера, без useState+useEffect:
  // эта ветка компонента (return ниже, после раннего возврата для пустой корзины)
  // на самом первом клиентском рендере (гидратация) всё равно не показывается —
  // useCart() отдаёт EMPTY_ITEMS на гидратации (CartProvider.tsx, useSyncExternalStore
  // с getServerSnapshot), поэтому здесь мы уже гарантированно не в проходе гидратации,
  // и обычная проверка не создаёт риска несовпадения с серверной разметкой.
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API недоступен (нет разрешения/небезопасный контекст) — тихо
      // игнорируем, у клиента остаётся кнопка "Отправить на email" как альтернатива.
    }
  }

  async function handleShare() {
    try {
      await navigator.share({ title: `Заявка ${requestCode}`, text: summary });
      setShared(true);
      window.setTimeout(() => setShared(false), 1500);
    } catch {
      // Пользователь закрыл системное меню "Выбрать способ отправки" без выбора
      // приложения (AbortError) — это штатная отмена, а не ошибка, поэтому молча ничего не
      // делаем; кнопка остаётся в обычном виде, остальные способы (email/буфер
      // обмена) никуда не делись.
    }
  }

  if (items.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-start gap-4">
        <p className="text-secondary">Корзина пуста.</p>
        <LinkButton href="/catalog" variant="outline">
          Перейти в каталог
        </LinkButton>
      </div>
    );
  }

  // Наборы ссылок «открыть письмо в …» (Frontend.md, разделы 7.4, 8.6) — одинаковый
  // формат URL для менеджера и для варианта «себе», строится в lib/utils/mailLinks.ts.
  // Код заявки — в теме всех вариантов (в т.ч. Web Share выше через title/text).
  const managerLinks = buildMailLinks({
    to: siteConfig.contacts.email,
    subject: `Запрос по товарам [${requestCode}] — ${siteConfig.name}`,
    body: summary,
  });
  // Вариант «Отправить себе»: получателя нет — клиент вписывает свой адрес сам.
  const selfLinks = buildMailLinks({
    to: "",
    subject: `Моя заявка [${requestCode}] — ${siteConfig.name}`,
    body: summary,
  });

  return (
    <div className="mt-8 flex flex-col gap-8">
      <ul className="flex flex-col divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
        {items.map((item) => (
          <li
            key={item.productSlug}
            className="flex flex-wrap items-center justify-between gap-4 p-4"
          >
            <div className="flex flex-col gap-1">
              <Link
                href={`/catalog/${item.category}/${item.productSlug}`}
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                {item.title}
              </Link>
              {item.model && <p className="text-sm text-secondary">Модель: {item.model}</p>}
            </div>

            <div className="flex items-center gap-4">
              {/* Степпер количества уже добавленной позиции — своя логика (updateQuantity
                  на уже сохранённом item), не переиспользует ProductQuantityAddToCart.tsx
                  со страницы товара (там — количество перед первым добавлением, раздел 7.3). */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productSlug, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  aria-label="Уменьшить количество"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-primary transition-colors duration-200 ease-out hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  −
                </button>
                {/* aria-live — озвучивает скринридеру новое значение при клике по +/-
                    (найдено при самокритичном аудите; тот же приём, что на странице
                    товара, ProductQuantityAddToCart.tsx). */}
                <span
                  aria-live="polite"
                  aria-atomic="true"
                  className="w-6 text-center tabular-nums text-primary"
                >
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productSlug, item.quantity + 1)}
                  aria-label="Увеличить количество"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-primary transition-colors duration-200 ease-out hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2"
                >
                  +
                </button>
              </div>

              {/* Иконка-кнопка вместо текстовой ссылки «Удалить» — на мобильном текстовая
                  ссылка была слишком мелкой тап-целью почти вплотную к «+» (скрины
                  реального телефона, 2026-09-07). h-10 w-10 — комфортная зона нажатия. */}
              <button
                type="button"
                onClick={() => removeItem(item.productSlug)}
                aria-label={`Удалить «${item.title}» из корзины`}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-secondary transition-colors duration-200 ease-out hover:bg-secondary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2"
              >
                <Trash2 className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Необязательные поля контекста (Frontend.md, раздел 8.3). Не форма: значения
          только дописываются в текст сводки ниже, никуда не отправляются и не
          сохраняются. */}
      <div className="flex flex-col gap-3">
        <p className="text-sm text-secondary">
          Поля ниже необязательны и никуда не отправляются — они лишь добавляются в текст заявки,
          который вы копируете или отправляете сами.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm text-secondary">
            Компания
            <Input
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              autoComplete="organization"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-secondary">
            Город доставки
            <Input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              autoComplete="address-level2"
            />
          </label>
        </div>
        <label className="flex flex-col gap-1 text-sm text-secondary">
          Комментарий
          <Textarea value={comment} onChange={(event) => setComment(event.target.value)} />
        </label>
      </div>

      {/* Текстовый блок сводки на странице убран — дублировал список товаров выше
          (был виден как отдельная "Сводка для менеджера"). summary как строка
          остаётся: используется в теле письма (mailto:/Gmail/Outlook), в Web Share и
          при копировании ниже — просто больше не рендерится сам по себе. */}
      <div className="flex flex-col gap-2">
        {/* Короткий поясняющий текст (сокращён 2026-09-07 по скринам реального телефона —
            прежний абзац занимал 8 строк на мобильном). Тема письма несёт код заявки
            [{requestCode}] — по нему удобно сослаться на заявку в разговоре с менеджером. */}
        <p className="text-sm text-secondary">
          Выберите способ отправки. Если ни один не подошёл — нажмите «Скопировать» и отправьте
          текст сами. Тема письма содержит код заявки{" "}
          <span className="tabular-nums text-primary">[{requestCode}]</span> — по нему удобно
          сослаться на эту заявку в разговоре с менеджером.
        </p>
        {/* На мобильном действия идут в столбик во всю ширину (кнопки-крохи вразнобой
            плохо читались — скрины реального телефона, 2026-09-07); с sm: — прежний
            ряд с переносом. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
          {/* Web Share API — самый удобный вариант, когда браузер его поддерживает
              (мобильные Safari/Chrome, часть десктопных Chromium — не Firefox
              десктоп), поэтому забирает себе роль основной кнопки (variant primary),
              а "Отправить на email" ниже уступает ей и становится outline. Без
              поддержки (navigator.share нет) кнопка не рендерится вовсе — canShare
              проверяется один раз при рендере, см. комментарий выше. confirm — тот
              же приём кратковременной обратной связи, что у "Скопировано"/"Добавлено". */}
          {canShare && (
            <Button
              type="button"
              variant={shared ? "confirm" : "primary"}
              onClick={handleShare}
              className="w-full sm:w-auto"
            >
              {shared ? "Отправлено" : "Выбрать способ отправки"}
            </Button>
          )}
          {/* Меню выбора почтового сервиса — презентационный MailComposeMenu
              (components/ui): нативный <details>/<summary> без JS-состояния
              (Frontend.md, раздел 7.4). primary, если "Выбрать способ отправки" не
              показана (тогда это основное действие), иначе outline. */}
          <MailComposeMenu
            label="Отправить на email"
            links={managerLinks}
            variant={canShare ? "outline" : "primary"}
            className="w-full sm:w-auto"
            summaryClassName="w-full sm:w-auto"
          />
          {/* «Отправить себе» (Frontend.md, раздел 8.6) — тем же меню, второстепенное
              действие (outline); последний пункт назван «Почтовая программа», т.к.
              адреса получателя нет. */}
          <MailComposeMenu
            label="Отправить себе"
            links={selfLinks}
            variant="outline"
            fallbackLabel="Почтовая программа"
            className="w-full sm:w-auto"
            summaryClassName="w-full sm:w-auto"
          />
          {/* confirm — тот же приём, что у AddToCartButton (раздел 7.3): временный
              вариант оформления на время показа "Скопировано", accent-teal вместо
              обычного цвета кнопки. */}
          <Button
            type="button"
            variant={copied ? "confirm" : "outline"}
            onClick={handleCopy}
            className="w-full sm:w-auto"
          >
            {copied ? "Скопировано" : "Скопировать"}
          </Button>
        </div>
      </div>
    </div>
  );
}
