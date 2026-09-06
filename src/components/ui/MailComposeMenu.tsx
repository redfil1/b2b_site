import { buttonClassName, type ButtonVariant } from "@/components/ui/Button";
import type { MailLinks } from "@/lib/utils/mailLinks";

// Меню «открыть письмо в …»: Gmail / Outlook / почтовая программа по умолчанию, каждый
// пункт с уже готовыми темой и телом. Нативный <details>/<summary>, без JS-состояния
// (Frontend.md, раздел 7.4). Презентационный компонент — только вёрстка и ссылки,
// готовые href приходят пропом (см. lib/utils/mailLinks.ts), поэтому в components/ui.
// Используется в сводке корзины (менеджеру и «себе» — Frontend.md 7.4 / 8.6) и на
// /contacts?product=<slug> (8.1). <summary> стилизован под кнопку (buttonClassName),
// list-none и скрытие ::-webkit-details-marker убирают стандартный треугольник браузера.
export interface MailComposeMenuProps {
  label: string;
  links: MailLinks;
  variant?: ButtonVariant;
  /** Подпись последнего пункта. По умолчанию «Другая почта»; для варианта «Отправить
   *  себе» (Frontend.md 8.6) осмысленнее «Почтовая программа». */
  fallbackLabel?: string;
  /** Класс на обёртке <details>. */
  className?: string;
  /** Класс на <summary>-кнопке — например, чтобы растянуть её на всю ширину на
   *  мобильном (`w-full sm:w-auto`), когда меню в общем столбце действий. */
  summaryClassName?: string;
}

const ITEM_CLASSNAME =
  "rounded-xl px-4 py-2.5 text-sm text-primary transition-colors duration-200 ease-out hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800";

export function MailComposeMenu({
  label,
  links,
  variant = "primary",
  fallbackLabel = "Другая почта",
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
        <a href={links.gmailHref} target="_blank" rel="noreferrer" className={ITEM_CLASSNAME}>
          Gmail
        </a>
        <a href={links.outlookHref} target="_blank" rel="noreferrer" className={ITEM_CLASSNAME}>
          Outlook
        </a>
        <a href={links.mailtoHref} className={ITEM_CLASSNAME}>
          {fallbackLabel}
        </a>
      </div>
    </details>
  );
}
