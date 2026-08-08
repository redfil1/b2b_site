import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PRODUCT_AVAILABILITY_BADGE_VARIANT } from "@/lib/constants/product";
import type { Product } from "@/types/product";
import { PRODUCT_AVAILABILITY_LABELS } from "@/types/product";

// Сетка карточек товара — Frontend.md, раздел 4.3.1: grid-cols-1 → sm:2 → lg:3 → xl:4,
// все карточки одинаковой высоты (items-stretch + h-full на карточке).
export interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/catalog/${product.category}/${product.slug}`}
          className="block h-full rounded-2xl transition-transform duration-200 ease-out motion-safe:hover:scale-[1.02]"
        >
          <Card className="flex h-full flex-col gap-3">
            <Badge
              label={PRODUCT_AVAILABILITY_LABELS[product.availability]}
              variant={PRODUCT_AVAILABILITY_BADGE_VARIANT[product.availability]}
              className="self-start"
            />
            <h3 className="text-xl font-semibold text-primary">{product.title}</h3>
            {product.model && <p className="text-sm text-secondary">Модель: {product.model}</p>}
            <p className="line-clamp-3 text-secondary">{product.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
