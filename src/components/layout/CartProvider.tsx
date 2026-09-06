"use client";

import { useCallback, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { CartContext, type CartContextValue } from "@/hooks/useCart";
import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "cart";

// Модуль хранит корзину вне React-состояния (простой внешний стор с подписчиками) и
// синхронизирует её с localStorage — useSyncExternalStore, а не useState+useEffect:
// та же самая ситуация, для которой React рекомендует именно этот хук (внешний источник
// данных вроде localStorage, а не state, которым владеет сам React). getServerSnapshot
// возвращает [] на сервере — то же значение, что React использует и на первом клиентском
// рендере при гидратации, поэтому мисматча SSR/клиент нет (в отличие от связки
// useState(() => readStoredCart())+useEffect, где хук сначала читает [] и синхронно
// перезаписывает его через setState в эффекте).
const listeners = new Set<() => void>();
// Стабильная ссылка для getServerSnapshot ниже — React сравнивает результат между
// вызовами по ===, и инлайновый [] создавал бы новый массив на каждый вызов, из-за
// чего useSyncExternalStore решал бы, что снимок каждый раз "изменился", и уходил в
// бесконечный цикл ре-рендеров ("The result of getServerSnapshot should be cached").
const EMPTY_ITEMS: CartItem[] = [];
let cachedItems: CartItem[] = EMPTY_ITEMS;
let hasReadStorage = false;

// localStorage может кинуть исключение (приватные окна с заблокированным доступом к
// хранилищу) — тихо откатываемся к пустой корзине вместо падения рендера.
function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_ITEMS;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : EMPTY_ITEMS;
  } catch {
    return EMPTY_ITEMS;
  }
}

function getSnapshot(): CartItem[] {
  // Читаем localStorage лениво и один раз за время жизни вкладки — дальше источник
  // истины cachedItems, обновляемый только через setItems ниже.
  if (!hasReadStorage) {
    cachedItems = readStoredCart();
    hasReadStorage = true;
  }
  return cachedItems;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_ITEMS;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setItems(updater: (prev: CartItem[]) => CartItem[]) {
  cachedItems = updater(cachedItems);
  hasReadStorage = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedItems));
  } catch {
    // Хранилище недоступно — состояние корзины останется только в памяти вкладки на
    // время сессии, без падения приложения.
  }
  listeners.forEach((listener) => listener());
}

// Компонент ничего не рендерит сам — оборачивает children в app/layout.tsx рядом с
// Header/Footer (Architecture.md, раздел 2.3; Project_Structure.md).
export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productSlug === item.productSlug);
      if (existing) {
        return prev.map((i) =>
          i.productSlug === item.productSlug ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const removeItem = useCallback((productSlug: string) => {
    setItems((prev) => prev.filter((i) => i.productSlug !== productSlug));
  }, []);

  const updateQuantity = useCallback((productSlug: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productSlug === productSlug ? { ...i, quantity: Math.max(1, quantity) } : i,
      ),
    );
  }, []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({ items, addItem, removeItem, updateQuantity, count }),
    [items, addItem, removeItem, updateQuantity, count],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
