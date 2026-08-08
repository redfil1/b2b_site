import Link from "next/link";

// Без обращения к lib/data — принимает готовый список крошек пропсом, страница сама
// собирает его из своих данных (Project_Structure.md: components/layout — только вёрстка).
export interface BreadcrumbItem {
  label: string;
  /** Ссылка. Без href — текущая страница (последний элемент), не кликабельна. */
  href?: string;
}

export interface BreadcrumbsProps {
  /** Крошки после "Главная" — она добавляется автоматически. */
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: "Главная", href: "/" }, ...items];

  return (
    <nav aria-label="Хлебные крошки" className="text-sm text-secondary">
      <ol className="flex flex-wrap items-center gap-1.5">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors duration-200 ease-out hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-primary" : ""}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
