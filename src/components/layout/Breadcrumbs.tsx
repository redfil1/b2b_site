import Link from "next/link";
import { siteConfig } from "@/config/site";

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

/**
 * JSON-LD `BreadcrumbList` для той же цепочки крошек, что показывает `Breadcrumbs`
 * (SEO.md, раздел 8.2) — те же `items` (с "Главная", добавленной автоматически),
 * но с абсолютными URL. В отличие от видимого компонента, здесь `href` нужен и на
 * последнем (текущем) элементе — сам компонент его для последнего элемента
 * игнорирует, так что один и тот же список `items` можно передавать в оба места.
 */
export function buildBreadcrumbLd(items: BreadcrumbItem[]) {
  const allItems: BreadcrumbItem[] = [{ label: "Главная", href: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href ?? "", siteConfig.url).toString(),
    })),
  };
}
