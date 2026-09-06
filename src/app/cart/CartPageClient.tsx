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

  // mailto: — не внутренний роут приложения, поэтому обычная <a>, а не next/link Link
  // (тот же принцип, что у ссылок на документы товара, ProductGallery.tsx/page.tsx:
  // Link — для переходов по сайту, <a> — для остального, включая mailto:/tel:).
  const mailSubject = encodeURIComponent(`Запрос по товарам — ${siteConfig.name}`);
  const mailBody = encodeURIComponent(summary);
  const mailtoHref = `mailto:${siteConfig.contacts.email}?subject=${mailSubject}&body=${mailBody}`;

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

      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-secondary p-4">
        <p className="text-sm font-medium text-primary">Сводка для менеджера</p>
        <pre className="whitespace-pre-wrap font-sans text-sm text-primary">{summary}</pre>
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={mailtoHref} className={buttonClassName("primary")}>
          Отправить на email
        </a>
        <Button type="button" variant="outline" onClick={handleCopy}>
          {copied ? "Скопировано" : "Скопировать"}
        </Button>
      </div>
    </div>
  );
}
