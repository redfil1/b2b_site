"use client";

import { useCallback, useSyncExternalStore } from "react";

// Список недавно просмотренных товаров — только localStorage браузера, те же принцип и
// ограничения, что у корзины (Architecture.md, раздел 2.3; Frontend.md, раздел 8.7):
// без сервера, без персональных данных, хранится минимальный снимок для показа и ссылки.
// Внешний стор + useSyncExternalStore (а не useState+useEffect) — тот же приём против
// рассинхрона серверной и клиентской разметки, что в CartProvider.tsx: getServerSnapshot
// отдаёт тот же пустой массив, что React видит на первом клиентском рендере.
//
// Отдельного React-контекста здесь намеренно нет (в отличие от корзины): писатель
// (страница товара — RecentlyViewedTracker) и читатель (главная/каталог —
// RecentlyViewedProducts) никогда не смонтированы одновременно, живое общее состояние
// не нужно (Project_Structure.md, «Правила»).

const STORAGE_KEY = "recentlyViewed";
// 3 последних товара (Frontend.md, раздел 8.7; было 6 до 2026-10-18).
const MAX_ITEMS = 3;

export interface RecentlyViewedItem {
  slug: string;
  category: string;
  title: string;
}

const listeners = new Set<() => void>();
const EMPTY: RecentlyViewedItem[] = [];
let cached: RecentlyViewedItem[] = EMPTY;
let hasRead = false;

// Хранилище — внешние данные: элементы не той структуры отбрасываем, иначе битый
// элемент ронял бы главную и /catalog (аудит 2026-10-18, Frontend.md, раздел 10).
function isRecentlyViewedItem(value: unknown): value is RecentlyViewedItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.slug === "string" &&
    typeof item.category === "string" &&
    typeof item.title === "string"
  );
}

function readStored(): RecentlyViewedItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    // slice — у посетителей, накопивших список при прежнем лимите, тоже показываем MAX_ITEMS.
    return Array.isArray(parsed) ? parsed.filter(isRecentlyViewedItem).slice(0, MAX_ITEMS) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): RecentlyViewedItem[] {
  if (!hasRead) {
    cached = readStored();
    hasRead = true;
  }
  return cached;
}

function getServerSnapshot(): RecentlyViewedItem[] {
  return EMPTY;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function writeStored(next: RecentlyViewedItem[]) {
  cached = next;
  hasRead = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Хранилище недоступно (приватное окно с заблокированным доступом) — список останется
    // только в памяти вкладки, без падения рендера.
  }
  listeners.forEach((listener) => listener());
}

export function useRecentlyViewed() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const record = useCallback((item: RecentlyViewedItem) => {
    const current = getSnapshot();
    // Свежий просмотр — первым; повтор того же товара поднимается наверх; список
    // обрезается до MAX_ITEMS.
    const deduped = current.filter((i) => i.slug !== item.slug);
    const next = [item, ...deduped].slice(0, MAX_ITEMS);
    // Ничего не изменилось (тот же товар уже был первым) — не трогаем localStorage и не
    // дёргаем подписчиков лишний раз.
    if (
      next.length === current.length &&
      next.every((i, index) => i.slug === current[index]?.slug)
    ) {
      return;
    }
    writeStored(next);
  }, []);

  return { items, record };
}
