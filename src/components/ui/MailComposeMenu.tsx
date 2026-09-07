import { buttonClassName, type ButtonVariant } from "@/components/ui/Button";
import type { MailMenuItem } from "@/lib/utils/mailLinks";

// Меню «открыть письмо в …»: список почтовых сервисов, каждый пункт с уже готовыми темой
// и телом. Нативный <details>/<summary>, без JS-состояния (Frontend.md, раздел 7.4).
// Презентационный компонент — только вёрстка и ссылки, готовый список пунктов приходит
// пропом (см. lib/utils/mailLinks.ts: buildMailMenuItems), поэтому в components/ui.
// Используется в сводке корзины (менеджеру и «себе» — Frontend.md 7.4 / 8.6) и на
// /contacts?product=<slug> (8.1); тем же списком позже добавятся WhatsApp/Telegram (7.5).
// <summary> стилизован под кнопку (buttonClassName); list-none и скрытие
// ::-webkit-details-marker убирают стандартный треугольник браузера.
export interface MailComposeMenuProps {
  label: string;
  items: MailMenuItem[];
  variant?: ButtonVariant;
  /** Класс на обёртке <details>. */
  className?: string;
  /** Класс на <summary>-кнопке — например, `w-full sm:w-auto` для растягивания на
   *  мобильном, когда меню в общем столбце действий. */
  summaryClassName?: string;
}

const ITEM_CLASSNAME =
  "rounded-xl px-4 py-2.5 text-sm text-primary transition-colors duration-200 ease-out hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800";

export function MailComposeMenu({
  label,
  items,
  variant = "primary",
  className = "",
  summaryClassName = "",
}: MailComposeMenuProps) {
  return (
    <details className={`relative ${className}`}>
      <summary
        className={`${buttonClassName(variant)} cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden ${summaryClassName}`}
      >
        {label}
      </summary>
      {/* shadow-md — плавающая панель поверх контента (тот же уровень приподнятости, что
          у крестика лайтбокса галереи), а не обычная карточка на странице (shadow-sm). */}
      <div className="absolute left-0 z-10 mt-2 flex w-56 flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-md">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className={ITEM_CLASSNAME}
          >
            {item.label}
          </a>
        ))}
      </div>
    </details>
  );
}
