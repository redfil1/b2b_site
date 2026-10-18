"use client";

import { useSyncExternalStore } from "react";
import { ProductGrid } from "@/components/features/catalog/ProductGrid";
import type { ProductCardData } from "@/types/product";

// Фильтр по производителю на странице категории (Frontend.md, раздел 12). Работает на
// клиенте, чтобы страница категории оставалась статической (generateStaticParams): сервер
// отдаёт все карточки категории и список производителей, здесь — только выбор и
// фильтрация. Выбор живёт в ?brand=<slug> — ссылкой с фильтром можно поделиться.

export interface ManufacturerOption {
  slug: string;
  name: string;
  /** Число позиций этого производителя в категории — подпись чипа. */
  count: number;
}

export interface CategoryFiltersProps {
  products: ProductCardData[];
  manufacturers: ManufacturerOption[];
}

const BRAND_PARAM = "brand";

// Источник истины — сам адрес (?brand=), читаемый через useSyncExternalStore: тот же приём
// против расхождения серверной и клиентской разметки, что у корзины (CartProvider.tsx).
// На сервере (статическая сборка) параметров нет — getServerSnapshot отдаёт null, после
// гидратации подхватывается значение из адреса. replaceState события не шлёт, поэтому
// select() сам оповещает подписчиков; popstate — на случай «назад/вперёд».
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("popstate", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("popstate", callback);
  };
}

function getBrandFromUrl(): string | null {
  return new URLSearchParams(window.location.search).get(BRAND_PARAM);
}

function getServerBrand(): string | null {
  return null;
}

function select(next: string | null) {
  // replaceState, а не навигация: без перезагрузки и без лишней записи в истории на
  // каждый клик по чипу.
  const url = new URL(window.location.href);
  if (next) {
    url.searchParams.set(BRAND_PARAM, next);
  } else {
    url.searchParams.delete(BRAND_PARAM);
  }
  window.history.replaceState(null, "", url);
  listeners.forEach((listener) => listener());
}

export function CategoryFilters({ products, manufacturers }: CategoryFiltersProps) {
  const fromUrl = useSyncExternalStore(subscribe, getBrandFromUrl, getServerBrand);
  // Неизвестный slug в адресе игнорируется — показываются все позиции.
  const brand = manufacturers.some((option) => option.slug === fromUrl) ? fromUrl : null;

  const visible = brand ? products.filter((product) => product.manufacturer === brand) : products;

  const chipClass = (active: boolean) =>
    `rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2 ${
      active
        ? "border-brand-800 bg-brand-800 text-white"
        : "border-gray-300 bg-white text-primary hover:border-brand-800"
    }`;

  return (
    <div className="mt-8 flex flex-col gap-4">
      <div role="group" aria-label="Производитель" className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={brand === null}
          onClick={() => select(null)}
          className={chipClass(brand === null)}
        >
          Все ({products.length})
        </button>
        {manufacturers.map((option) => (
          <button
            key={option.slug}
            type="button"
            aria-pressed={brand === option.slug}
            // Повторный клик по активному чипу сбрасывает фильтр.
            onClick={() => select(brand === option.slug ? null : option.slug)}
            className={chipClass(brand === option.slug)}
          >
            {option.name} ({option.count})
          </button>
        ))}
      </div>
      <p aria-live="polite" className="text-sm text-secondary">
        Показано: {visible.length}
      </p>
      <ProductGrid products={visible} />
    </div>
  );
}
