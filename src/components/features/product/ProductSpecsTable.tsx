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
    // overflow-hidden — иначе фон первой/последней строки (зебра ниже) торчит
    // прямоугольными углами за скруглением rounded-2xl внешней рамки.
    <dl className="divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200">
      {specs.map((spec, index) => (
        <div
          key={spec.label}
          // Зебра по чётности строки — существующими токенами фона (bg-white/bg-secondary,
          // Frontend.md, раздел 4.1), без нового цвета. index, а не CSS odd:/even: —
          // строки рендерятся как div внутри map, а не как строки нативной <table>,
          // поэтому селекторы :nth-child читаются надёжнее через явный индекс.
          className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4 ${
            index % 2 === 0 ? "bg-white" : "bg-secondary"
          }`}
        >
          <dt className="text-sm text-secondary sm:w-1/3">{spec.label}</dt>
          {/* tabular-nums — цифры в значениях (диапазоны измерения, сроки, класс точности
              и т.п.) выравниваются по вертикали моноширинными цифрами вместо пропорциональных. */}
          <dd className="text-primary tabular-nums sm:flex-1">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
