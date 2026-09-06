"use client";

import { useRef, useState } from "react";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";

// Кнопка "Добавить в корзину" (Frontend.md, раздел 7.3) — только на странице товара
// (на карточке каталога ProductGrid.tsx не используется, решено в диалоге с
// пользователем 2026-09-06). quantity приходит пропом от соседнего степпера
// (ProductQuantityAddToCart.tsx). Сама кнопка не хранит выбор количества — только
// добавляет уже выбранное количество в корзину по клику.
export interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  variant?: ButtonVariant;
  className?: string;
  /** Вызывается сразу после успешного addItem — ProductQuantityAddToCart.tsx сбрасывает
   *  свой степпер количества обратно к 1, чтобы выбранное число не оставалось "залипшим"
   *  после добавления. */
  onAdded?: () => void;
}

export function AddToCartButton({
  product,
  quantity = 1,
  variant = "outline",
  className = "",
  onAdded,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  // Кратковременная подпись "Добавлено" — та же обратная связь по клику, что и у
  // кнопки "Скопировать" на /cart (Frontend.md, раздел 7.4), без отдельного тоста/библиотеки.
  const [justAdded, setJustAdded] = useState(false);
  // Защита от повторного добавления одним "кликом" (баг: количество в корзине росло
  // больше, чем на quantity, за один клик пользователя) — setJustAdded(true) применяется
  // асинхронно на следующий рендер, поэтому одного React-состояния недостаточно: если
  // второе click-событие (двойной клик, "ghost click" на touch-устройствах) приходит в
  // тот же тик до перерисовки, disabled={justAdded} ещё не успеет подействовать. Ref —
  // синхронная и мгновенная защита независимо от цикла рендера.
  const isAddingRef = useRef(false);

  function handleClick() {
    if (isAddingRef.current) return;
    isAddingRef.current = true;
    addItem(
      {
        productSlug: product.slug,
        category: product.category,
        title: product.title,
        model: product.model,
        sku: product.sku,
      },
      quantity,
    );
    onAdded?.();
    setJustAdded(true);
    window.setTimeout(() => {
      setJustAdded(false);
      isAddingRef.current = false;
    }, 1500);
  }

  return (
    <Button
      type="button"
      // confirm — временный вариант оформления на время показа "Добавлено" (Button.tsx),
      // чтобы состояние отличалось от обычного вида кнопки не только текстом.
      variant={justAdded ? "confirm" : variant}
      onClick={handleClick}
      disabled={justAdded}
      // disabled:!opacity-100 — перекрывает стандартное disabled:opacity-50 из
      // buttonClassName (Button.tsx): кнопка задизейблена намеренно (защита от
      // повторного клика выше), но должна оставаться полностью видимой, а не
      // приглушённой — иначе цвет confirm (accent-teal) блёкнет и теряет заметность.
      className={`${className} disabled:!opacity-100`}
    >
      {justAdded ? "Добавлено" : "Добавить в корзину"}
    </Button>
  );
}
