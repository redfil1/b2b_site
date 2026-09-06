"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button, buttonClassName } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import { siteConfig } from "@/config/site";
import { useCart } from "@/hooks/useCart";
import type { CartItem } from "@/types/cart";

// Текстовая сводка корзины — используется и в теле письма (mailto:), и при копировании
// в буфер обмена (Frontend.md, раздел 7.4), поэтому одна функция форматирует текст
// одинаково для обоих способов. Отдельный файл/тип под неё не заводится — используется
// только здесь, переиспользования вне /cart нет (Project_Structure.md, правило против
// абстракций без необходимости).
function buildCartSummary(items: CartItem[]): string {
  return items
    .map((item) => {
      const modelPart = item.model ? ` (${item.model})` : "";
      // sku опционален (не у всех товаров есть, Product.sku/types/cart.ts) — добавляется
      // в строку только если заполнен у конкретной позиции.
      const skuPart = item.sku ? `, арт. ${item.sku}` : "";
      return `${item.title}${modelPart}${skuPart} — количество: ${item.quantity}`;
    })
    .join("\n");
}

export function CartPageClient() {
  const { items, removeItem, updateQuantity } = useCart();
  const [copied, setCopied] = useState(false);

  const summary = useMemo(() => buildCartSummary(items), [items]);

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

  // mailto:/Gmail/Outlook — не внутренние роуты приложения, поэтому обычные <a>, а не
  // next/link Link (тот же принцип, что у ссылок на документы товара,
  // ProductGallery.tsx/page.tsx: Link — для переходов по сайту, <a> — для остального).
  // Три варианта вместо одной ссылки mailto: — решено по итогам обсуждения способов
  // связи с менеджером, 2026-09-06 (Frontend.md, раздел 7.4).
  const mailSubject = encodeURIComponent(`Запрос по товарам — ${siteConfig.name}`);
  const mailBody = encodeURIComponent(summary);
  const encodedEmail = encodeURIComponent(siteConfig.contacts.email);
  const mailtoHref = `mailto:${siteConfig.contacts.email}?subject=${mailSubject}&body=${mailBody}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${mailSubject}&body=${mailBody}`;
  const outlookHref = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodedEmail}&subject=${mailSubject}&body=${mailBody}`;

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
                <span className="w-6 text-center tabular-nums text-primary">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productSlug, item.quantity + 1)}
                  aria-label="Увеличить количество"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-primary transition-colors duration-200 ease-out hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.productSlug)}
                aria-label={`Удалить «${item.title}» из корзины`}
                className="rounded-lg text-sm text-secondary underline-offset-2 transition-colors duration-200 ease-out hover:text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Текстовый блок сводки на странице убран — дублировал список товаров выше
          (был виден как отдельная "Сводка для менеджера"). summary как строка
          остаётся: используется в теле письма (mailto:/Gmail/Outlook) и при
          копировании в буфер ниже — просто больше не рендерится сам по себе. */}
      <div className="flex flex-col gap-2">
        {/* Единый поясняющий блок — раньше здесь было два отдельных текста (про меню
            почты и отдельно про назначение "Скопировать"), объединены в один
            (Frontend.md, раздел 7.4). Второстепенный текст перед кнопками, не меняет
            их визуальный приоритет. */}
        <p className="text-sm text-secondary">
          Gmail и Outlook откроются в новой вкладке с уже готовым письмом. «Другая
          почта» использует вашу почтовую программу по умолчанию. Если ни один вариант
          не подошёл — скопируйте текст заявки кнопкой «Скопировать» и отправьте его
          сами через любую удобную почту или мессенджер.
        </p>
        <div className="flex flex-wrap items-start gap-3">
          {/* Меню выбора почтового сервиса — нативный <details>/<summary>, без
              JS-состояния (Frontend.md, раздел 7.4: предпочтительнее самодельного
              попапа на useState, если хватает возможностей для доступной вёрстки).
              <summary> стилизован под Button variant="primary" (buttonClassName) —
              та же визуальная роль, что раньше была у самой ссылки "Отправить на
              email". list-none и скрытие ::-webkit-details-marker — убирают
              стандартный треугольник-маркер браузера, чтобы кнопка выглядела как
              обычная, а не как <details> из коробки. */}
          <details className="relative">
            <summary
              className={`${buttonClassName("primary")} cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden`}
            >
              Отправить на email
            </summary>
            {/* shadow-md, а не shadow-sm — это плавающая панель поверх контента (тот же
                уровень приподнятости, что у крестика лайтбокса галереи, ProductGallery.tsx),
                а не обычная карточка на странице (там достаточно shadow-sm, Frontend.md,
                раздел 4.3). */}
            <div className="absolute left-0 z-10 mt-2 flex w-56 flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-md">
              <a
                href={gmailHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-4 py-2.5 text-sm text-primary transition-colors duration-200 ease-out hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800"
              >
                Gmail
              </a>
              <a
                href={outlookHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-4 py-2.5 text-sm text-primary transition-colors duration-200 ease-out hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800"
              >
                Outlook
              </a>
              <a
                href={mailtoHref}
                className="rounded-xl px-4 py-2.5 text-sm text-primary transition-colors duration-200 ease-out hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800"
              >
                Другая почта
              </a>
            </div>
          </details>
          {/* confirm — тот же приём, что у AddToCartButton (раздел 7.3): временный
              вариант оформления на время показа "Скопировано", accent-teal вместо
              обычного цвета кнопки. */}
          <Button
            type="button"
            variant={copied ? "confirm" : "outline"}
            onClick={handleCopy}
          >
            {copied ? "Скопировано" : "Скопировать"}
          </Button>
        </div>
      </div>
    </div>
  );
}
