"use client";

import { useState } from "react";
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
}

export function AddToCartButton({
  product,
  quantity = 1,
  variant = "outline",
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  // Кратковременная подпись "Добавлено" — та же обратная связь по клику, что и у
  // кнопки "Скопировать" на /cart (Frontend.md, раздел 7.4), без отдельного тоста/библиотеки.
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
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
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <Button type="button" variant={variant} onClick={handleClick} className={className}>
      {justAdded ? "Добавлено" : "Добавить в корзину"}
    </Button>
  );
}
