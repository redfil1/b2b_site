"use client";

import { createContext, useContext } from "react";
import type { CartItem } from "@/types/cart";

export interface CartContextValue {
  items: CartItem[];
  /** quantity по умолчанию 1 — карточка каталога (Frontend.md, раздел 7.2). Если товар
   *  уже в корзине, quantity прибавляется к уже отложенному количеству. */
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productSlug: string) => void;
  /** quantity меньше 1 округляется до 1 — удаление позиции делается отдельно, removeItem. */
  updateQuantity: (productSlug: string, quantity: number) => void;
  /** Сумма quantity по всем позициям — счётчик на иконке корзины в шапке (раздел 7.1). */
  count: number;
}

// Единственный источник состояния корзины — React Context, а не независимый useState в
// каждом компоненте: счётчик в Header, кнопки AddToCartButton на карточках и список на
// /cart должны видеть одно и то же состояние синхронно, без перезагрузки/повторного
// маунта (Project_Structure.md, раздел "Правила"). Контекст объявлен здесь же, а не в
// CartProvider.tsx: и хук, и провайдер должны ссылаться на один и тот же объект контекста.
export const CartContext = createContext<CartContextValue | null>(null);

/**
 * useContext(CartContext) с проверкой — читает/меняет корзину через контекст,
 * не хранит собственное состояние и не обращается к localStorage напрямую
 * (это делает CartProvider, components/layout/CartProvider.tsx).
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart() должен вызываться внутри CartProvider (components/layout/CartProvider.tsx)",
    );
  }
  return context;
}
