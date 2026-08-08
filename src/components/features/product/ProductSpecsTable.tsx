import type { ProductSpec } from "@/types/product";

// Простая таблица/список label/value (Frontend.md, раздел 4.3.2), без вложенной кастомной
// вёрстки под каждый тип характеристики.
export interface ProductSpecsTableProps {
  specs: ProductSpec[];
}

export function ProductSpecsTable({ specs }: ProductSpecsTableProps) {
  if (specs.length === 0) {
    return <p className="text-secondary">Характеристики уточняются.</p>;
  }

  return (
    <dl className="divide-y divide-gray-200 rounded-2xl border border-gray-200">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4"
        >
          <dt className="text-sm text-secondary sm:w-1/3">{spec.label}</dt>
          <dd className="text-primary sm:flex-1">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
