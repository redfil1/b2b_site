"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

// Записывает факт просмотра карточки товара в localStorage (Frontend.md, раздел 8.7).
// Ничего не рендерит. Отдельный клиентский компонент, т.к. сама страница товара
// (app/catalog/[category]/[slug]/page.tsx) — асинхронный серверный компонент (та же
// причина обособления, что у ProductQuantityAddToCart.tsx).
export interface RecentlyViewedTrackerProps {
  slug: string;
  category: string;
  title: string;
}

export function RecentlyViewedTracker({ slug, category, title }: RecentlyViewedTrackerProps) {
  const { record } = useRecentlyViewed();

  useEffect(() => {
    record({ slug, category, title });
  }, [record, slug, category, title]);

  return null;
}
